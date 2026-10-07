// Schémas en traits fins, animés avec anime.js quand ils entrent à l'écran :
// les contours se dessinent, les textes apparaissent, puis des points circulent sur les flèches.
import { useEffect, useId, useRef } from 'react'
import { animate, stagger, svg, utils } from 'animejs'
import { TONES } from './tones.js'


const INK = '#3a3a3a'

function lineHeight(n) {
  return 14 + n * 16
}

export function Box({ x, y, w, h, title, lines = [], tone, mono, left, fill }) {
  const top = y + (h - (title ? lineHeight(lines.length) : lines.length * 16)) / 2
  const tx = left ? x + 18 : x + w / 2
  const anchor = left ? 'start' : 'middle'
  const first = title ? top + 12 : top + 11
  return (
    <g>
      <rect className="dg-fade" x={x} y={y} width={w} height={h} rx="6" fill={fill || 'var(--dg-box)'} />
      <rect className="dg-draw" x={x} y={y} width={w} height={h} rx="6" fill="none" stroke={INK} strokeWidth="1" />
      {tone && <circle className="dg-fade" cx={x + 11} cy={y + 11} r="3.5" fill={TONES[tone]} />}
      {title && (
        <text className={`dg-fade dg-title${mono ? ' dg-mono' : ''}`} x={tx} y={first} textAnchor={anchor}>
          {title}
        </text>
      )}
      {lines.map((line, i) => (
        <text
          key={i}
          className="dg-fade dg-sub"
          x={tx}
          y={title ? first + 18 + i * 16 : first + i * 16}
          textAnchor={anchor}
        >
          {line}
        </text>
      ))}
    </g>
  )
}

// Cadre en pointillés avec son étiquette, comme un nœud ou un serveur
export function Group({ x, y, w, h, label, tone }) {
  return (
    <g>
      <rect className="dg-fade" x={x} y={y} width={w} height={h} rx="8" fill="none" stroke={INK} strokeOpacity=".55" strokeDasharray="4 4" />
      {label && (
        <g className="dg-fade">
          {tone && <circle cx={x + 18} cy={y} r="3.5" fill={TONES[tone]} />}
          <text className="dg-tag dg-halo" x={x + (tone ? 28 : 14)} y={y + 4}>{label}</text>
        </g>
      )}
    </g>
  )
}

function toPath(points) {
  return points.map(([px, py], i) => `${i ? 'L' : 'M'}${px} ${py}`).join(' ')
}

