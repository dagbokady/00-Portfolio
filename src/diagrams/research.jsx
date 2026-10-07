// Les schémas du mémoire de recherche, redessinés en SVG animé
import { Bar, Box, Diagram, Edge, Group, Label, Step } from './Diagram.jsx'
import { TONES } from './tones.js'

export function Fig11() {
  return (
    <Diagram h={400} caption="Figure 1.1 - Architecture générale de la plateforme CodEval">
      <Box x={40} y={30} w={300} h={120} tone="api" title="API FastAPI" lines={['utilisateurs', 'évaluations', 'soumissions', 'lance la correction']} />
      <Box x={660} y={30} w={300} h={120} tone="worker" title="Worker de correction" lines={['récupère les campagnes', 'en attente', 'traite chaque copie']} />
      <Box x={200} y={260} w={300} h={120} tone="db" title="PostgreSQL" lines={['utilisateurs', 'évaluations', 'soumissions', 'résultats']} />
      <Box x={660} y={260} w={300} h={120} tone="sandbox" title="Sandbox (isolée)" lines={['limites de temps', 'limites de mémoire', 'exécute le code étudiant']} />
      <Edge points={[[340, 90], [660, 90]]} both flow="api" label="écrit / lit" lx={500} ly={80} />
      <Edge points={[[190, 150], [290, 260]]} flow="db" />
      <Edge points={[[740, 150], [440, 260]]} flow="db" />
      <Edge points={[[860, 150], [860, 260]]} flow="sandbox" label={['compile et', 'exécute']} lx={872} ly={200} anchor="start" />
    </Diagram>
  )
}

export function Fig21() {
  const copies = ['Copie 1', 'Copie 2', 'Copie 3', '…', 'Copie N']
  return (
    <Diagram h={440} caption="Figure 2.1 - Traitement séquentiel : organisation et déroulement">
      <Group x={20} y={20} w={960} h={250} label="serveur" />
      <Box x={60} y={60} w={200} h={70} tone="api" title="API" lines={['FastAPI']} />
      <Box x={400} y={60} w={200} h={70} tone="worker" title="Worker" lines={['(unique)']} />
      <Box x={740} y={60} w={200} h={70} tone="db" title="PostgreSQL" />
      <Box x={400} y={175} w={200} h={70} tone="sandbox" title="Sandbox" lines={['(exécution)']} />
      <Edge points={[[260, 95], [400, 95]]} flow="api" />
      <Edge points={[[600, 95], [740, 95]]} flow="db" />
      <Edge points={[[500, 130], [500, 175]]} flow="sandbox" />
      <Label x={20} y={315}>flux de traitement : une copie après l'autre</Label>
      {copies.map((c, i) => (
        <Bar key={c} x={20 + i * 192} y={335} w={176} label={c} start={i * 760} />
      ))}
      <Edge points={[[20, 408], [960, 408]]} />
      <Label x={960} y={428} anchor="end" kind="note">temps</Label>
    </Diagram>
  )
}

export function Fig22() {
  return (
    <Diagram h={500} caption="Figure 2.2 - Pool de processus local sur une machine multiprocesseur (architecture A), ici avec trois workers">
      <Group x={20} y={20} w={960} h={240} label="serveur" />
      <Box x={45} y={100} w={170} h={70} tone="api" title="API" lines={['FastAPI']} />
      <Group x={260} y={55} w={470} h={180} label="ProcessPoolExecutor" />
      {['Worker 1', 'Worker 2', 'Worker N'].map((t, i) => (
        <Box key={t} x={285 + i * 145} y={90} w={130} h={110} tone="worker" title={t} lines={['sandbox']} />
      ))}
      <Box x={785} y={100} w={170} h={70} tone="db" title="PostgreSQL" />
      <Edge points={[[215, 135], [260, 135]]} flow="api" />
      <Edge points={[[730, 135], [785, 135]]} flow="db" />
      <Label x={20} y={300}>flux de traitement (N = 3 workers) : trois copies à la fois</Label>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <Label x={20} y={340 + row * 44} kind="note">{`worker ${row + 1}`}</Label>
          {[0, 1, 2, 3].map((col) => (
            <Bar key={col} x={130 + col * 190} y={316 + row * 44} w={176} h={34} label={`Copie ${col * 3 + row + 1}`} start={col * 760} />
          ))}
          <Label x={905} y={338 + row * 44} kind="note">…</Label>
        </g>
      ))}
      <Edge points={[[130, 470], [960, 470]]} />
      <Label x={960} y={490} anchor="end" kind="note">temps</Label>
    </Diagram>
  )
}

