import { useState } from 'react'
import {
  identity,
  about,
  research,
  projects,
  experience,
  education,
  skills,
  certifications,
  languages,
} from './data/portfolio.jsx'

const NAV = [
  { id: 'about', label: 'À propos' },
  { id: 'research', label: 'Recherche' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Parcours' },
]

const ICONS = {
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4 7.3V17h16V7.3l-8 4.9ZM5.2 7 12 11.1 18.8 7H5.2Z',
  github:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z',
  file: 'M6 2h8l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm7 1.5V9h5.5L13 3.5ZM8 13h8v1.5H8V13Zm0 3.5h8V18H8v-1.5Z',
}

function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

function Section({ id, emoji, title, children }) {
  return (
    <section id={id}>
      <h2 className="section-title">
        <span className="emoji" aria-hidden="true">{emoji}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <a href="#top" className="brand">Accueil</a>
        {NAV.map((item) => (
          <a key={item.id} href={`#${item.id}`}>{item.label}</a>
        ))}
      </div>
    </nav>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <img className="avatar" src={identity.photo} alt={identity.name} />
      <h1 className="name">{identity.name}</h1>
      <div className="role">{identity.role}</div>
      <div className="school">
        <span className="school-mark">ESATIC</span>
        <span className="school-name">{identity.school}</span>
      </div>
      <p className="bio">{identity.bio}</p>
      <ul className="side-links">
        <li><Icon name="pin" />{identity.location}</li>
        <li>
          <Icon name="mail" />
          <a href={`mailto:${identity.email}`}>Email</a>
        </li>
        {identity.links.map((link) => (
          <li key={link.href}>
            <Icon name={link.icon} />
            <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function Paper({ paper, index }) {
  const [open, setOpen] = useState(true)
  return (
    <li className="paper">
      <span className="venue-tag">[{paper.tag}]</span> <strong>{paper.authors}</strong>.{' '}
      <span className="paper-title">{paper.title}</span>.{' '}
      <span className="venue">{paper.venue}</span>, {paper.year}.{' '}
      {paper.links.map((link) => (
        <a key={link.href} className="paper-link" href={link.href} target="_blank" rel="noreferrer">
          [{link.label}]
        </a>
      ))}{' '}
      <button className="paper-link as-button" onClick={() => setOpen(!open)} aria-expanded={open}>
        [{open ? 'masquer le résumé' : 'résumé'}]
      </button>
      {paper.status && <span className="status">{paper.status}</span>}
      {open && (
        <div className="abstract" id={`abstract-${index}`}>
          <p>{paper.abstract}</p>
          <ul>
            {paper.highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

function App() {
  return (
    <>
      <TopNav />
      <div className="layout" id="top">
        <Sidebar />
        <main className="content">
          <Section id="about" emoji="🚩" title="À propos">
            <p>{about.intro}</p>
            <p>{about.interests}</p>
            <ul className="topics">
              {about.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <p>
              Email : <a href={`mailto:${identity.email}`}>{identity.email}</a>
              <br />
              Localisation : {identity.location}
            </p>
          </Section>

          <Section id="research" emoji="⭐" title="Travaux de recherche">
            <ol className="papers">
              {research.map((paper, i) => (
                <Paper key={paper.title} paper={paper} index={i} />
              ))}
            </ol>
          </Section>

          <Section id="projects" emoji="🛠️" title="Projets">
            <ol className="papers">
              {projects.map((p) => (
                <li key={p.title} className="paper">
                  <span className="venue-tag">[{p.tag}]</span> <strong>{p.title}</strong>.{' '}
                  <span className="venue">{p.role}</span>.
                  {p.stack && <span className="stack"> {p.stack}.</span>}
                  <div className="project-text">{p.text}</div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="experience" emoji="💼" title="Parcours">
            <h3 className="sub-title">Expérience</h3>
            <ul className="timeline">
              {experience.map((e) => (
                <li key={e.title}>
                  <span className="date-label">{e.date}</span>
                  <div>
                    <em>{e.title}</em>, {e.org}. {e.text}
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="sub-title">Formation</h3>
            <ul className="timeline">
              {education.map((e) => (
                <li key={e.title}>
                  <span className="date-label">{e.date}</span>
                  <div><em>{e.title}</em>, {e.org}.</div>
                </li>
              ))}
            </ul>

            <h3 className="sub-title">Compétences</h3>
            <ul className="topics">
              {skills.map((s) => (
                <li key={s.name}><em>{s.name}</em> : {s.list}</li>
              ))}
            </ul>

            <h3 className="sub-title">Certifications & langues</h3>
            <ul className="topics">
              {certifications.map((c) => (
                <li key={c.href}>
                  {c.title}{' '}
                  <a className="paper-link" href={c.href} target="_blank" rel="noreferrer">[certificat]</a>
                </li>
              ))}
              <li>{languages}</li>
            </ul>
          </Section>

          <footer className="footer">© {new Date().getFullYear()} {identity.name}</footer>
        </main>
      </div>
    </>
  )
}

export default App
