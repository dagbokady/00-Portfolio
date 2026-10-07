// Formation en frise chronologique, de gauche à droite : un logo par établissement,
// au-dessus de ses diplômes ; la ligne se trace puis les étapes apparaissent dans l'ordre
import { useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'
import { education } from './data/portfolio.jsx'

function Education() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const track = root.querySelector('.edu-track-line')
    const dots = root.querySelectorAll('.edu-dot')
    const blocks = root.querySelectorAll('.edu-school, .edu-item')
    utils.set(track, { scaleX: 0 })
    utils.set(dots, { scale: 0 })
    utils.set(blocks, { opacity: 0, translateY: 8 })

    const running = []
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      running.push(animate(track, { scaleX: [0, 1], duration: 1400, ease: 'inOutQuad' }))
      running.push(animate(dots, { scale: [0, 1], duration: 500, delay: stagger(350, { start: 250 }), ease: 'outBack' }))
      running.push(animate(blocks, { opacity: [0, 1], translateY: [8, 0], duration: 600, delay: stagger(220, { start: 200 }) }))
    }, { threshold: 0.3 })
    observer.observe(root)

    return () => {
      observer.disconnect()
      running.forEach((a) => a.revert())
      utils.set(track, { scaleX: 1 })
      utils.set(dots, { scale: 1 })
      utils.set(blocks, { opacity: 1, translateY: 0 })
    }
  }, [])

  return (
    <div className="edu-scroll">
      <div className="edu" ref={ref}>
        {education.map((school) => (
          <div key={school.school} className="edu-group" style={{ flexGrow: school.items.length }}>
            <div className="edu-school">
              <img src={school.logo} alt={school.school} />
              <strong>{school.school}</strong>
            </div>
            <div className="edu-items">
              {school.items.map((item) => (
                <div key={item.title} className="edu-step">
                  <span className="edu-dot" />
                  <div className="edu-item">
                    <span className="date-label">{item.date}</span>
                    <em>{item.title}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="edu-track" aria-hidden="true">
          <span className="edu-track-line" />
        </div>
      </div>
    </div>
  )
}

export default Education