export function Fig23() {
  const rows = [90, 190, 290]
  return (
    <Diagram h={470} caption="Figure 2.3 - Dispositif à courtier de messages mesuré par Ibrahim et al. (architecture B)">
      <Label x={150} y={40} anchor="middle" kind="head">services producteurs</Label>
      <Label x={150} y={58} anchor="middle" kind="note">(Spring Boot / Python)</Label>
      <Label x={850} y={40} anchor="middle" kind="head">services consommateurs</Label>
      <Label x={850} y={58} anchor="middle" kind="note">(Spring Boot / Python)</Label>
      {rows.map((y, i) => (
        <Box key={`p${y}`} x={30} y={y} w={240} h={60} tone="api" title={`Producteur ${['1', '2', 'n'][i]}`} />
      ))}
      {rows.map((y, i) => (
        <Box key={`c${y}`} x={730} y={y} w={240} h={60} tone="worker" title={`Consommateur ${['1', '2', 'n'][i]}`} />
      ))}
      <Box x={380} y={115} w={240} h={160} tone="queue" title="Courtier de messages" lines={['[M1] [M2] … [Mn]', '', 'Kafka | ActiveMQ Artemis', 'RabbitMQ | NATS']} />
      {rows.map((y) => (
        <Edge key={`e${y}`} points={[[270, y + 30], [325, y + 30], [325, 195], [380, 195]]} flow="api" />
      ))}
      {rows.map((y) => (
        <Edge key={`f${y}`} points={[[620, 195], [675, 195], [675, y + 30], [730, y + 30]]} flow="worker" />
      ))}
      <Label x={325} y={82} anchor="middle" kind="note">publication</Label>
      <Label x={675} y={82} anchor="middle" kind="note">consommation</Label>
      <Box x={310} y={335} w={380} h={64} tone="neutral" title="Mesures relevées par l'étude" lines={['latence, débit, montée en charge, fiabilité']} />
      <Edge points={[[500, 275], [500, 335]]} />
      <Label x={500} y={428} anchor="middle" kind="note">le bloc central est occupé tour à tour par chacun des quatre courtiers :</Label>
      <Label x={500} y={444} anchor="middle" kind="note">l'architecture ne change pas, seules la latence et la fiabilité mesurées varient</Label>
    </Diagram>
  )
}

export function Fig24() {
  return (
    <Diagram h={580} caption="Figure 2.4 - Messagerie serverless élastique et workers éphémères (architecture C)">
      <Box x={350} y={20} w={300} h={66} tone="api" title="API FastAPI" lines={['(établissement)']} />
      <Edge points={[[500, 86], [500, 150]]} flow="queue" label="dépôt des tâches (protocole standard)" lx={512} ly={122} anchor="start" />
      <Group x={80} y={150} w={840} h={185} label="service de messagerie serverless (fournisseur cloud)" />
      <Box x={110} y={180} w={780} h={48} tone="queue" title="Couche d'accès sans état (multi-protocole)" />
      <Box x={110} y={252} w={780} h={60} tone="queue" title="Couche de stockage séparée" lines={["partitions d'écriture élastiques, files légères"]} />
      <Edge points={[[500, 228], [500, 252]]} />
      <Edge points={[[500, 335], [500, 385]]} flow="worker" label="tâches, au rythme de la demande" lx={512} ly={365} anchor="start" />
      {[150, 400, 650].map((x) => (
        <Box key={x} x={x} y={385} w={200} h={64} tone="worker" title="Worker éphémère" lines={['+ sandbox']} />
      ))}
      <Box x={380} y={510} w={240} h={50} tone="db" title="PostgreSQL" />
      <Edge points={[[250, 449], [440, 510]]} flow="db" />
      <Edge points={[[500, 449], [500, 510]]} flow="db" />
      <Edge points={[[750, 449], [560, 510]]} flow="db" />
      <Label x={980} y={490} anchor="end" kind="note">lancés à la demande, ramenés à zéro</Label>
      <Label x={980} y={506} anchor="end" kind="note">quand la file est vide</Label>
    </Diagram>
  )
}

