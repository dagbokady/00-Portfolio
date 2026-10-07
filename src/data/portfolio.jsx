export const identity = {
  name: 'Christ-Phanuel DAGBO',
  fullName: 'DAGBO Kady Christ-Phanuel',
  photo: '/files/photo.png',
  role: 'Étudiant en Master 2 @ ESATIC',
  schoolLogo: '/files/logos/esatic.jpg',
  bio: [
    <>
      Master II <strong>Génie logiciel</strong> option{' '}
      <strong>Ingénierie Data et Cloud Computing</strong>
    </>,
    "Recherche sur l'évaluation automatique de code et la montée en charge des systèmes de correction.",
  ],
  location: "Abidjan, Côte d'Ivoire",
  email: 'dagbokady@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/dagbokady', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christ-phanuel-dagbo', icon: 'linkedin' },
  ],
  languages: [
    { label: 'Français (natif)', flag: 'fr' },
    { label: 'Anglais (B1)', flag: 'gb' },
    { label: 'Japonais (débutant)', flag: 'jp' },
  ],
  softSkills: ['Autonomie', 'Rigueur', "Esprit d'analyse", 'Communication', 'Travail en équipe', 'Gestion de projet'],
}

export const about = {
  intro: (
    <>
      Bonjour ! Je suis Christ-Phanuel DAGBO, <strong>ingénieur logiciel</strong> et étudiant en{' '}
      <strong>Master II Génie logiciel</strong>, option{' '}
      <strong>Ingénierie Data et Cloud Computing</strong>, à l'<strong>ESATIC</strong> (Abidjan).
      J'analyse les besoins réels et je conçois des solutions logicielles{' '}
      <strong>fiables, performantes et orientées utilisateur</strong>.
    </>
  ),
  interests: (
    <>
      Ma recherche porte sur la{' '}
      <strong>montée en charge des plateformes de correction automatique de programmes</strong> :
    </>
  ),
  topics: [
    'Évaluation automatique de programmes (correction par tests)',
    "Parallélisme et passage à l'échelle, sur un ou plusieurs serveurs",
    'Files de tâches persistantes et tolérance aux pannes',
    'Exécution de code isolée (sandbox)',
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
        une <strong>sandbox isolée</strong> contre des jeux de tests. Conçu, développé et déployé{' '}
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

// Réalisations et résultats plutôt que missions
export const experience = [
  {
    date: 'Avr. 2025 – Juin 2025',
    title: 'Stagiaire MOA & développeur full-stack',
    org: 'SUNU GROUP / SUNU DIGITECH',
    logo: '/files/logos/sunu-digitech.jpg',
    logoAlt: 'SUNU DigiTech',
    text: (
      <>
        Livré une <strong>plateforme interne de gestion des commandes et des stocks</strong>, de
        l'analyse des besoins à la mise en conteneur :
        <ul className="missions">
          <li>Besoins recueillis auprès du métier et modélisés en <strong>UML</strong>.</li>
          <li>
            API REST <strong>Java / Spring Boot</strong> sur PostgreSQL, sécurisée par JWT et
            contrôle d'accès par rôle.
          </li>
          <li>
            Interfaces <strong>React</strong> / Tailwind CSS ; application conteneurisée avec{' '}
            <strong>Docker</strong>.
          </li>
        </ul>
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
        <ul className="missions">
          <li>
            Conçu et mis en ligne le <strong>site des élections</strong> de l'association : vote et
            présentation des candidats, puis organigramme du Bureau exécutif élu.
          </li>
          <li>
            Publié les <strong>appels à candidature des commissions</strong>, avec envoi de la
            candidature en un clic par WhatsApp.
          </li>
        </ul>
      </>
    ),
  },
]

// Du plus ancien au plus récent : la frise se lit de gauche à droite, un logo par établissement
export const education = [
  {
    school: "Lycée d'excellence Alassane Ouattara",
    logo: '/files/logos/lycee-alassane-ouattara.png',
    items: [{ date: '2022', title: 'Baccalauréat série C' }],
  },
  {
    school: 'ESATIC, Abidjan',
    logo: '/files/logos/esatic.jpg',
    items: [
      { date: '2022 – 2025', title: "Licence Systèmes d'Information et Génie Logiciel" },
      { date: 'En cours', title: 'Master II Génie logiciel, option Ingénierie Data et Cloud Computing' },
    ],
  },
]

export const skills = [
  { name: 'Langages', items: ['Java', 'Python', 'JavaScript', 'C', 'C++', 'Scala', 'SQL'] },
  { name: 'Backend', items: ['FastAPI', 'Spring Boot', 'API REST', 'JWT'] },
  { name: 'Frontend & mobile', items: ['React', 'React Native', 'Tailwind CSS'] },
  { name: 'Données', items: ['PostgreSQL', 'Modélisation', 'ORM'] },
  { name: 'Systèmes', items: ['Docker', 'Linux', 'CI/CD', 'Sandbox', 'Files de tâches'] },
  { name: 'Recherche', items: ['Bancs de mesure reproductibles', 'Bootstrap', 'Mann-Whitney', 'Loi de Gunther'] },
]

export const certifications = [
  { title: 'React Native · Udemy', href: 'https://www.udemy.com/certificate/UC-a7fc0d81-e068-4c44-bc6d-cf562916ee62/' },
  { title: 'English · EF SET (B1)', href: 'https://cert.efset.org/fr/QjvCKh' },
]
