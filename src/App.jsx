import { Fragment } from 'react'
import {
  identity,
  profile,
  experiences,
  projects,
  skills,
  education,
  certifications,
  languages,
  interests,
} from './data/cv.jsx'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}

function Entry({ title, date, context, items }) {
  return (
    <article className="entry">
      <div className="entry-head">
        <div className="title">{title}</div>
        <div className="date">{date}</div>
      </div>
      {context && <div className="context">{context}</div>}
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

function Header() {
  return (
    <header>
      <h1>{identity.name}</h1>
      <div className="headline">{identity.headline}</div>
      <div className="contact">
        {identity.location} · {identity.phone} ·{' '}
        <a href={`mailto:${identity.email}`}>{identity.email}</a>
        {identity.links.map((link) => (
          <Fragment key={link.href}>
            {' · '}
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </Fragment>
        ))}
      </div>
    </header>
  )
}

function App() {
  return (
    <main className="page">
      <Header />

      <Section title="Profil professionnel">
        <p className="profile">{profile}</p>
      </Section>

      <Section title="Expérience professionnelle">
        {experiences.map((entry) => (
          <Entry key={entry.title} {...entry} />
        ))}
      </Section>

      <Section title="Projets">
        {projects.map((entry) => (
          <Entry key={entry.title} {...entry} />
        ))}
      </Section>

      <Section title="Compétences techniques">
        <div className="skills">
          {skills.map((skill) => (
            <Fragment key={skill.name}>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-list">{skill.list}</div>
            </Fragment>
          ))}
        </div>
      </Section>

      <Section title="Formation">
        {education.map((item) => (
          <div className="education" key={item.title}>
            <div className="education-title">{item.title}</div>
            <div className="education-meta">{item.meta}</div>
          </div>
        ))}
      </Section>

      <Section title="Certifications">
        {certifications.map((item) => (
          <div className="education" key={item.title}>
            <div className="education-title">{item.title}</div>
            <div className="education-meta">
              {item.meta && <>{item.meta} · </>}
              <a href={item.certificate} target="_blank" rel="noreferrer">
                Voir le certificat
              </a>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Langues & centres d'intérêt">
        <div className="languages">
          {languages.map((lang, i) => (
            <Fragment key={lang.name}>
              {i > 0 && ' · '}
              <strong>{lang.name} :</strong> {lang.level}
            </Fragment>
          ))}
          <br />
          <strong>Intérêts :</strong> {interests}
        </div>
      </Section>
    </main>
  )
}

export default App
