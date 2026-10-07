// Briques communes aux pages détaillées (recherche et projets)

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
