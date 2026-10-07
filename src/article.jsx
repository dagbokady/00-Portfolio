// Briques communes aux pages détaillées (recherche et projets)
import { useEffect, useRef, useState } from 'react'

export function Picture({ src, alt, caption, narrow }) {
  return (
    <figure className={`r-figure${narrow ? ' narrow' : ''}`}>
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

// Tableau : la première ligne est l'en-tête ; il défile horizontalement sur un écran étroit
export function Table({ caption, rows }) {
  const [head, ...body] = rows
  return (
    <figure className="r-table">
      <div className="r-table-scroll">
        <table>
          <thead>
            <tr>{head.map((cell, i) => <th key={i}>{cell}</th>)}</tr>
          </thead>
          <tbody>
            {body.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function Code({ children }) {
  return <pre className="r-code" translate="no"><code>{children}</code></pre>
}

// Identifiant d'ancre lisible tiré d'un titre
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Page détaillée avec une navigation fixe à gauche, construite à partir des titres de l'article :
// les h2 donnent les entrées, les h3 de la partie en cours de lecture s'affichent en dessous.
// `paper` met la page en forme comme un article scientifique (police à empattements, retraits)
export function DocLayout({ paper, children }) {
  const ref = useRef(null)
  const [items, setItems] = useState([])
  const [active, setActive] = useState({ h2: null, h3: null })

  useEffect(() => {
    const used = new Set()
    const anchor = (el, text) => {
      if (!el.id) {
        let id = slugify(text) || 'section'
        while (used.has(id) || document.getElementById(id)) id += '-'
        el.id = id
      }
      used.add(el.id)
      return el.id
    }
    const found = []
    ref.current.querySelectorAll(':scope > section').forEach((section) => {
      const h2 = section.querySelector(':scope > h2')
      if (!h2) return
      const id = anchor(section, h2.textContent)
      const subs = [...section.querySelectorAll(':scope > h3')].map((h3) => ({
        id: anchor(h3, h3.textContent),
        label: h3.textContent,
        el: h3,
      }))
      found.push({ id, label: h2.textContent, el: section, subs })
    })

    // La partie active est la dernière dont le titre a passé le premier quart de l'écran
    const spy = () => {
      const line = Math.max(120, window.innerHeight / 4)
      let h2 = null
      let h3 = null
      for (const item of found) {
        if (item.el.getBoundingClientRect().top > line) break
        h2 = item.id
        h3 = null
        for (const sub of item.subs) {
          if (sub.el.getBoundingClientRect().top > line) break
          h3 = sub.id
        }
      }
      setActive((prev) => (prev.h2 === h2 && prev.h3 === h3 ? prev : { h2, h3 }))
    }
    // Les titres sont lus dans le DOM une fois la page affichée
    const frame = requestAnimationFrame(() => {
      setItems(found)
      spy()
    })
    window.addEventListener('scroll', spy, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', spy)
    }
  }, [])

  // Garde l'entrée active visible quand la navigation est plus haute que l'écran
  const navRef = useRef(null)
  useEffect(() => {
    const nav = navRef.current
    const links = nav.querySelectorAll('a.active')
    const link = links[links.length - 1]
    if (!link) return
    const top = link.offsetTop - nav.offsetTop
    if (top < nav.scrollTop || top > nav.scrollTop + nav.clientHeight - 40) {
      nav.scrollTop = top - nav.clientHeight / 3
    }
  }, [active])

  return (
    <div className="doc-layout">
      <nav className="doc-nav" aria-label="Navigation dans la page" ref={navRef}>
        <div className="doc-nav-title">Sur cette page</div>
        <ol>
          {items.map((item) => (
            <li key={item.id} className={item.id === active.h2 ? 'active' : ''}>
              <a href={`#${item.id}`} className={item.id === active.h2 && !active.h3 ? 'active' : ''}>
                {item.label}
              </a>
              {/* Toutes les sous-parties sont dans la page dès le départ (masquées hors de la partie
                  active) pour que Google Traduction les traduise avec le reste */}
              {item.subs.length > 0 && (
                <ol hidden={item.id !== active.h2}>
                  {item.subs.map((sub) => (
                    <li key={sub.id}>
                      <a href={`#${sub.id}`} className={sub.id === active.h3 ? 'active' : ''}>
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
        <a className="doc-nav-top" href="#">↑ Haut de page</a>
      </nav>
      <article className={`research-page${paper ? ' paper-style' : ''}`} ref={ref}>
        {children}
      </article>
    </div>
  )
}

// Appel de référence cliquable : [n] renvoie à l'entrée n de la liste des références
export function Cite({ n }) {
  return <a className="cite" href={`#ref-${n}`}>[{n}]</a>
}
