// Formation en frise chronologique, de gauche à droite : un logo par établissement,
// au-dessus de ses diplômes
import { education } from './data/portfolio.jsx'

function Education() {
  return (
    <div className="edu-scroll">
      <div className="edu">
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