// Flèche ; `flow` fait circuler un point coloré le long du trait, `both` met une pointe aux deux bouts
export function Edge({ points, d, label, lx, ly, anchor = 'middle', flow, both, plain, dashed, seq, note, nx, ny }) {
  const id = useId()
  const lines = Array.isArray(label) ? label : label ? [label] : []
  const body = (
    <>
      <path
        className={`dg-line${dashed ? ' dg-fade' : seq ? ' dg-seqline' : ' dg-draw'}`}
        d={d || toPath(points)}
        fill="none"
        stroke={INK}
        strokeWidth="1"
        strokeDasharray={dashed ? '5 4' : undefined}
        markerEnd={plain ? undefined : `url(#dg-arrow-${id})`}
        markerStart={both ? `url(#dg-arrow-start-${id})` : undefined}
      />
      <defs>
        <marker id={`dg-arrow-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 1 L10 5 L0 9 z" fill={INK} />
        </marker>
        <marker id={`dg-arrow-start-${id}`} viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M10 1 L0 5 L10 9 z" fill={INK} />
        </marker>
      </defs>
      {flow && <circle className="dg-packet" r="3.5" fill={TONES[flow] || TONES.worker} />}
      {lines.map((line, i) => (
        <text key={i} className={`dg-elabel dg-halo${seq ? '' : ' dg-fade'}`} x={lx} y={ly + i * 14} textAnchor={anchor}>
          {line}
        </text>
      ))}
      {note && (
        <text className="dg-note dg-halo" x={nx} y={ny}>{note}</text>
      )}
    </>
  )
  return <g className={`dg-edge${flow ? ' dg-flow' : ''}${seq ? ' dg-seq' : ''}`}>{body}</g>
}

// Texte libre : titre de zone, annotation
export function Label({ x, y, children, anchor = 'start', kind = 'tag', seq }) {
  return (
    <text className={`dg-${kind} dg-halo${seq ? '' : ' dg-fade'}`} x={x} y={y} textAnchor={anchor}>
      {children}
    </text>
  )
}

// Élément d'une séquence : apparaît à son tour, après le reste du schéma
export function Step({ children }) {
  return <g className="dg-seq">{children}</g>
}

// Barre d'un diagramme de Gantt : s'allonge de gauche à droite à son heure de départ
export function Bar({ x, y, w, h = 36, label, slow, idle, start }) {
  return (
    <g>
      <rect
        className="dg-bar"
        data-start={start}
        data-dur={w * 4}
        x={x}
        y={y}
        width={w}
        height={h}
        rx="5"
        fill={idle ? 'none' : slow ? 'rgba(255, 77, 77, .16)' : 'var(--dg-box)'}
        stroke={slow ? '#d9483b' : INK}
        strokeOpacity={idle ? '.45' : '1'}
        strokeDasharray={idle ? '4 4' : undefined}
      />
      {label && (
        <text className="dg-bartext dg-sub" data-start={start + w * 2} x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

export function Diagram({ h, w = 1000, caption, children, minWidth = 720 }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const q = (selector) => [...root.querySelectorAll(selector)]
    const drawables = svg.createDrawable(q('.dg-draw'))
    const fades = q('.dg-fade')
    const seqItems = q('.dg-seq')
    const bars = q('.dg-bar')
    const barTexts = q('.dg-bartext')
    const packets = q('.dg-packet')
    // Les pointes de flèche n'apparaissent qu'une fois le trait dessiné
    const markers = q('.dg-line').map((line) => [line, line.getAttribute('marker-end'), line.getAttribute('marker-start')])
    const hideMarkers = () => markers.forEach(([line]) => { line.removeAttribute('marker-end'); line.removeAttribute('marker-start') })
    const showMarkers = () => markers.forEach(([line, end, start]) => {
      if (end) line.setAttribute('marker-end', end)
      if (start) line.setAttribute('marker-start', start)
    })

    hideMarkers()
    utils.set(drawables, { draw: '0 0' })
    utils.set([...fades, ...seqItems, ...barTexts, ...packets], { opacity: 0 })
    utils.set(bars, { scaleX: 0 })

    const running = []
    const play = () => {
      running.push(animate(drawables, { draw: ['0 0', '0 1'], duration: 1100, delay: stagger(40), ease: 'inOutQuad' }))
      running.push(animate(fades, { opacity: [0, 1], duration: 600, delay: stagger(18, { start: 300 }) }))
      const drawEnd = 1100 + drawables.length * 40

      seqItems.forEach((item, i) => {
        const delay = 900 + i * 380
        running.push(animate(item, { opacity: [0, 1], duration: 400, delay }))
        const line = item.querySelector('.dg-seqline')
        if (line) running.push(animate(svg.createDrawable(line), { draw: ['0 0', '0 1'], duration: 500, delay, ease: 'outQuad' }))
      })
      const seqEnd = seqItems.length ? 900 + seqItems.length * 380 : 0

      running.push(animate(bars, {
        scaleX: [0, 1],
        duration: (el) => +el.dataset.dur,
        delay: (el) => 600 + +el.dataset.start,
        ease: 'linear',
      }))
      running.push(animate(barTexts, { opacity: [0, 1], duration: 300, delay: (el) => 600 + +el.dataset.start }))

      const markersAt = Math.max(drawEnd, seqEnd)
      const timer = setTimeout(showMarkers, markersAt)
      running.push({ revert: () => clearTimeout(timer) })

      q('.dg-flow').forEach((edge, i) => {
        const path = edge.querySelector('.dg-line')
        const dot = edge.querySelector('.dg-packet')
        const { translateX, translateY } = svg.createMotionPath(path)
        const length = path.getTotalLength()
        running.push(animate(dot, {
          translateX,
          translateY,
          opacity: [0, 1, 1, 1, 0],
          duration: Math.max(900, length * 5),
          delay: markersAt + i * 260,
          loop: true,
          loopDelay: 700 + (i % 3) * 400,
          ease: 'inOutSine',
        }))
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      play()
    }, { threshold: 0.2 })
    observer.observe(root)

    return () => {
      observer.disconnect()
      running.forEach((a) => a.revert())
      utils.set([...fades, ...seqItems, ...barTexts, ...packets], { opacity: 1 })
      utils.set(drawables, { draw: '0 1' })
      utils.set(bars, { scaleX: 1 })
      showMarkers()
    }
  }, [])

  return (
    <figure className="dg">
      <div className="dg-frame">
        <svg ref={ref} viewBox={`0 0 ${w} ${h}`} style={{ minWidth }} role="img" aria-label={caption}>
          {children}
        </svg>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
