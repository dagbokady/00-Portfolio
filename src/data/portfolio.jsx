export const identity = {
  name: 'Christ-Phanuel DAGBO',
  fullName: 'DAGBO Kady Christ-Phanuel',
  photo: '/files/photo.png',
  role: 'Étudiant-chercheur @ ESATIC',
  bio: "Master 2 Génie Logiciel. Recherche sur l'évaluation automatique de code et la montée en charge des systèmes de correction.",
  location: "Abidjan, Côte d'Ivoire",
  email: 'dagbokady@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/dagbokady', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/christ-phanuel-dagbo', icon: 'linkedin' },
    { label: 'Recherche CodEval (PDF)', href: '/files/recherche-codeval.pdf', icon: 'file' },
  ],
}

export const about = {
  intro: (
    <>
      Bonjour ! Je suis Christ-Phanuel DAGBO, étudiant en <strong>Master 2 Génie Logiciel</strong> à
      l'École Supérieure Africaine des Technologies de l'Information et de la Communication
      (<strong>ESATIC</strong>, Abidjan). Je suis développeur d'applications web et mobile, et je
      mène en parallèle un travail de recherche sur <strong>CodEval</strong>, la plateforme de
      correction automatique de programmes que je conçois avec mon équipe.
    </>
  ),
  interests: (
    <>
      Mes intérêts de recherche portent sur les systèmes qui exécutent et notent du code à grande
      échelle, et sur la manière de les faire passer à l'échelle sans les rendre difficiles à
      exploiter :
    </>
  ),
  topics: [
    'Évaluation automatique de programmes (online judges, correction par tests)',
    'Montée en charge et parallélisme : intra-nœud, inter-nœuds, loi universelle de passage à l\'échelle',
    'Files de tâches persistantes en base de données et tolérance aux pannes',
    'Exécution de code isolée (sandbox, limites de temps et de mémoire)',
    "Ingénierie logicielle au service de l'éducation, en contexte à ressources limitées",
  ],
}

export const research = [
  {
    tag: 'Recherche',
    authors: 'Christ-Phanuel DAGBO',
    title:
      "Montée en charge de la plateforme de correction automatique CodEval : étude de quatre architectures de traitement et proposition d'une architecture fondée sur une file de tâches persistante en base de données",
    venue: 'Travail de recherche, ESATIC',
    year: '2026',
    links: [{ label: 'pdf', href: '/files/recherche-codeval.pdf' }],
    status: 'Campagnes de mesure en cours',
    abstract: (
      <>
        Le worker de CodEval corrige les copies l'une après l'autre et réserve une campagne entière
        comme unité de travail : ajouter des correcteurs ne sert donc à rien tant que le grain n'est
        pas redécoupé. Ce travail compare quatre organisations tirées de la littérature (traitement
        séquentiel, pool de processus local, workers distribués autour d'un courtier de messages,
        messagerie serverless) et propose une architecture <strong>P</strong> où chaque couple
        (copie, exercice) devient une tâche persistante dans PostgreSQL, réservée avec un{' '}
        <strong>bail qui expire</strong>. Les correcteurs, interchangeables, ne se coordonnent qu'à
        travers cette file : on peut en lancer plusieurs sur un serveur ou sur un second nœud sans
        modifier le code, et une panne laisse les tâches inachevées visibles et reprises par un
        autre.
      </>
    ),
    highlights: [
      <>Trois hypothèses testées : goulot d'étranglement du séquentiel (H1), gain du parallélisme intra-nœud (H2), passage à l'échelle inter-nœuds (H3).</>,
      <>Banc de mesure reproductible : évaluation <strong>BENCH-SRIT</strong> (5 exercices, 20 points) et 500 copies tirées à partir d'une graine, figées par une empreinte.</>,
      <>Six critères chiffrés, dont trois éliminatoires, fixés <strong>avant</strong> toute mesure, avec une règle de décision écrite à l'avance.</>,
      <>Premières mesures sur l'effet de la granularité : ajustement de la loi de Gunther (σ = 0,221, κ = 0,018), soit un débit maximal autour de 6 à 7 correcteurs sur un poste à 8 cœurs.</>,
    ],
  },
]

export const projects = [
  {
    tag: 'SaaS',
    title: "CodEval · Plateforme d'évaluation pratique en programmation",
    role: 'Product Owner & lead technique · En cours',
    url: 'https://codeval.space',
    stack: 'FastAPI, PostgreSQL, Docker, React',
    text: (
      <>
        Les enseignants créent des évaluations, les étudiants composent dans un environnement
        contrôlé, et un worker corrige en exécutant le code (C, pseudo-code transpilé en Python) dans
        une <strong>sandbox isolée</strong> contre des jeux de tests. Équipe de 13 personnes en
        sprints. Objet de mon travail de recherche.
      </>
    ),
  },
  {
    tag: 'Web',
    title: 'EsaticShare · Plateforme de ressources académiques',
    role: 'Conception, architecture et développement · En service',
    url: 'https://esaticshare.vercel.app',
    text: (
      <>
        Partage de documents de cours, devoirs et opportunités entre étudiants, avec un{' '}
        <strong>système de rôles et de permissions</strong> pour le dépôt, la modération et l'accès,
        et un travail sur la sécurité applicative (authentification, validation des fichiers).
      </>
    ),
  },
]

export const experience = [
  {
    date: 'Avr. 2025 – Juin 2025',
    title: 'Stagiaire MOA & développeur full-stack',
    org: 'SUNU GROUP / SUNU DIGITECH',
    logo: '/files/logos/sunu-digitech.jpg',
    logoAlt: 'SUNU DigiTech',
    text: (
      <>
        Plateforme interne de gestion des commandes et des stocks : analyse des besoins et
        modélisation <strong>UML</strong>, API REST en <strong>Java / Spring Boot</strong> et
        PostgreSQL, authentification JWT et contrôle d'accès par rôle, interfaces{' '}
        <strong>React</strong> / Tailwind CSS, conteneurisation <strong>Docker</strong>.
      </>
    ),
  },
]

export const education = [
  { date: 'En cours', title: 'Master 2 Génie Logiciel', org: 'ESATIC, Abidjan' },
  { date: '2022 – 2025', title: "Licence Systèmes d'Information et Génie Logiciel", org: 'ESATIC, Abidjan' },
  { date: '2022', title: 'Baccalauréat série C', org: "Lycée d'excellence Alassane Ouattara" },
]

export const skills = [
  { name: 'Langages', list: 'Java, Python, JavaScript, C, C++, Scala, SQL' },
  { name: 'Backend', list: 'FastAPI, Spring Boot, API REST, JWT' },
  { name: 'Frontend & mobile', list: 'React, React Native, Tailwind CSS' },
  { name: 'Données', list: 'PostgreSQL, modélisation, ORM' },
  { name: 'Systèmes', list: 'Docker, Linux, CI/CD, sandbox, files de tâches' },
  { name: 'Recherche', list: 'Bancs de mesure reproductibles, bootstrap, Mann-Whitney, loi de Gunther' },
]

export const certifications = [
  { title: 'React Native · Udemy', href: 'https://www.udemy.com/certificate/UC-a7fc0d81-e068-4c44-bc6d-cf562916ee62/' },
  { title: 'English · EF SET (B1)', href: 'https://cert.efset.org/fr/QjvCKh' },
]

export const languages = 'Français (maternelle) · Anglais (B1) · Japonais (débutant)'