const LIMITS = [
  [['Séquentiel : temps linéaire,', 'processeur inactif pendant la sandbox'], ["Occuper tous les cœurs d'un serveur"]],
  [["Pool A : plafond d'un seul serveur"], ['Ajouter un serveur sans changer le code']],
  [['Séquentiel et A : un arrêt brutal', 'stoppe toute la campagne'], ["Survivre à l'arrêt brutal d'un worker,", 'sans perdre ni doubler une note']],
  [['B : courtier à déployer et à superviser', "C : fournisseur cloud, copies hors de l'établissement"], ['N\'ajouter aucun composant', "d'infrastructure ni dépendance externe"]],
  [['A et B : écritures concurrentes', 'dans PostgreSQL'], ['Limiter les transactions et les verrous', 'sur les lignes partagées']],
  [['Toutes : copies de coût très inégal', '(de 0,01 s à 12 s)'], ['Répartir le travail en petites unités,', 'les plus lourdes en premier']],
  [['B et C : logique de lancement', 'à repenser'], ['Garder intacts le moteur de correction', 'et le modèle de données existant']],
]

export function Fig31() {
  return (
    <Diagram h={540} caption="Figure 3.1 - Traduction des limites des architectures étudiées en exigences de conception">
      <Label x={20} y={30} kind="head">limites observées (chapitre 2)</Label>
      <Label x={540} y={30} kind="head">exigences de conception</Label>
      {LIMITS.map(([limit, req], i) => {
        const y = 50 + i * 70
        return (
          <g key={i}>
            <Box x={20} y={y} w={440} h={58} tone="worker" lines={limit} left />
            <Box x={584} y={y} w={396} h={58} lines={req} left />
            <rect className="dg-fade" x={540} y={y} width={44} height={58} rx="6" fill="#2f2f2f" />
            <text className="dg-fade dg-badge" x={562} y={y + 34} textAnchor="middle">{`E${i + 1}`}</text>
            <Edge points={[[460, y + 29], [540, y + 29]]} flow="api" />
          </g>
        )
      })}
    </Diagram>
  )
}

export function Fig32() {
  return (
    <Diagram h={640} caption="Figure 3.2 - Vue d'ensemble de l'architecture proposée (P)">
      <Box x={20} y={20} w={240} h={66} tone="queue" title="Enseignant" lines={['« Lancer la correction »']} />
      <Box x={330} y={15} w={460} h={76} tone="api" title="API FastAPI" lines={['1. crée la campagne', '2. crée une tâche par réponse (copie × exercice)']} left />
      <Edge points={[[260, 53], [330, 53]]} flow="queue" />
      <Edge points={[[560, 91], [560, 145]]} flow="db" label="une seule transaction" lx={572} ly={122} anchor="start" />
      <Group x={20} y={145} w={960} h={150} label="PostgreSQL" tone="db" />
      <Box x={45} y={175} w={280} h={95} tone="db" mono title="correction_runs" lines={['les campagnes']} />
      <Box x={360} y={175} w={280} h={95} tone="db" mono title="correction_tasks" lines={['la file : pending | running', 'done | failed', 'priorité, bail, tentatives']} />
      <Box x={675} y={175} w={280} h={95} tone="db" mono title="correction_results" lines={['les notes, contrainte', "d'unicité uq_result"]} />
      <Edge points={[[185, 385], [185, 295]]} flow="worker" label={['réserver un lot de k tâches', '(SKIP LOCKED)']} lx={197} ly={330} anchor="start" />
      <Edge points={[[500, 385], [500, 295]]} flow="worker" label={['prolonger le bail', '(toutes les 15 s)']} lx={512} ly={330} anchor="start" />
      <Edge points={[[815, 385], [815, 295]]} flow="worker" label={['écrire le lot', '(1 transaction)']} lx={827} ly={330} anchor="start" />
      <Box x={20} y={385} w={960} h={36} tone="neutral" title="Workers des nœuds 1 à M, identiques et reliés à la même base" />
      <Group x={20} y={450} w={570} h={170} label="nœud 1" />
      <Box x={40} y={475} w={530} h={36} tone="sandbox" mono title="superviseur : app.worker --processes N" />
      {['Worker 1', 'Worker 2', 'Worker N'].map((t, i) => (
        <Box key={t} x={40 + i * 180} y={527} w={170} h={72} tone="worker" title={t} lines={['sandbox']} />
      ))}
      <Group x={610} y={450} w={370} h={170} label="nœud 2 (facultatif)" />
      <Box x={630} y={475} w={330} h={36} tone="sandbox" title="même commande, même base" />
      {['Worker 1', 'Worker N'].map((t, i) => (
        <Box key={t} x={630 + i * 170} y={527} w={160} h={72} tone="worker" title={t} lines={['sandbox']} />
      ))}
    </Diagram>
  )
}

