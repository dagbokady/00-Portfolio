// Pages détaillées des projets : contenu public de chaque projet (repris de son dépôt vitrine)
import { useEffect } from 'react'
import { identity } from './data/portfolio.jsx'
import { Picture, Table, Code } from './article.jsx'
import { CodevalArchitecture, CodevalLifecycle, CodevalWorkflow, EsaticShareArchitecture } from './diagrams/projects.jsx'

const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  </svg>
)

const SITE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
  </svg>
)

function ProjectLinks({ site, repo }) {
  return (
    <div className="p-links">
      <a className="download-button" href={site} target="_blank" rel="noreferrer">
        {SITE_ICON}
        Voir le projet
      </a>
      <a className="download-button secondary" href={repo} target="_blank" rel="noreferrer">
        {GITHUB_ICON}
        Dépôt public
      </a>
    </div>
  )
}

function ProjectPage({ title, tagline, kicker, site, repo, children }) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · ${identity.name}`
    return () => { document.title = previous }
  }, [title])

  return (
    <article className="research-page">
      <a className="back-link" href="/#projects">← Retour au portfolio</a>
      <header className="r-header">
        <div className="r-kicker">{kicker}</div>
        <h1>{title}</h1>
        <p className="r-subtitle">{tagline}</p>
        <ProjectLinks site={site} repo={repo} />
      </header>
      {children}
      <div className="r-download">
        <p>
          Le code source complet est dans un dépôt privé. Démonstration ou accès en lecture sur
          demande : <a href={`mailto:${identity.email}`}>{identity.email}</a>
        </p>
        <ProjectLinks site={site} repo={repo} />
        <a className="back-link" href="/#projects">← Retour au portfolio</a>
      </div>
    </article>
  )
}

const CODEVAL_IMG = '/files/projets/codeval'

export function CodEval() {
  return (
    <ProjectPage
      title="CodEval"
      kicker="SaaS · Projet personnel · En production"
      tagline="Plateforme SaaS d'évaluation pratique en programmation et en algorithmique."
      site="https://codeval.space"
      repo="https://github.com/dagbokady/codevalpublic"
    >
      <section>
        <p>
          L'enseignant prépare une épreuve et ses jeux de tests. Les étudiants composent sur
          machine, en plein écran, sans pouvoir exécuter leur code, comme sur papier. Dès la
          clôture, chaque copie est figée, compilée, exécutée dans un bac à sable et notée
          automatiquement.
        </p>
        <Picture src={`${CODEVAL_IMG}/landing-light.webp`} alt="Page d'accueil de CodEval" caption="Page d'accueil de CodEval" />
        <aside className="r-note">
          <strong>Le code source est privé.</strong> Le dépôt public présente le projet : ce qu'il
          fait, comment il est construit et les choix techniques qui le structurent.
        </aside>
      </section>

      <section>
        <h2>En bref</h2>
        <Table
          rows={[
            ['Point', 'Détail'],
            ['Rôle', 'Conception, développement et déploiement, seul, de bout en bout'],
            ['Stack', 'Python 3.12 · FastAPI · SQLAlchemy 2 · PostgreSQL 17 · Alembic · React 19 · Vite · TanStack Query · CodeMirror'],
            ['Infra', 'Docker · HTTPS · e-mails transactionnels'],
            ['Taille', '≈ 43 000 lignes (Python, JavaScript, CSS) · 12 migrations Alembic · 67 tests d\'intégration sur PostgreSQL'],
            ['Utilisateurs', '3 rôles : administration, enseignant, étudiant'],
          ]}
        />
      </section>

      <section>
        <h2>Le problème</h2>
        <p>
          Évaluer la programmation sur papier est lent à corriger et ne ressemble pas au métier.
          L'évaluer sur machine pose d'autres problèmes : l'étudiant peut tester jusqu'à tomber
          juste, copier-coller, ouvrir un autre onglet, et l'enseignant se retrouve à compiler à la
          main des dizaines de copies.
        </p>
        <p>
          CodEval reprend les règles de l'épreuve sur papier (pas d'exécution, temps limité, copie
          rendue et figée) et automatise tout le reste : la surveillance, le gel des copies, la
          compilation, l'exécution des tests et la notation.
        </p>
      </section>

      <section>
        <h2>Comment ça fonctionne</h2>
        <Picture src={`${CODEVAL_IMG}/fonctionnement.webp`} alt="Les quatre étapes : créer, composer, corriger, recevoir" caption="Les quatre étapes : créer, composer, corriger, recevoir" />
        <CodevalWorkflow />
      </section>

      <section>
        <h2>Fonctionnalités</h2>
        <h3>Six types de questions dans une même épreuve</h3>
        <Picture src={`${CODEVAL_IMG}/langages-et-questions.webp`} alt="Langages et types de questions" caption="Langages et types de questions" />
        <Table
          rows={[
            ['Type', 'Correction'],
            ['Exercice de code (C, C++, Python)', 'Compilation + exécution en bac à sable + jeux de tests (trim, exact ou numeric)'],
            ['Algorithmique en blocs', "L'algorithme (LIRE, ECRIRE, SI, POUR, TANT QUE…) est traduit en Python puis passe par le même bac à sable et les mêmes tests"],
            ['QCM', 'Choix unique ou multiple, note partielle'],
            ['Correspondance', 'Proportion de paires correctement reliées'],
            ['Vrai / faux', 'Avec pénalité facultative'],
            ['Réponse courte', 'Formulations acceptées (casse, accents, ponctuation ignorés) ou mots-clés ; sans corrigé, la copie est signalée pour correction manuelle'],
          ]}
        />

        <h3>Une salle d'examen dans le navigateur</h3>
        <Picture src={`${CODEVAL_IMG}/salle-examen.webp`} alt="Contrôle de l'épreuve" caption="Contrôle de l'épreuve" />
        <ul>
          <li><strong>Plein écran obligatoire, copier-coller bloqué</strong>, selon les règles fixées par l'enseignant.</li>
          <li><strong>Détection des comportements suspects</strong> pendant l'épreuve, journalisés et <strong>décomptés côté serveur</strong>. Au-delà d'un seuil fixé par l'enseignant, la copie est gelée automatiquement.</li>
          <li><strong>Résistance aux pannes</strong> : une coupure réseau ou de courant ne fait perdre ni le travail ni le temps d'épreuve.</li>
          <li><strong>Compte à rebours synchronisé sur l'horloge du serveur</strong>, pas sur celle du poste.</li>
          <li><strong>Suivi en direct</strong> côté enseignant : qui est connecté, qui a rendu, journal des incidents ; prolongation ou clôture à tout moment.</li>
        </ul>

        <h3>Côté enseignant</h3>
        <ul>
          <li>Éditeur d'évaluation en quatre étapes : paramètres → exercices → correction → points &amp; publication.</li>
          <li>Banque d'exercices réutilisables, partageables dans l'établissement.</li>
          <li>Gestion des classes, invitation des étudiants par code ou lien.</li>
          <li>Relecture des copies, <strong>réajustement de note tracé</strong> (auteur, ancienne note, motif, date), relance de correction, publication, export Excel / CSV, statistiques.</li>
          <li>Espace communautaire d'exercices notés par les enseignants.</li>
        </ul>

        <h3>Côté administration</h3>
        <p>
          Tableau de bord, gestion des utilisateurs et des classes, ouverture ou fermeture des
          langages pour toute la plateforme, journal d'audit filtrable.
        </p>

        <h3>Transverse</h3>
        <p>
          Thème clair / sombre, interface responsive, vérification d'e-mail par code à six
          chiffres, mot de passe oublié, suppression de compte, notifications, SEO (Open Graph,
          données structurées).
        </p>
        <div className="p-gallery">
          <Picture src={`${CODEVAL_IMG}/landing-dark.webp`} alt="Thème sombre" caption="Thème sombre" />
          <Picture src={`${CODEVAL_IMG}/landing-mobile.webp`} alt="Version mobile" caption="Version mobile" narrow />
        </div>
      </section>

      <section>
        <h2>Architecture</h2>
        <CodevalArchitecture />
        <CodevalLifecycle />
        <h3>Choix techniques</h3>
        <ul>
          <li><strong>Correction hors de l'API.</strong> Les campagnes de correction sont consommées par un worker distinct et réplicable, pour qu'une correction de 500 copies ne ralentisse pas les étudiants qui composent au même moment.</li>
          <li><strong>Pas d'infrastructure superflue.</strong> Pas de Redis ni de RabbitMQ : la file de correction est une table PostgreSQL, et la réservation sans attente (<code>SKIP LOCKED</code>) suffit à faire coexister plusieurs workers.</li>
          <li><strong>Idempotence.</strong> Le traitement est idempotent par (campagne, participation, exercice) : un worker tué en pleine correction reprend sans produire de doublon. Une relance crée une nouvelle campagne sans écraser l'historique.</li>
          <li><strong>Exécution de code non fiable isolée.</strong> Le code des étudiants s'exécute dans un bac à sable aux ressources limitées, derrière une interface <code>Sandbox</code> qui permet de changer de niveau d'isolation sans toucher au moteur de correction.</li>
          <li><strong>Intégrité des corrigés.</strong> Les bonnes réponses ne quittent jamais le serveur avant la publication des résultats : elles sont retirées de tout ce qui est envoyé à l'étudiant.</li>
          <li><strong>Copies figées à la clôture.</strong> Chaque participation reçoit un <code>frozen_at</code> et l'API refuse ensuite toute écriture : la correction ne démarre jamais sur une copie encore modifiable.</li>
          <li><strong>Multi-établissements.</strong> Toutes les données sont rattachées à une organisation et filtrées à chaque requête ; un enseignant ne voit que ses propres évaluations.</li>
          <li><strong>Traçabilité.</strong> Ajustements de note, opérations sensibles et incidents sont journalisés.</li>
        </ul>
        <p>Extrait : la réservation d'une campagne par un worker.</p>
        <Code>{`def claim_next(db) -> CorrectionRun | None:
    stmt = select(CorrectionRun).where(CorrectionRun.status == RunStatus.PENDING).limit(1)
    if db.bind.dialect.name == "postgresql":
        stmt = stmt.with_for_update(skip_locked=True)
    run = db.scalar(stmt)
    if run is None:
        return None
    run.status = RunStatus.RUNNING
    run.started_at = utcnow()
    db.commit()
    return run`}</Code>
      </section>

      <section>
        <h2>Mesures de performance</h2>
        <p>
          Un banc de mesure reproductible appelle le vrai moteur de correction et le vrai bac à
          sable, sur un jeu de 500 copies générées avec une graine fixée (réponses correctes,
          partielles, erreurs de compilation, boucles infinies, copies vides). Ce travail est
          détaillé dans le <a href="/recherche/codeval">mémoire de recherche</a>.
        </p>
        <Table
          rows={[
            ['Mesure', 'Résultat'],
            ['Débit de correction (banc local)', '≈ 117 copies / minute, stable de 40 à 1 000 copies'],
            ['1 000 copies corrigées', '8 min 34 s, 0 échec'],
            ['Coût médian par test', 'analyse 108 ms · compilation 51 ms · exécution 249 ms'],
            ['Découpage fin (une tâche = une réponse) avec 8 workers', '≈ 263 copies / minute, soit × 2,2 par rapport au découpage par campagne'],
            ["Reprise après crash d'un worker", '60 / 60 copies corrigées, aucun doublon'],
          ]}
        />
        <p>
          Le banc a orienté la suite : le découpage fin des tâches est la prochaine évolution du
          moteur de correction.
        </p>
      </section>

      <section>
        <h2>Qualité et déploiement</h2>
        <ul>
          <li><strong>Tests d'intégration sur PostgreSQL</strong> (mêmes types et mêmes verrous qu'en production) couvrant le parcours complet : inscription, rôles, création d'une évaluation, ouverture de session, sauvegarde, soumission, gel, <strong>correction réelle avec compilation et exécution</strong>, ajustement tracé, relance d'une seconde campagne, export.</li>
          <li><strong>Lint</strong> ESLint côté frontend, build Vite vérifié.</li>
          <li><strong>Migrations</strong> Alembic, attente de la base au démarrage, schéma reproductible sur base vide.</li>
          <li><strong>Déploiement</strong> conteneurisé (Docker), HTTPS, sauvegardes automatisées.</li>
          <li><strong>E-mails</strong> transactionnels avec domaine authentifié (SPF / DKIM / DMARC).</li>
        </ul>
      </section>

      <section>
        <h2>Ce que ce projet m'a appris</h2>
        <ul>
          <li>Concevoir un système où <strong>l'intégrité est garantie côté serveur</strong>, pas par l'interface.</li>
          <li>Faire tourner <strong>du code non fiable</strong> en toute sécurité.</li>
          <li>Utiliser PostgreSQL comme <strong>file de tâches concurrente</strong> et rendre un traitement <strong>idempotent</strong>.</li>
          <li><strong>Mesurer avant d'optimiser</strong> : le banc de mesure a montré où se trouvait vraiment la limite de passage à l'échelle.</li>
          <li>Livrer un produit complet seul : modèle de données, API, interface, déploiement, e-mails, documentation.</li>
        </ul>
      </section>
    </ProjectPage>
  )
}

const ESATICSHARE_REPO = 'https://github.com/dagbokady/esaticshare'

export function EsaticShare() {
  return (
    <ProjectPage
      title="EsaticShare"
      kicker="Web · PWA · En production"
      tagline="La plateforme collaborative des étudiants de l'ESATIC (Abidjan, Côte d'Ivoire) : cours, examens, devoirs, emploi du temps, élections, stages et jeux, en un seul endroit."
      site="https://esaticshare.vercel.app"
      repo={ESATICSHARE_REPO}
    >
      <section>
        <Picture src="/files/projets/esaticshare/preview.webp" alt="Page d'accueil d'EsaticShare" caption="Page d'accueil d'EsaticShare" />
        <aside className="r-note">
          <strong>Le dépôt public est une vitrine.</strong> Le code source complet est dans un dépôt
          privé, parce que l'application est en production et gère des données d'étudiants. Le
          dépôt public présente le projet, l'architecture, les choix techniques et quelques
          extraits de code.
        </aside>
      </section>

      <section>
        <h2>En bref</h2>
        <Table
          rows={[
            ['Point', 'Détail'],
            ['Problème', 'Les supports de cours, sujets d\'examens et informations de classe circulaient en vrac sur WhatsApp : ils se perdaient, se retrouvaient en double et n\'étaient pas vérifiés.'],
            ['Solution', 'Une application web installable (PWA) organisée par classe, où chaque promotion partage, valide et retrouve ses ressources, avec la vie de classe autour (devoirs, annonces, élections, sondages).'],
            ['Utilisateurs', "Étudiants de l'ESATIC, du cycle préparatoire au master, ainsi que les délégués, les présidents de promotion et le bureau des étudiants (C2E)."],
            ['Mon rôle', 'Initiateur et développeur principal (full-stack) : environ 90 % des 300+ commits, de la conception de la base de données au déploiement. Le reste vient d\'une petite équipe d\'étudiants contributeurs.'],
            ['Période', "Mars 2026 à aujourd'hui, en développement actif"],
            ['Production', 'Frontend sur Vercel, API sur Render, base PostgreSQL, fichiers sur Cloudflare R2'],
          ]}
        />
        <h3>Quelques chiffres</h3>
        <Table
          rows={[
            ['Indicateur', 'Valeur'],
            ['Lignes de code (hors dépendances)', '~46 000 (backend ~17,5k · frontend ~24k · tests ~4,5k)'],
            ['Routeurs API (FastAPI)', '26'],
            ['Modèles de données (SQLAlchemy)', '26'],
            ['Pages et composants React', '21 pages · ~50 composants'],
            ['Tests automatisés (pytest)', '326 tests dans 35 fichiers'],
            ['Tâches de fond planifiées', '5 (rappels, veille emploi, élections, migration annuelle, palmarès)'],
          ]}
        />
      </section>

      <section>
        <h2>Fonctionnalités</h2>
        <h3>Scolarité</h3>
        <ul>
          <li><strong>Documents de classe</strong> : dépôt de cours, TD, sujets et corrigés (PDF, images, Word, PowerPoint), puis <strong>validation communautaire</strong>. Un fichier est publié quand <strong>70 % des membres actifs</strong> l'ont approuvé.</li>
          <li><strong>Devoirs</strong> : publiés par le délégué, avec calendrier, échéances et <strong>rappels automatiques</strong>.</li>
          <li><strong>Emploi du temps</strong> : un éditeur visuel pour les délégués, une consultation simple pour tous.</li>
          <li><strong>Simulateur de moyennes</strong> : calcul par UE et ECUE, avec les coefficients réels de chaque filière.</li>
          <li><strong>Mémoires</strong> : la bibliothèque des mémoires de fin d'études.</li>
        </ul>
        <h3>Vie de classe et gouvernance</h3>
        <ul>
          <li><strong>Hiérarchie de rôles</strong> : étudiant, (vice-)délégué, président de promotion, président C2E, admin. Un même compte peut <strong>cumuler deux rôles</strong>.</li>
          <li><strong>Élection du délégué</strong>, entièrement automatisée : ouverture du scrutin à J+7 après la rentrée, clôture à J+14, le 1er devient délégué et le 2e vice-délégué.</li>
          <li><strong>Migration de fin d'année</strong> : chaque étudiant passe au niveau suivant selon un <strong>graphe de progression</strong> qui décrit les filières (cycle ingénieur fermé, licences qui se ramifient en L2, passerelle vers le master par concours, puis statut alumni).</li>
          <li><strong>Annonces ciblées</strong> (par classe, niveau ou filière), <strong>sondages</strong>, <strong>discussion générale</strong>, notifications.</li>
        </ul>
        <h3>Insertion professionnelle</h3>
        <ul>
          <li><strong>Veille automatique d'offres de stage et d'emploi</strong> : collecte depuis des sources ivoiriennes publiques, dans le respect de <code>robots.txt</code>, puis filtrage par pays et par filière tech. Rien n'est publié sans validation de l'admin.</li>
          <li><strong>Annuaire des entreprises d'accueil</strong>, <strong>parrainage</strong> par les anciens (alumni).</li>
          <li><strong>Carte de membre</strong> numérique, exportable, avec une page publique partageable.</li>
        </ul>
        <h3>Communauté</h3>
        <ul>
          <li><strong>Jeu de dames en ligne, en temps réel</strong> (WebSocket) : matchmaking, chronomètre, spectateurs, chat, réactions, propositions de nul.</li>
          <li><strong>Word Bomb</strong>, un jeu de mots multijoueur sur un dictionnaire français normalisé.</li>
          <li><strong>Tournois</strong> et <strong>palmarès mensuel</strong>, arrêté automatiquement le 27 de chaque mois.</li>
        </ul>
        <h3>Administration</h3>
        <ul>
          <li><strong>Feature flags</strong> à 3 états (actif / test / inactif) : une fonctionnalité peut être ouverte aux seuls comptes testeurs avant sa sortie publique.</li>
          <li>Validation des inscriptions, modération, statistiques d'usage, retours utilisateurs, journal d'audit.</li>
          <li><strong>Mode « sudo »</strong> : les actions sensibles exigent de ressaisir le mot de passe, ce qui donne un jeton court de 15 min.</li>
        </ul>
      </section>

      <section>
        <h2>Architecture</h2>
        <EsaticShareArchitecture />
        <p>
          <strong>Organisation du backend</strong> : <code>routers/</code> (HTTP) →{' '}
          <code>services/</code> (règles métier) → <code>models/</code> (SQLAlchemy), avec{' '}
          <code>utils/</code> pour l'authentification, la validation, le rate limiting, les uploads
          et la session sudo. La logique métier ne vit jamais dans les routeurs.
        </p>
        <p>
          <strong>Organisation du frontend</strong> : <code>pages/</code> →{' '}
          <code>components/</code> → <code>services/</code> (un client API par domaine), état
          global dans <code>context/</code> (auth, feature flags, jeu), hooks maison
          (<code>useMediaQuery</code>, <code>useSeo</code>).
        </p>
      </section>

      <section>
        <h2>Sécurité</h2>
        <p>
          Comme la plateforme stocke des données d'étudiants et des fichiers envoyés par les
          utilisateurs, la sécurité fait partie du cahier des charges dès le départ :
        </p>
        <Table
          rows={[
            ['Menace', 'Mesure'],
            ['Faux type de fichier (exécutable renommé en .pdf)', 'Vérification des magic bytes côté serveur, avec une liste blanche stricte : on ne fait pas confiance au Content-Type du client'],
            ['Path traversal via le nom de fichier', 'Les fichiers sont stockés sous un UUID et le nom est assaini à l\'envoi au client, avec un filename* UTF-8 conforme à la RFC 6266'],
            ['Brute force sur la connexion', 'Rate limiting par IP à fenêtre glissante'],
            ['Compromission de compte', 'Mots de passe hachés avec bcrypt, double authentification par code e-mail, réinitialisation par lien à usage unique'],
            ['Action admin depuis une session volée', 'Session sudo : un JWT court (15 min) obtenu en ressaisissant le mot de passe'],
            ['Élévation de privilèges', 'Autorisations vérifiées côté serveur à chaque requête. Le front ne fait que masquer les boutons inutiles'],
            ['Usurpation d\'identité en WebSocket', 'L\'identité vient du jeton, jamais du paramètre user_id de l\'URL'],
            ['Clickjacking, sniffing, fuite du referrer', 'En-têtes X-Frame-Options: DENY, nosniff, Referrer-Policy, HSTS en production'],
            ['Découverte de l\'API', 'Swagger, ReDoc et openapi.json désactivés en production'],
            ['Fuite d\'informations en cas d\'erreur', 'Middleware qui transforme toute exception en 500 JSON générique et journalise la stack trace côté serveur'],
          ]}
        />
      </section>

      <section>
        <h2>Défis techniques</h2>
        <h3>Une migration annuelle de toute l'école, sans intervention humaine</h3>
        <p>
          À chaque rentrée (le 15 septembre), tous les étudiants changent de classe. Les parcours ne
          sont pas linéaires : le cycle ingénieur est fermé, la licence SRIT se divise en 4 filières
          en L2, et le passage de L3 en Master se fait par concours, avec un choix libre de filière.
          Ces règles sont décrites dans <strong>un graphe de progression unique</strong>, qui sert de
          source de vérité au backend comme à l'interface. Le traitement est{' '}
          <strong>idempotent</strong> : on peut le relancer sans risque. Il remet aussi les rôles à
          zéro (les délégués redeviennent étudiants), ce qui <strong>déclenche automatiquement les
          élections</strong> une semaine plus tard.
        </p>
        <h3>Un jeu de dames multijoueur en temps réel</h3>
        <p>
          Un moteur de règles complet (prises obligatoires, rafles, promotion en dame), une file de
          matchmaking, un chronomètre côté serveur, des spectateurs, un chat et des réactions, le
          tout en <strong>WebSocket</strong> avec FastAPI. En cas de déconnexion, l'abandon est{' '}
          <strong>différé</strong> pour laisser au joueur le temps de revenir. Les résultats
          alimentent un classement et un palmarès mensuel.
        </p>
        <h3>Envoyer des e-mails depuis un hébergeur qui bloque le SMTP</h3>
        <p>
          Depuis septembre 2025, Render bloque les ports SMTP sur son offre gratuite. Le service
          d'e-mail choisit donc le transport au démarrage : <strong>API HTTP</strong> (Brevo,
          Mailjet ou Resend, sur le port 443) si une clé est configurée, sinon repli sur le{' '}
          <strong>SMTP</strong>. Les codes 2FA et les réinitialisations de mot de passe continuent
          d'arriver sans changer d'offre.
        </p>
        <h3>Le schéma de base qui évolue en production sans casser</h3>
        <p>
          Au démarrage, <code>create_all</code> crée les tables manquantes, puis une série de{' '}
          <strong>patchs SQL idempotents</strong> ajoute les colonnes, valeurs d'ENUM et index
          manquants, et enfin un seed insère les données de référence. On peut déployer en continu
          sans étape manuelle de migration.
        </p>
        <h3>Des fonctionnalités en préparation sans branche à part</h3>
        <p>
          Un <strong>registre de feature flags</strong> sert de source de vérité au backend et à
          l'interface d'administration. Chaque fonctionnalité peut être active, en test (visible
          seulement par les comptes testeurs et l'admin) ou inactive. Les fonctionnalités
          essentielles ne peuvent jamais être coupées.
        </p>
      </section>

      <section>
        <h2>Qualité et workflow</h2>
        <ul>
          <li><strong>CI GitHub Actions</strong> sur chaque push et chaque PR : côté backend, lint <strong>ruff</strong>, vérification du démarrage de l'app et <strong>326 tests pytest</strong> ; côté frontend, lint <strong>ESLint</strong> (avec les règles des hooks React) et build Vite de production.</li>
          <li><strong>Prettier</strong> et ESLint côté front, <strong>ruff</strong> côté back.</li>
          <li>Commits conventionnels (<code>feat:</code>, <code>fix:</code>…) et <strong>semantic-release</strong> pour le changelog.</li>
          <li>Déploiement continu : Vercel pour le front, Render (Blueprint <code>render.yaml</code>) pour l'API.</li>
          <li>La configuration ne passe que par des variables d'environnement, aucun secret n'est versionné.</li>
        </ul>
      </section>

      <section>
        <h2>Stack technique</h2>
        <Table
          rows={[
            ['Couche', 'Technologies'],
            ['Frontend', 'React 19, React Router 7, Vite 8, Axios, React Markdown, SheetJS (export Excel), CSS maison avec thème, PWA (manifest et Service Worker)'],
            ['Backend', 'Python 3.11, FastAPI, Pydantic 2, SQLAlchemy 2.0, Uvicorn, WebSockets, asyncio, httpx'],
            ['Données', 'PostgreSQL, Cloudflare R2 (compatible S3 via boto3)'],
            ['Auth et sécurité', 'JWT (python-jose / PyJWT), bcrypt, 2FA par e-mail, rate limiting, contrôle des magic bytes'],
            ['Notifications', 'Web Push (VAPID / pywebpush), e-mails via Brevo / Mailjet / Resend / SMTP'],
            ['Qualité', 'pytest, ruff, ESLint, Prettier, GitHub Actions, semantic-release'],
            ['Hébergement', 'Vercel (front), Render (API)'],
          ]}
        />
      </section>

      <section>
        <h2>Extraits de code</h2>
        <p>Quelques modules autonomes, publiés dans le dépôt public tels qu'ils tournent en production :</p>
        <Table
          rows={[
            ['Fichier', 'Ce qu\'il montre'],
            [<a href={`${ESATICSHARE_REPO}/blob/main/extraits/backend/filesig.py`} target="_blank" rel="noreferrer">extraits/backend/filesig.py</a>, 'Validation du contenu réel des uploads par magic bytes, avec liste blanche stricte'],
            [<a href={`${ESATICSHARE_REPO}/blob/main/extraits/backend/ratelimit.py`} target="_blank" rel="noreferrer">extraits/backend/ratelimit.py</a>, 'Rate limiting à fenêtre glissante, sans dépendance externe'],
            [<a href={`${ESATICSHARE_REPO}/blob/main/extraits/backend/telechargement.py`} target="_blank" rel="noreferrer">extraits/backend/telechargement.py</a>, 'Assainissement des noms de fichiers et Content-Disposition UTF-8 (RFC 6266)'],
            [<a href={`${ESATICSHARE_REPO}/blob/main/extraits/frontend/roles.js`} target="_blank" rel="noreferrer">extraits/frontend/roles.js</a>, 'Hiérarchie des rôles et cumul de rôles côté client'],
          ]}
        />
      </section>
    </ProjectPage>
  )
}
