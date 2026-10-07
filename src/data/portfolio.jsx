export const identity = {
  name: 'Christ-Phanuel DAGBO',
  fullName: 'DAGBO Kady Christ-Phanuel',
  photo: '/files/photo.png',
  role: 'Étudiant en Master 2 @ ESATIC',
  schoolLogo: '/files/logos/esatic.jpg',
  bio: (
    <>
      Master 2 SIGL-ID2C : Systèmes Informatiques et <strong>Génie Logiciel</strong>, option{' '}
      <strong>Ingénierie Data et Cloud Computing</strong>. Recherche sur l'évaluation automatique
      de code et la montée en charge des systèmes de correction.
    </>
  ),
  location: "Abidjan, Côte d'Ivoire",
  email: 'dagbokady@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/dagbokady', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christ-phanuel-dagbo', icon: 'linkedin' },
    { label: 'Recherche CodEval', href: '/recherche/codeval', icon: 'file' },
  ],
  languages: ['Français (natif)', 'Anglais (B1)', 'Japonais (débutant)'],
}

export const about = {
  intro: (
    <>
      Bonjour ! Je suis Christ-Phanuel DAGBO, étudiant en <strong>Master 2 SIGL-ID2C</strong>{' '}
      (Systèmes Informatiques et <strong>Génie Logiciel</strong>, option{' '}
      <strong>Ingénierie Data et Cloud Computing</strong>) à
      l'École Supérieure Africaine des Technologies de l'Information et de la Communication
      (<strong>ESATIC</strong>, Abidjan). Je suis <strong>ingénieur logiciel</strong> et mon métier est
      de résoudre des problèmes : analyser un problème, comprendre les besoins réels, puis
      concevoir des solutions logicielles <strong>fiables, performantes et orientées utilisateur</strong>. Je mène en
      parallèle un travail de recherche sur la <strong>montée en charge des plateformes de
      correction automatique de programmes</strong> : comment répartir la correction de centaines
      de copies entre plusieurs correcteurs, sur un ou plusieurs serveurs, sans perdre de travail
      en cas de panne.
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
    page: '/recherche/codeval',
    links: [{ label: 'lire la recherche', href: '/recherche/codeval' }],
  },
]

export const projects = [
  {
    tag: 'SaaS',
    title: "CodEval · Plateforme d'évaluation pratique en programmation",
    url: 'https://codeval.space',
    repo: 'https://github.com/dagbokady/codevalpublic',
    page: '/projets/codeval',
    stack: 'FastAPI, PostgreSQL, Docker, React',
    text: (
      <>
        Les enseignants créent des évaluations, les étudiants composent dans un environnement
        contrôlé, et un worker corrige en exécutant le code (C, pseudo-code transpilé en Python) dans
        une <strong>sandbox isolée</strong> contre des jeux de tests. Conçu, développé et déployé
        <strong>seul</strong>, de bout en bout. Objet de mon travail de recherche.
      </>
    ),
  },
  {
    tag: 'Web',
    title: 'EsaticShare · Plateforme de ressources académiques',
    url: 'https://esaticshare.vercel.app',
    repo: 'https://github.com/dagbokady/esaticshare',
    page: '/projets/esaticshare',
    stack: 'FastAPI, SQLAlchemy, PostgreSQL, JWT, React, Vite',
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
  {
    date: 'Depuis juil. 2026',
    title: 'Responsable production digitale & communication',
    org: "A-LEX, Anciens du Lycée d'Excellence Alassane Ouattara (temps partiel, hybride)",
    logo: '/files/logos/a-lex.png',
    logoAlt: 'A-LEX',
    text: (
      <>
        Développer l'image de marque d'A-LEX et assurer la communication interne et externe de
        l'association. Missions :
        <ul className="missions">
          <li>Élaborer la stratégie de communication.</li>
          <li>Concevoir les visuels, vidéos et supports de communication.</li>
          <li>Concevoir les outils digitaux de gestion de l'association.</li>
        </ul>
      </>
    ),
  },
]

export const education = [
  { date: 'En cours', title: 'Master 2 SIGL-ID2C · Systèmes Informatiques et Génie Logiciel, option Ingénierie Data et Cloud Computing', org: 'ESATIC, Abidjan', logo: '/files/logos/esatic.jpg', logoAlt: 'ESATIC' },
  { date: '2022 – 2025', title: "Licence Systèmes d'Information et Génie Logiciel", org: 'ESATIC, Abidjan', logo: '/files/logos/esatic.jpg', logoAlt: 'ESATIC' },
  { date: '2022', title: 'Baccalauréat série C', org: "Lycée d'excellence Alassane Ouattara", logo: '/files/logos/lycee-alassane-ouattara.png', logoAlt: "Lycée d'excellence Alassane Ouattara" },
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