export function Fig33() {
  const S = 90
  return (
    <Diagram h={400} caption="Figure 3.3 - Effet de la granularité sur l'équilibre de charge (c = copie, ex = exercice)">
      <Label x={20} y={28} kind="head">découpage par copie (architectures A et B) : une copie lente retarde toute la fin de campagne</Label>
      <Label x={20} y={70} kind="note">W1</Label>
      <Label x={20} y={116} kind="note">W2</Label>
      {['c1', 'c3', 'c5', 'c7', 'c9'].map((c, i) => <Bar key={c} x={S + i * 100} y={46} w={96} label={c} start={i * 400} />)}
      <Bar x={S + 500} y={46} w={350} label="inactif" idle start={2000} />
      {['c2', 'c4', 'c6', 'c8'].map((c, i) => <Bar key={c} x={S + i * 100} y={92} w={96} label={c} start={i * 400} />)}
      <Bar x={S + 400} y={92} w={450} label="c10.ex1 : boucle infinie (12 s), puis ex2 à ex5" slow start={1600} />
      <Edge points={[[S, 150], [S + 850, 150]]} plain />
      <line className="dg-fade" x1={S + 850} y1={142} x2={S + 850} y2={158} stroke="#d9483b" strokeWidth="2" />
      <Label x={S + 850} y={176} anchor="middle" kind="late">fin tardive</Label>

      <Label x={20} y={228} kind="head">découpage par réponse, tâches lourdes d'abord (architecture P)</Label>
      <Label x={20} y={270} kind="note">W1</Label>
      <Label x={20} y={316} kind="note">W2</Label>
      <Bar x={S} y={246} w={290} label="c10.ex1 : boucle infinie (12 s)" slow start={0} />
      {['c7.ex2', 'c9.ex3', 'QCM', 'QCM', 'V/F'].map((c, i) => <Bar key={i} x={S + 290 + i * 66} y={246} w={62} label={c} start={1160 + i * 264} />)}
      <Bar x={S} y={292} w={290} label="c1.ex1 | c2.ex1 | c3.ex1 | …" start={0} />
      {['c1.ex2', 'c1.ex3', '…', 'QCM', 'V/F'].map((c, i) => <Bar key={i} x={S + 290 + i * 66} y={292} w={62} label={c} start={1160 + i * 264} />)}
      <Edge points={[[S, 350], [S + 620, 350]]} plain />
      <line className="dg-fade" x1={S + 620} y1={342} x2={S + 620} y2={358} stroke={TONES.db} strokeWidth="2" />
      <Label x={S + 620} y={376} anchor="middle" kind="early">fin plus tôt</Label>
      <Label x={S} y={376} kind="note">temps →</Label>
    </Diagram>
  )
}

export function Fig34() {
  return (
    <Diagram h={370} caption="Figure 3.4 - États d'une tâche de correction">
      <Label x={310} y={34} anchor="middle" kind="note">réservation par un worker</Label>
      <Label x={310} y={48} anchor="middle" kind="note">(SKIP LOCKED, bail = maintenant + 60 s)</Label>
      <Box x={20} y={70} w={170} h={60} tone="db" mono title="pending" />
      <Box x={430} y={55} w={220} h={90} tone="api" mono title="running" lines={['bail prolongé', 'toutes les 15 s']} />
      <Box x={790} y={70} w={180} h={60} tone="db" mono title="done" />
      <Box x={450} y={285} w={180} h={60} tone="fail" mono title="failed" />
      <Edge points={[[190, 100], [430, 100]]} flow="api" />
      <Edge points={[[650, 100], [790, 100]]} flow="db" label="note écrite" lx={720} ly={90} />
      <Edge points={[[500, 145], [500, 210], [105, 210], [105, 130]]} flow="queue" label="bail expiré (worker mort ou bloqué), ou erreur, avec tentatives < 3" lx={302} ly={200} />
      <Edge points={[[580, 145], [580, 285]]} flow="fail" label={['erreur à la', '3e tentative']} lx={592} ly={238} anchor="start" />
    </Diagram>
  )
}

