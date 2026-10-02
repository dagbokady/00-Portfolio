export const identity = {
  name: 'Christ-Phanuel DAGBO',
  headline: "Développeur d'applications web & mobile",
  location: "Abidjan, Côte d'Ivoire",
  phone: '01 70 15 82 51',
  email: 'dagbokady@gmail.com',
  links: [
    { label: 'github.com/dagbokady', href: 'https://github.com/dagbokady' },
    {
      label: 'linkedin.com/in/christ-phanuel-dagbo',
      href: 'https://linkedin.com/in/christ-phanuel-dagbo',
    },
  ],
}

export const profile = (
  <>
    Développeur d'applications web et mobile, étudiant en <strong>Master 2 Génie Logiciel à l'ESATIC</strong>.
    Je conçois et développe des applications de bout en bout : analyse des besoins, modélisation UML,{' '}
    <strong>API REST</strong> en Java/Spring Boot ou Python/FastAPI, bases de données PostgreSQL,
    interfaces <strong>React</strong> et <strong>React Native</strong>, conteneurisation et déploiement.
    Expérience en entreprise sur une plateforme métier interne et plusieurs produits personnels mis en service.
  </>
)

export const experiences = [
  {
    title: 'Stagiaire MOA & Développeur Full-Stack · SUNU GROUP / SUNU DIGITECH',
    date: 'Avril 2025 à Juin 2025',
    context:
      "Conception et développement d'une plateforme interne de gestion des commandes et des stocks d'articles de communication.",
    items: [
      <>Recueilli et analysé les besoins des équipes métier, puis formalisé les processus en <strong>UML</strong> (cas d'utilisation, diagrammes de séquence et de classes).</>,
      <>Conçu et développé les <strong>API REST</strong> de l'application avec <strong>Java / Spring Boot</strong> et <strong>PostgreSQL</strong>.</>,
      <>Implémenté l'<strong>authentification JWT</strong> et le <strong>contrôle d'accès par rôle</strong> sur l'ensemble des endpoints.</>,
      <>Développé les interfaces web avec <strong>React</strong> et <strong>Tailwind CSS</strong>, en lien direct avec les utilisateurs finaux.</>,
      <>Conteneurisé l'application avec <strong>Docker</strong> pour fiabiliser le déploiement et reproduire les environnements.</>,
    ],
  },
]

export const projects = [
  {
    title: "CodeVal · SaaS d'évaluation pratique en programmation",
    date: 'GL Prime · En cours',
    context:
      'Product Owner et lead technique. Plateforme permettant aux enseignants de créer, distribuer et corriger automatiquement des exercices de programmation.',
    items: [
      <>Défini l'architecture applicative et le modèle de données : sujets, campagnes d'évaluation, soumissions, jeux de tests et résultats.</>,
      <>Conçu un <strong>environnement d'exécution de code isolé</strong> (conteneurs Docker, limites de temps et de mémoire) pour exécuter et noter automatiquement les soumissions des étudiants.</>,
      <>Développé les <strong>API REST</strong> et les interfaces enseignant et étudiant, avec gestion des rôles, des sessions d'examen et des restitutions de résultats.</>,
      <>Piloté une équipe pluridisciplinaire de 13 personnes en cycles de sprints, du cadrage produit jusqu'à la livraison.</>,
    ],
  },
  {
    title: 'EsaticShare · Plateforme de ressources académiques',
    date: 'Projet personnel · En service',
    context: 'Conception, architecture et développement du produit.',
    items: [
      <>Développé une plateforme permettant aux étudiants de partager et retrouver <strong>documents de cours, devoirs et opportunités</strong>.</>,
      <>Modélisé le domaine et mis en place un <strong>système de rôles et de permissions</strong> couvrant le dépôt, la modération et l'accès aux contenus.</>,
      <>Traité les questions de <strong>sécurité applicative</strong> : authentification, contrôle d'accès, validation des fichiers déposés.</>,
    ],
  },
  {
    title: 'GL Prime · Studio de création de produits numériques',
    date: 'Product Owner & Lead technique',
    items: [
      <>Porté la vision produit et la coordination d'une équipe organisée en pôles <strong>backend, frontend, UI/UX, cybersécurité, qualité et documentation</strong>.</>,
      <>Mis en place les conventions techniques de l'équipe : workflow Git, revues de pull requests, documentation d'API et découpage en sprints.</>,
      <>Produits : <strong>EsaticShare</strong> livré, <strong>CodeVal</strong> en cours de développement.</>,
    ],
  },
  {
    title: "100 applications en 1 an · Programme d'apprentissage par la pratique",
    date: 'github.com/dagbokady',
    items: [
      <>Développé des applications web et mobile de bout en bout pour approfondir l'<strong>architecture logicielle</strong>, les <strong>API sécurisées</strong>, l'optimisation serveur, les ORM, la gestion des tokens et les WAF.</>,
    ],
  },
]

export const skills = [
  { name: 'Langages', list: 'Java, JavaScript, Python, C, C++, Scala, SQL' },
  { name: 'Backend', list: 'Spring Boot, FastAPI, API REST, authentification JWT' },
  { name: 'Frontend & mobile', list: 'React, React Native, Tailwind CSS, HTML, CSS' },
  { name: 'Bases de données', list: 'PostgreSQL, SQL, modélisation, ORM' },
  { name: 'DevOps & outils', list: 'Docker, Git, CI/CD, Linux' },
  { name: 'Conception', list: 'UML, architecture logicielle, analyse des besoins, Agile, Unified Process' },
  { name: 'Sécurité', list: "Contrôle d'accès, API sécurisées, gestion des tokens, exécution de code isolée, WAF" },
]

export const education = [
  { title: 'Master 2 Génie Logiciel · ESATIC, Abidjan', meta: 'En cours' },
  { title: "Licence Systèmes d'Information et Génie Logiciel · ESATIC, Abidjan", meta: '2022 à 2025' },
  { title: "Baccalauréat série C · Lycée d'excellence Alassane Ouattara", meta: '2022' },
]

export const certifications = [
  {
    title: 'React Native · Udemy',
    certificate: 'https://www.udemy.com/certificate/UC-a7fc0d81-e068-4c44-bc6d-cf562916ee62/',
  },
  {
    title: 'English · EF SET',
    meta: 'Niveau B1 (intermédiaire)',
    certificate: 'https://cert.efset.org/fr/QjvCKh',
  },
]

export const languages = [
  { name: 'Français', level: 'langue maternelle' },
  { name: 'Anglais', level: 'niveau intermédiaire B1' },
  { name: 'Japonais', level: 'niveau débutant' },
]

export const interests =
  'ingénierie logicielle, éducation technologique, guitare, création audiovisuelle et 3D'
