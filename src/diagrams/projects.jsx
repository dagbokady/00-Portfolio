// Schémas des pages projets, dans le même style que ceux du mémoire
import { Box, Diagram, Edge, Group, Label, Step } from './Diagram.jsx'
import { TONES } from './tones.js'

// Annotation à droite d'un bloc, reliée par un trait fin
function Aside({ x, y, lines }) {
  return (
    <g>
      <line className="dg-fade" x1={x - 30} y1={y - 4} x2={x - 8} y2={y - 4} stroke="#3a3a3a" strokeOpacity=".6" />
      {lines.map((line, i) => (
        <text key={i} className="dg-fade dg-note" x={x} y={y + i * 15}>{line}</text>
      ))}
    </g>
  )
}

export function CodevalWorkflow() {
  const [T, E, S] = [130, 420, 710]
  const send = (from, to, y, label, note) => (
    <Edge
      seq
      points={[[from, y], [to, y]]}
      flow={to === S ? 'worker' : 'api'}
      label={label}
      lx={(from + to) / 2}
      ly={y - 8}
      note={note}
      nx={to + 12}
      ny={y + 18}
    />
  )
  const self = (y, text) => (
    <Step>
      <circle cx={T} cy={y - 4} r="4" fill={TONES.queue} />
      <text className="dg-elabel" x={T + 12} y={y}>{text}</text>
    </Step>
  )
  return (
    <Diagram h={560} caption="Déroulement d'une épreuve, de la création à l'export des notes">
      <Box x={T - 95} y={15} w={190} h={52} tone="queue" title="Enseignant" />
      <Box x={E - 95} y={15} w={190} h={52} tone="api" title="Étudiant" />
      <Box x={S - 95} y={15} w={190} h={52} tone="worker" title="Système" />
      {[T, E, S].map((x) => (
        <line key={x} className="dg-fade" x1={x} y1={67} x2={x} y2={545} stroke="#3a3a3a" strokeOpacity=".45" strokeDasharray="4 5" />
      ))}
      {self(105, "crée l'évaluation + exercices + jeux de tests")}
      {send(T, E, 160, 'programme la session', "voit l'épreuve à venir")}
      {send(T, E, 215, 'ouvre la session', 'compose en plein écran (sans exécution)')}
      {send(E, S, 270, 'rend sa copie', 'fige la production')}
      {send(T, S, 325, 'clôture (ou fin du temps)', 'gèle toutes les copies')}
      {send(T, S, 380, 'lance la correction', 'worker : compile, exécute, note')}
      {self(430, 'relit, ajuste, annote')}
      {send(T, E, 485, 'publie les résultats', 'consulte sa copie corrigée')}
      {self(535, 'exporte (Excel / CSV)')}
    </Diagram>
  )
}

export function CodevalArchitecture() {
  return (
    <Diagram h={470} caption="Architecture de CodEval">
      <Label x={150} y={60} anchor="middle" kind="head">navigateur</Label>
      <Edge points={[[200, 55], [300, 55]]} flow="api" />
      <Box x={300} y={25} w={340} h={60} tone="api" title="React 19 + Vite (SPA)" />
      <Aside x={690} y={59} lines={['3 espaces : admin · enseignant · étudiant']} />
      <Edge points={[[470, 85], [470, 140]]} both flow="api" label="REST + JWT" lx={482} ly={117} anchor="start" />
      <Box x={300} y={140} w={340} h={66} tone="api" title="API FastAPI" lines={['+ planificateur']} />
      <Aside x={690} y={168} lines={['autorisation à chaque requête,', 'ouverture des sessions programmées']} />
      <Edge points={[[470, 206], [470, 260]]} both flow="db" />
      <Box x={300} y={260} w={340} h={60} tone="db" title="PostgreSQL 17" />
      <Aside x={690} y={294} lines={['données + file de correction (une table)']} />
      <Edge points={[[470, 380], [470, 320]]} flow="worker" label="SELECT … FOR UPDATE SKIP LOCKED" lx={482} ly={356} anchor="start" />
      <Box x={300} y={380} w={340} h={70} tone="worker" title="Worker(s) de correction" lines={['réplicables']} />
      <Aside x={690} y={419} lines={['compile, exécute en bac à sable, note']} />
    </Diagram>
  )
}