function Lifelines({ xs, to }) {
  return xs.map((x) => (
    <line key={x} className="dg-fade" x1={x} y1={72} x2={x} y2={to} stroke="#3a3a3a" strokeOpacity=".45" strokeDasharray="4 5" />
  ))
}

export function Fig35() {
  const [T, A, D, W] = [120, 380, 640, 880]
  const msg = (from, to, y, label) => (
    <Edge seq points={[[from, y], [to, y]]} flow="api" label={label} lx={(from + to) / 2} ly={y - (Array.isArray(label) ? 22 : 8)} />
  )
  return (
    <Diagram h={600} caption="Figure 3.5 - Séquence de traitement d'une campagne">
      <Box x={T - 100} y={15} w={200} h={56} tone="queue" title="Enseignant" />
      <Box x={A - 100} y={15} w={200} h={56} tone="api" title="API FastAPI" />
      <Box x={D - 100} y={15} w={200} h={56} tone="db" title="PostgreSQL" />
      <Box x={W - 100} y={15} w={200} h={56} tone="worker" title="Worker Wi" lines={['N par nœud']} />
      <Lifelines xs={[T, A, D, W]} to={585} />
      {msg(T, A, 115, 'lancer la correction')}
      {msg(A, D, 170, ['INSERT campagne + INSERT tâches (pending)', 'une seule transaction'])}
      {msg(A, T, 220, 'campagne acceptée')}
      {msg(W, D, 270, 'réserver k tâches')}
      {msg(D, W, 315, 'lot de tâches + bail')}
      <Step>
        <rect x={W - 112} y={332} width={224} height={48} rx="6" fill="var(--dg-box)" stroke="#3a3a3a" />
        <circle cx={W - 101} cy={343} r="3.5" fill={TONES.sandbox} />
        <text className="dg-title dg-mono" x={W} y={353} textAnchor="middle">grade_exercise() × k</text>
        <text className="dg-sub" x={W} y={370} textAnchor="middle">en sandbox</text>
      </Step>
      {msg(W, D, 415, 'prolonger le bail')}
      {msg(W, D, 465, 'notes + statut done (1 transaction)')}
      {msg(T, D, 515, 'progression : COUNT(done) / total')}
      {msg(W, D, 565, 'dernière tâche done ⇒ campagne done ou partial')}
    </Diagram>
  )
}

export function Fig36() {
  return (
    <Diagram h={500} caption="Figure 3.6 - Les deux modes de déploiement de l'architecture proposée">
      <Label x={20} y={24} kind="head">déploiement mono-nœud (établissement, une machine)</Label>
      <Group x={20} y={50} w={960} h={170} label="serveur unique" />
      <Box x={50} y={82} w={260} h={50} tone="api" title="API FastAPI" />
      <Box x={345} y={82} w={260} h={50} tone="db" title="PostgreSQL" />
      <Box x={650} y={80} w={300} h={44} tone="sandbox" mono title="superviseur --processes N" />
      <Box x={650} y={150} w={300} h={44} tone="worker" title="W1 W2 … WN" />
      <Edge points={[[800, 124], [800, 150]]} plain />

      <Label x={20} y={270} kind="head">déploiement multi-nœuds (examen commun, forte charge)</Label>
      <Group x={20} y={295} w={450} h={190} label="serveur 1" />
      <Box x={40} y={325} w={195} h={46} tone="api" title="API FastAPI" />
      <Box x={255} y={325} w={195} h={46} tone="db" title="PostgreSQL" />
      <Box x={40} y={381} w={410} h={40} tone="sandbox" mono title="superviseur --processes N" />
      <Box x={40} y={431} w={410} h={40} tone="worker" title="W1 W2 … WN" />
      <Group x={530} y={295} w={450} h={190} label="serveur 2" />
      <Box x={550} y={325} w={410} h={46} tone="neutral" title="aucun composant supplémentaire" />
      <Box x={550} y={381} w={410} h={40} tone="sandbox" mono title="superviseur --processes N" />
      <Box x={550} y={431} w={410} h={40} tone="worker" title="W1 W2 … WN" />
      <Edge points={[[470, 348], [530, 348]]} both flow="db" label="même base" lx={500} ly={336} />
    </Diagram>
  )
}

