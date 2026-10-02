import { useEffect, useRef, useState } from 'react'
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

// Langues proposées ; la traduction est faite par Google Traduction
const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
]

const ICONS = {
  translate:
    'M12.87 15.07 10.33 12.56l.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17A15.7 15.7 0 0 1 9 11.35 15.6 15.6 0 0 1 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4 7.3V17h16V7.3l-8 4.9ZM5.2 7 12 11.1 18.8 7H5.2Z',
  github:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z',
  file: 'M6 2h8l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm7 1.5V9h5.5L13 3.5ZM8 13h8v1.5H8V13Zm0 3.5h8V18H8v-1.5Z',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z',
  science:
    'M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6Z',
  build:
    'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4Z',
  work:
    'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2Zm-6 0h-4V4h4v2Z',
}

function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

function Section({ id, icon, title, children }) {
  return (
    <section id={id}>
      <h2 className="section-title">
        <span className="section-icon"><Icon name={icon} /></span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function currentLanguage() {
  const match = document.cookie.match(/googtrans=\/fr\/([^;]+)/)
  return match ? match[1] : 'fr'
}

// Google Traduction lit le cookie « googtrans » au chargement : on le règle puis on recharge.
function setLanguage(code) {
  const host = window.location.hostname
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = `googtrans=; path=/; ${expired}`
  document.cookie = `googtrans=; path=/; domain=${host}; ${expired}`
  document.cookie = `googtrans=; path=/; domain=.${host}; ${expired}`
  if (code !== 'fr') document.cookie = `googtrans=/fr/${code}; path=/`
  window.location.reload()
}

function useGoogleTranslate() {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: LANGUAGES.map((l) => l.code).join(','),
          autoDisplay: false,
        },
        'google_translate_element',
      )
    }
    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(script)
  }, [])
}

function LanguagePicker() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = currentLanguage()
  useGoogleTranslate()

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <div className="lang notranslate" ref={ref} translate="no">
      <button
        className="lang-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Traduire la page"
        title="Traduire la page"
      >
        <Icon name="translate" />
      </button>
      {open && (
        <ul className="lang-menu">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                className={lang.code === active ? 'active' : ''}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div id="google_translate_element" hidden />
    </div>
  )
}

function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <div className="topnav-links">
          <a href="#top" className="brand">Accueil</a>
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </div>
        <LanguagePicker />
      </div>
    </nav>
  )
}

// Affiche le nom en toutes lettres tant que le fichier du logo n'est pas présent
function CompanyLogo({ src, name }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className="logo-fallback">{name}</span>
  return <img src={src} alt={name} onError={() => setFailed(true)} />
}

// Masqué tant que le fichier du logo n'est pas présent
function SchoolLogo({ src }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return <img className="school-logo" src={src} alt="ESATIC" onError={() => setFailed(true)} />
}

// La colonne de gauche défile au même rythme que la page : quand on arrive en bas à droite,
// elle est arrivée en bas elle aussi
function Sidebar() {
  const ref = useRef(null)
  useEffect(() => {
    const sync = () => {
      const aside = ref.current
      const pageRange = document.documentElement.scrollHeight - window.innerHeight
      const asideRange = aside.scrollHeight - aside.clientHeight
      if (pageRange <= 0 || asideRange <= 0) return
      aside.scrollTop = (window.scrollY / pageRange) * asideRange
    }
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])
  return (
    <aside className="sidebar" ref={ref}>
      <div className="avatar-wrap">
        <img className="gold-frame" src="/files/cadre-dore.webp" alt="" aria-hidden="true" />
        <img className="avatar" src={identity.photo} alt={identity.name} />
      </div>
      <h1 className="name">{identity.name}</h1>
      <div className="role">{identity.role}</div>
      <SchoolLogo src={identity.schoolLogo} />
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

function Paper({ paper }) {
  return (
    <li className="paper">
      <span className="venue-tag">[{paper.tag}]</span> <strong>{paper.authors}</strong>.{' '}
      <span className="paper-title">{paper.title}</span>.{' '}
      <span className="venue">{paper.venue}</span>, {paper.year}.{' '}
      {paper.links.map((link) => (
        <a key={link.href} className="paper-link" href={link.href} target="_blank" rel="noreferrer">
          [{link.label}]
        </a>
      ))}
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
          <Section id="about" icon="person" title="À propos">
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

          <Section id="research" icon="science" title="Travaux de recherche">
            <ol className="papers">
              {research.map((paper) => (
                <Paper key={paper.title} paper={paper} />
              ))}
            </ol>
          </Section>

          <Section id="projects" icon="build" title="Projets">
            <ol className="papers">
              {projects.map((p) => (
                <li key={p.title} className="paper">
                  <span className="venue-tag">[{p.tag}]</span> <strong>{p.title}</strong>.{' '}
                  {p.url && (
                    <a className="paper-link" href={p.url} target="_blank" rel="noreferrer">
                      [{p.url.replace(/^https?:\/\//, '')}]
                    </a>
                  )}
                  {p.stack && <div className="stack">{p.stack}</div>}
                  <div className="project-text">{p.text}</div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="experience" icon="work" title="Parcours">
            <h3 className="sub-title">Expérience</h3>
            <ul className="timeline">
              {experience.map((e) => (
                <li key={e.title} className="experience">
                  <span className="date-label">{e.date}</span>
                  <div className="experience-row">
                    <div className="experience-text">
                      <em>{e.title}</em>, {e.org}. {e.text}
                    </div>
                    {e.logo && (
                      <div className="experience-logo">
                        <CompanyLogo src={e.logo} name={e.logoAlt} />
                      </div>
                    )}
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