const STATES = ['draft', 'scheduled', 'running', 'closed', 'correcting', 'corrected', 'validated']

export function CodevalLifecycle() {
  const w = 118
  const gap = 20
  const x0 = 27
  const cx = (i) => x0 + i * (w + gap) + w / 2
  return (
    <Diagram h={170} caption="Cycle de vie d'une évaluation">
      {STATES.map((s, i) => (
        <Box key={s} x={x0 + i * (w + gap)} y={40} w={w} h={46} tone={i === 6 ? 'db' : i >= 4 ? 'worker' : 'api'} mono title={s} />
      ))}
      {STATES.slice(1).map((s, i) => (
        <Edge key={s} points={[[x0 + i * (w + gap) + w, 63], [x0 + (i + 1) * (w + gap), 63]]} flow="api" />
      ))}
      <Edge points={[[cx(4), 86], [cx(4), 140], [cx(4) + 60, 140]]} flow="worker" />
      <Label x={cx(4) + 70} y={144} kind="elabel">relance : nouvelle campagne numérotée</Label>
    </Diagram>
  )
}

export function EsaticShareArchitecture() {
  return (
    <Diagram h={520} caption="Architecture d'EsaticShare">
      <Group x={20} y={30} w={300} h={270} label="client : PWA (Vercel)" tone="api" />
      <Box x={40} y={65} w={260} h={80} tone="api" title="React 19 + React Router 7" lines={['Context API · Axios']} />
      <Box x={40} y={190} w={260} h={80} tone="sandbox" title="Service Worker" lines={['Web Push · installation']} />
      <Group x={420} y={30} w={560} h={330} label="API : FastAPI (Render)" tone="worker" />
      <Box x={440} y={65} w={250} h={70} tone="worker" title="26 routeurs REST" lines={['+ WebSocket (jeux)']} />
      <Box x={710} y={65} w={250} h={70} tone="neutral" title="Middlewares" lines={['CORS · en-têtes sécurité', 'erreurs JSON']} />
      <Box x={440} y={165} w={520} h={70} tone="worker" title="Couche services" lines={['permissions · élections · migration · veille · e-mails · push']} />
      <Box x={440} y={265} w={520} h={70} tone="queue" title="Tâches asyncio de fond" lines={['rappels · scrutins · rentrée · palmarès']} />
      <Edge points={[[300, 92], [440, 92]]} flow="api" label="HTTPS / JWT" lx={370} ly={84} />
      <Edge points={[[300, 120], [440, 120]]} both flow="worker" label="WebSocket" lx={370} ly={138} />
      <Edge points={[[440, 228], [300, 228]]} dashed label="Web Push (VAPID)" lx={370} ly={220} />
      <Edge points={[[565, 135], [565, 165]]} flow="worker" />
      <Edge points={[[700, 265], [700, 235]]} flow="queue" />
      <Box x={20} y={430} w={220} h={70} tone="db" title="PostgreSQL" lines={['SQLAlchemy 2.0']} />
      <Box x={270} y={430} w={220} h={70} tone="ext" title="Cloudflare R2" lines={['stockage S3']} />
      <Box x={520} y={430} w={220} h={70} tone="queue" title="E-mails" lines={['Brevo · Mailjet', 'Resend · SMTP']} />
      <Box x={770} y={430} w={210} h={70} tone="neutral" title="Sources d'offres" lines={['flux publics']} />
      <Edge points={[[480, 360], [130, 430]]} flow="db" />
      <Edge points={[[560, 360], [380, 430]]} flow="ext" />
      <Edge points={[[660, 360], [630, 430]]} flow="queue" />
      <Edge points={[[880, 360], [875, 430]]} flow="neutral" />
    </Diagram>
  )
}