export function Fig41() {
  return (
    <Diagram h={600} caption="Figure 4.1 - Dispositif expérimental sur le poste de mesure">
      <Group x={15} y={20} w={970} h={565} label="MacBook Pro 14 pouces, Apple M3 : 8 cœurs, 8 Go" />
      <Box x={45} y={60} w={260} h={90} tone="queue" title="Orchestrateur" lines={['prépare, démarre, déclenche,', 'chronomètre et exporte']} />
      <Box x={400} y={55} w={370} h={100} tone="api" title="Workers de l'architecture testée" lines={['Seq | A (pool) | B | P', 'même moteur de correction, même sandbox']} />
      <Edge points={[[305, 105], [400, 105]]} flow="queue" label="lance / arrête" lx={352} ly={95} />
      <Box x={45} y={265} w={725} h={80} tone="db" title="PostgreSQL 18.3 : base codeval_bench" lines={['copies, tâches de P, notes horodatées']} />
      <Box x={800} y={265} w={165} h={80} tone="sandbox" title="Redis 7.2" lines={['Docker,', 'architecture B']} />
      <Edge points={[[175, 150], [175, 265]]} flow="queue" label={['crée la campagne,', 'compte les notes (200 ms)']} lx={187} ly={200} anchor="start" />
      <Edge points={[[470, 155], [470, 265]]} flow="db" label={['notes', '(et tâches pour P)']} lx={482} ly={200} anchor="start" />
      <Edge points={[[770, 125], [882, 125], [882, 265]]} flow="sandbox" label="tâches (B)" lx={894} ly={200} anchor="start" />
      <Box x={45} y={455} w={330} h={84} tone="worker" title="Échantillonneur" lines={['processeur et mémoire des workers', 'et de leurs fils (500 ms)']} />
      <Box x={420} y={455} w={230} h={84} tone="api" title="API FastAPI" />
      <Box x={700} y={455} w={265} h={84} tone="worker" title="Sonde d'API" lines={['toutes les 200 ms']} />
      <Edge points={[[160, 455], [160, 345]]} flow="worker" label={['attentes de verrous', '(1 s)']} lx={172} ly={395} anchor="start" />
      <Edge points={[[535, 455], [535, 345]]} flow="api" label={['lecture pendant', 'la correction']} lx={547} ly={395} anchor="start" />
      <Edge points={[[700, 497], [650, 497]]} flow="worker" />
    </Diagram>
  )
}

const STEPS = [
  ['Recréer la base', 'Supprimer la base de test et la recréer à partir du modèle, puis retirer les copies au-delà de la charge voulue', 'api'],
  ['Vider la file', "Sans objet pour l'architecture actuelle ; listes Redis pour B, table de file pour P", 'api'],
  ['Démarrer', "L'échantillonneur, puis le ou les workers ; attendre 5 secondes", 'db'],
  ['Déclencher (t0)', "Créer la campagne de correction : son heure de création est l'origine de tous les temps", 'db'],
  ['Attendre', "Compter les notes toutes les 200 ms jusqu'au total attendu, ou abandonner après 3 600 s", 'queue'],
  ['Arrêter', "Demander l'arrêt des workers et de l'échantillonneur", 'queue'],
  ['Exporter', 'Notes, horodatages, échantillons et journal dans un fichier de mesure', 'neutral'],
  ['Refroidir', '60 secondes de pause avant la mesure suivante', 'neutral'],
]

export function Fig42() {
  return (
    <Diagram h={600} caption="Figure 4.2 - Les huit étapes d'une mesure">
      <Edge points={[[60, 30], [60, 585]]} plain flow="queue" />
      {STEPS.map(([title, text, tone], i) => {
        const y = 22 + i * 72
        return (
          <g key={title}>
            <line className="dg-fade" x1={60} y1={y + 28} x2={100} y2={y + 28} stroke="#3a3a3a" />
            <circle className="dg-fade" cx={60} cy={y + 28} r="5" fill={TONES[tone]} />
            <text className="dg-fade dg-num" x={30} y={y + 33} textAnchor="middle">{String(i + 1).padStart(2, '0')}</text>
            <Box x={100} y={y} w={880} h={56} title={title} lines={[text]} left />
          </g>
        )
      })}
    </Diagram>
  )
}
