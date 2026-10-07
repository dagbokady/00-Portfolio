import { useEffect, useRef, useState } from 'react'
import {
  identity,
  about,
  research,
  projects,
  experience,
  skills,
  certifications,
} from './data/portfolio.jsx'
import Research from './Research.jsx'
import Education from './Education.jsx'
import { CodEval, EsaticShare } from './Projects.jsx'

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

// Icônes en couleur : vrais logos pour GitHub, LinkedIn et Gmail, dessins multicolores pour le reste
const ICONS = {
  translate: (
    <>
      <rect x="1" y="1" width="14" height="14" rx="2.5" fill="#4285F4" />
      <text x="8" y="11.6" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">文</text>
      <rect x="9" y="9" width="14" height="14" rx="2.5" fill="#fff" stroke="#DADCE0" />
      <text x="16" y="20.2" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4285F4" fontFamily="Arial, sans-serif">A</text>
    </>
  ),
  pin: (
    <>
      <path fill="#EA4335" d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.6 7.5 13.5 7.5 13.5s7.5-7.9 7.5-13.5A7.5 7.5 0 0 0 12 1.5Z" />
      <path fill="#B31412" d="M12 22.5s7.5-7.9 7.5-13.5c0-1.3-.33-2.53-.92-3.6L12 12v10.5Z" opacity=".35" />
      <circle cx="12" cy="9" r="2.8" fill="#fff" />
    </>
  ),
  mail: (
    <g transform="scale(.5)">
      <path fill="#4CAF50" d="M45 16.2l-5 2.75-5 4.75V40h7c1.66 0 3-1.34 3-3V16.2z" />
      <path fill="#1E88E5" d="M3 16.2l3.61 1.71L13 23.7V40H6c-1.66 0-3-1.34-3-3V16.2z" />
      <path fill="#E53935" d="M35 11.2 24 19.45 13 11.2l-1 5.8 1 6.7 11 8.25 11-8.25 1-6.7z" />
      <path fill="#C62828" d="M3 12.3v3.9l10 7.5V11.2L9.88 8.86A4.3 4.3 0 0 0 7.3 8 4.3 4.3 0 0 0 3 12.3z" />
      <path fill="#FBC02D" d="M45 12.3v3.9l-10 7.5V11.2l3.12-2.34A4.3 4.3 0 0 1 40.7 8 4.3 4.3 0 0 1 45 12.3z" />
    </g>
  ),
  github: (
    <path
      fill="#181717"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  linkedin: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M6.94 5.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM5.4 10.1h3.08V19H5.4v-8.9Zm4.99 0h2.95v1.22h.04c.41-.78 1.42-1.6 2.92-1.6 3.13 0 3.7 2.06 3.7 4.73V19h-3.08v-4.33c0-1.03-.02-2.36-1.44-2.36-1.44 0-1.66 1.12-1.66 2.28V19h-3.08v-8.9Z"
      />
    </>
  ),
  file: (
    <>
      <path fill="#E53935" d="M5 1.5h9.5L20 7v14.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-19a1 1 0 0 1 1-1Z" />
      <path fill="#FFCDD2" d="M14.5 1.5V7H20l-5.5-5.5Z" />
      <text x="12" y="17.5" textAnchor="middle" fontSize="6.2" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">PDF</text>
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id}>
      <h2 className="section-title">{title}</h2>
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

// Sur une page détaillée, les liens ramènent aux sections de la page d'accueil
function TopNav({ home }) {
  const base = home ? '' : '/'
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <div className="topnav-links">
          <a href={`${base}#top`} className="brand">Accueil</a>
          {NAV.map((item) => (
            <a key={item.id} href={`${base}#${item.id}`}>{item.label}</a>
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
      <ul className="side-languages">
        {identity.languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div className="role">{identity.role}</div>
      <SchoolLogo src={identity.schoolLogo} />
      <p className="bio">
        {identity.bio.map((line, i) => (
          <span key={i} className="bio-line">{line}</span>
        ))}
      </p>
      <ul className="side-links">
        <li><Icon name="pin" />{identity.location}</li>
        <li>
          <Icon name="mail" />
          <a href={`mailto:${identity.email}`}>Email</a>
        </li>
        {identity.links.map((link) => (
          <li key={link.href}>
            <Icon name={link.icon} />
            <a href={link.href} {...external(link.href)}>{link.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

// Les liens vers une autre page du site restent dans l'onglet courant
function external(href) {
  return href.startsWith('/') ? {} : { target: '_blank', rel: 'noreferrer' }
}

function Paper({ paper }) {
  return (
    <li className="paper">
      <span className="venue-tag">[{paper.tag}]</span> <strong>{paper.authors}</strong>.{' '}
      <a className="paper-title" href={paper.page}>{paper.title}</a>.{' '}
      <span className="venue">{paper.venue}</span>, {paper.year}.{' '}
      {paper.links.map((link) => (
        <a key={link.href} className="paper-link" href={link.href} {...external(link.href)}>
          [{link.label}]
        </a>
      ))}
    </li>
  )
}

function Home() {
  return (
    <>
      <TopNav home />
      <div className="layout" id="top">
        <Sidebar />
        <main className="content">
          <Section id="about" title="À propos">
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

          <Section id="research" title="Travaux de recherche">
            <ol className="papers">
              {research.map((paper) => (
                <Paper key={paper.title} paper={paper} />
              ))}
            </ol>
          </Section>

          <Section id="projects" title="Projets">
            <ol className="papers">
              {projects.map((p) => (
                <li key={p.title} className="paper">
                  <span className="venue-tag">[{p.tag}]</span>{' '}
                  <a className="project-title" href={p.page}><strong>{p.title}</strong></a>.{' '}
                  <a className="paper-link" href={p.page}>[détails]</a>
                  {p.url && (
                    <a className="paper-link" href={p.url} target="_blank" rel="noreferrer">
                      [{p.url.replace(/^https?:\/\//, '')}]
                    </a>
                  )}
                  {p.repo && (
                    <a className="paper-link" href={p.repo} target="_blank" rel="noreferrer">
                      [dépôt public]
                    </a>
                  )}
                  {p.stack && <div className="stack">{p.stack}</div>}
                  <div className="project-text">{p.text}</div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="experience" title="Parcours">
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

            <h3 className="sub-title">Compétences</h3>
            <ul className="topics">
              {skills.map((s) => (
                <li key={s.name}><em>{s.name}</em> : {s.list}</li>
              ))}
            </ul>

            <h3 className="sub-title">Certifications</h3>
            <ul className="topics">
              {certifications.map((c) => (
                <li key={c.href}>
                  {c.title}{' '}
                  <a className="paper-link" href={c.href} target="_blank" rel="noreferrer">[certificat]</a>
                </li>
              ))}
            </ul>

            <h3 className="sub-title">Formation</h3>
            <Education />
          </Section>

          <footer className="footer">© {new Date().getFullYear()} {identity.name}</footer>
        </main>
      </div>
    </>
  )
}

// Chaque page détaillée a sa propre adresse ; vercel.json renvoie ces adresses vers index.html
const PAGES = {
  '/recherche/codeval': Research,
  '/projets/codeval': CodEval,
  '/projets/esaticshare': EsaticShare,
}

function App() {
  const Page = PAGES[window.location.pathname.replace(/\/+$/, '')]
  if (!Page) return <Home />
  return (
    <>
      <TopNav />
      <Page />
      <footer className="footer page-footer">© {new Date().getFullYear()} {identity.name}</footer>
    </>
  )
}

export default App
