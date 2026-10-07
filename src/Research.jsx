// Page dédiée au mémoire de recherche CodEval : tout le texte du PDF, mis en page pour le web
import { useEffect } from 'react'
import { identity } from './data/portfolio.jsx'
import { Table, Code, DocLayout, Cite } from './article.jsx'
import {
  Fig11,
  Fig21,
  Fig22,
  Fig23,
  Fig24,
  Fig31,
  Fig32,
  Fig33,
  Fig34,
  Fig35,
  Fig36,
  Fig41,
  Fig42,
} from './diagrams/research.jsx'

const PDF = '/files/recherche-codeval.pdf'

const TITLE = 'Montée en charge de la plateforme de correction automatique CodEval'
const SUBTITLE =
  "Étude de quatre architectures de traitement et proposition d'une architecture fondée sur une file de tâches persistante en base de données"

const CONTENTS = [
  { id: 'introduction', label: 'Introduction générale' },
  { id: 'chapitre-1', label: 'Chapitre 1 : Contexte et problématique' },
  { id: 'chapitre-2', label: 'Chapitre 2 : Systèmes étudiés' },
  { id: 'chapitre-3', label: 'Chapitre 3 : Architecture proposée' },
  { id: 'chapitre-4', label: 'Chapitre 4 : Méthodologie expérimentale' },
  { id: 'chapitre-5', label: 'Chapitre 5 : Résultats' },
  { id: 'chapitre-6', label: 'Chapitre 6 : Discussion' },
  { id: 'conclusion', label: 'Conclusion générale' },
  { id: 'references', label: 'Références bibliographiques' },
  { id: 'annexes', label: 'Annexes A à E' },
  { id: 'glossaire', label: 'Glossaire, sigles et notations' },
]

function Research() {
  useEffect(() => {
    const previous = document.title
    document.title = `${TITLE} · ${identity.name}`
    return () => { document.title = previous }
  }, [])

  return (
    <DocLayout paper>
      <a className="back-link" href="/#research">← Retour au portfolio</a>

      <header className="r-header">
        <div className="r-kicker">Mémoire de recherche · ESATIC · 20 septembre 2026</div>
        <h1>{TITLE}</h1>
        <p className="r-subtitle">{SUBTITLE}</p>
        <p className="r-author">Présenté par <strong>{identity.fullName}</strong></p>
      </header>

      <nav className="r-toc" aria-label="Sommaire">
        <h2>Sommaire</h2>
        <ol>
          {CONTENTS.map((c) => (
            <li key={c.id}><a href={`#${c.id}`}>{c.label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ---------------------------------------------------------------- */}
      <section id="introduction">
        <h2>Introduction générale</h2>
        <p>
          Dans l'enseignement supérieur, les évaluations pratiques de programmation occupent une
          place importante, mais corriger à la main le code de chaque étudiant prend beaucoup de
          temps et varie d'un correcteur à l'autre. Pour résoudre ce problème, des plateformes de
          correction automatique ont vu le jour, dont <strong>CodEval</strong>, une application web
          qui permet aux enseignants de créer des évaluations et qui corrige les copies en exécutant
          le code des étudiants contre des tests préparés à l'avance. CodEval repose sur une API web
          construite avec FastAPI, qui gère les utilisateurs, les évaluations et les soumissions, et
          sur un worker de correction qui récupère les corrections en attente dans la base de
          données. Aujourd'hui, ce worker traite les copies l'une après l'autre, ce qui convient à de
          petits groupes mais pose la question de ce qui arrive quand le nombre de copies augmente
          fortement. Lors d'un examen, en effet, beaucoup de copies peuvent arriver en même temps,
          et la plateforme doit les corriger dans un délai raisonnable sans perdre en performance.
        </p>
        <p>
          Ce travail cherche donc à savoir jusqu'à quel point l'architecture actuelle de CodEval peut
          absorber une charge croissante de copies, et quelles modifications dans l'organisation du
          traitement permettraient d'améliorer sa capacité sans rendre le système trop complexe à
          maintenir. Son objectif est d'évaluer la capacité de CodEval à monter en charge et de
          proposer des stratégies pour que la plateforme puisse servir un nombre croissant
          d'étudiants. Pour cela, nous décrivons d'abord le fonctionnement actuel, du lancement de la
          correction par l'enseignant jusqu'à l'affichage des résultats, puis nous mesurons ses
          limites par des tests de charge et nous recommandons enfin la solution qui offre le
          meilleur équilibre entre gain de performance et simplicité. Nous partons de trois
          hypothèses : le traitement actuel devient un goulot d'étranglement à partir d'un certain
          nombre de copies, avec un temps de correction qui grandit au même rythme que le nombre
          d'étudiants ; traiter plusieurs copies en même temps sur un seul serveur réduit nettement
          ce temps tant que le processeur et la mémoire ne sont pas saturés ; et ajouter plusieurs
          workers indépendants permet de suivre la charge presque proportionnellement sans changer
          en profondeur le code existant.
        </p>
        <p>
          Pour les vérifier, nous lisons d'abord le code de CodEval, puis nous construisons un banc
          de test reproductible qui simule des évaluations avec un nombre variable d'étudiants et
          d'exercices, en mesurant le temps total de correction, le temps par copie et l'usage du
          processeur et de la mémoire, avant de comparer chaque configuration selon sa vitesse, ses
          ressources consommées et la complexité qu'elle ajoute. Le document s'organise en six
          chapitres : le premier présente le contexte et la problématique, le deuxième fait le point
          sur les travaux existants, le troisième décrit l'architecture proposée, le quatrième
          explique la méthode expérimentale, le cinquième donne les résultats des tests et le
          sixième les discute et formule des recommandations, avant une conclusion générale, les
          références bibliographiques et les annexes.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="chapitre-1">
        <h2>Chapitre 1 : Contexte et problématique</h2>

        <h3><span className="r-num">1.1</span> Évaluation automatique et CodEval</h3>
        <p>
          CodEval se présente sous la forme d'une application web composée de trois briques
          principales : une <strong>API</strong> construite avec le framework FastAPI, qui gère les
          utilisateurs, les évaluations et les soumissions ; un <strong>worker de correction</strong>,
          qui récupère les campagnes en attente dans la base de données PostgreSQL et les traite ; et
          une <strong>sandbox</strong>, qui exécute le code des étudiants dans un espace isolé avec
          des limites de temps et de mémoire pour garantir la sécurité du serveur. La figure 1.1
          présente l'architecture générale de la plateforme.
        </p>
        <Fig11 />
        <p>
          L'enseignant crée une évaluation, rédige ses exercices avec leurs jeux de tests, puis ouvre
          une session pour sa classe. Les étudiants rédigent leurs réponses dans un environnement
          contrôlé sans pouvoir exécuter leur code. Une fois la session fermée, l'enseignant lance la
          correction : le worker parcourt chaque participation, compile et exécute le code de chaque
          exercice contre les tests préparés, et attribue une note automatique.
        </p>
        <p>
          CodEval prend en charge plusieurs types d'exercices : des exercices de code en C, des
          exercices d'algorithmique en pseudo-code (transpilés en Python pour être exécutés), des
          QCM, des questions à réponse courte, des grilles de correspondance et des vrai/faux. Pour
          les exercices de code, le barème combine des critères de déclaration (présence d'une
          fonction avec la bonne signature, déclaration d'une variable d'un type donné) et des tests
          d'exécution, chacun pesant ses points dans le total de l'exercice.
        </p>

        <h3><span className="r-num">1.2</span> Problématique de la charge de travail</h3>
        <p>
          Aujourd'hui, le worker de CodEval traite les copies de manière strictement séquentielle :
          pour chaque participation, il itère sur les exercices un par un, compile, exécute et note
          avant de passer au suivant. Cette approche convient à de petits groupes, mais elle pose un
          problème de passage à l'échelle. Lors d'un examen, plusieurs dizaines voire centaines
          d'étudiants soumettent leurs copies en même temps, et la plateforme doit les corriger dans
          un délai raisonnable.
        </p>
        <p>
          Le temps de correction d'une copie dépend de la nature des exercices : un QCM ou un
          vrai/faux se corrige en quelques millisecondes, mais un exercice de code nécessite une
          compilation, une ou plusieurs exécutions en sandbox (chacune soumise à un délai maximal),
          et éventuellement la compilation de sondes pour vérifier les déclarations. Pour une
          évaluation comportant plusieurs exercices de code avec chacun plusieurs jeux de tests, le
          temps par copie peut atteindre plusieurs secondes. Multiplié par le nombre d'étudiants, le
          temps total de correction croît linéairement et peut devenir un goulot d'étranglement :
          les enseignants et les étudiants doivent alors attendre de longues minutes avant de
          consulter les résultats.
        </p>
        <p>
          Par ailleurs, le traitement séquentiel sous-exploite les ressources du serveur. Pendant
          qu'une exécution en sandbox attend la fin de son délai, le processeur reste largement
          inactif.
        </p>
        <p>
          À cette séquentialité s'ajoute une contrainte moins visible, mais qui pèse davantage :
          <strong> l'unité de travail du worker est la campagne entière</strong>. La fonction{' '}
          <code>claim_next</code> réserve une ligne <code>CorrectionRun</code>, c'est-à-dire une
          évaluation avec toutes ses participations, et la traite de bout en bout avant d'en
          réserver une autre. La granularité désigne précisément la taille de cette unité : ce qu'un
          correcteur prend en une fois. Pour une classe de soixante copies, la file ne contient donc
          qu'une seule tâche réservable, quel que soit le nombre de workers lancés : un seul trouve
          du travail, les autres interrogent une file vide et se rendorment. Ce plafond ne se lève
          pas en ajoutant des machines, car il ne vient pas du nombre de correcteurs mais de la
          taille du grain. C'est la raison pour laquelle le chapitre 3 redécoupe le travail avant de
          chercher à le distribuer.
        </p>

        <h3><span className="r-num">1.3</span> Question de recherche et hypothèses</h3>
        <blockquote className="r-question">
          Jusqu'à quel point l'architecture actuelle de CodEval peut-elle absorber une charge
          croissante de copies, et quelles modifications dans l'organisation du traitement
          permettraient d'améliorer sa capacité sans rendre le système trop complexe à maintenir ?
        </blockquote>
        <p>Pour y répondre, nous formulons trois hypothèses :</p>
        <ul>
          <li>
            <strong>H1</strong> : le traitement séquentiel actuel devient un goulot d'étranglement à
            partir d'un certain nombre de copies, avec un temps total de correction qui croît
            linéairement avec le nombre d'étudiants.
          </li>
          <li>
            <strong>H2</strong> : traiter plusieurs copies en même temps sur un seul serveur
            (parallélisme intra-nœud) réduit significativement le temps de correction, tant que le
            processeur et la mémoire ne sont pas saturés.
          </li>
          <li>
            <strong>H3</strong> : ajouter plusieurs workers indépendants (parallélisme inter-nœuds)
            permet de suivre la charge de manière quasi proportionnelle sans modifier en profondeur
            le code existant.
          </li>
        </ul>
        <p>
          L'objectif de ce travail est d'évaluer la capacité de CodEval à monter en charge et de
          proposer des stratégies pour que la plateforme puisse servir un nombre croissant
          d'étudiants. Pour vérifier ces hypothèses, nous étudierons le code source de CodEval, nous
          construirons un banc de test reproductible simulant des évaluations avec un nombre
          variable d'étudiants et d'exercices, et nous mesurerons le temps total de correction, le
          temps par copie ainsi que l'usage du processeur et de la mémoire pour chaque configuration
          testée.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="chapitre-2">
        <h2>Chapitre 2 : Systèmes étudiés</h2>
        <p>
          Ce chapitre présente les quatre architectures de traitement que nous avons tirées de la
          littérature pour améliorer la capacité de correction de CodEval : le traitement
          séquentiel, le parallélisme sur une machine (architecture A), les workers distribués
          autour d'un courtier de messages (architecture B) et la messagerie serverless élastique
          (architecture C). Chaque architecture est tirée d'une seule étude. Pour chacune, nous
          présentons d'abord cette étude (thème, auteurs, but, systèmes ou outils étudiés), puis le
          système que ses auteurs ont construit à la suite de leur travail, sa transposition à
          CodEval, son schéma, ses avantages et ses limites. Les limites portent sur ce système :
          celles que les auteurs énoncent eux-mêmes sont référencées, les autres découlent de notre
          analyse dans le contexte de CodEval. Nous terminons par une discussion sur les compromis
          identifiés.
        </p>

        <h3><span className="r-num">2.1</span> Traitement séquentiel (architecture actuelle)</h3>
        <h4><span className="r-num">2.1.1</span> Description</h4>
        <p>
          <strong>L'étude.</strong> Étude sur le thème des systèmes de correction automatique de
          code, appelés « online judges », réalisée par Szymon Wasik, Maciej Antczak, Jan Badura,
          Artur Laskowski et Tomasz Sternal <Cite n={1} /> et publiée en 2018 dans la revue ACM Computing
          Surveys, pour dresser l'état de l'art de ces systèmes.
        </p>
        <p>
          <strong>But de l'étude.</strong> Classer les online judges selon leur objectif principal,
          en donner une définition formelle et résumer la méthode d'évaluation qu'ils ont en commun.
        </p>
        <p><strong>Systèmes étudiés.</strong></p>
        <ul>
          <li>les plateformes de concours de programmation (par exemple Codeforces, ACM-ICPC Live Archive, Aizu Online Judge) ;</li>
          <li>les plateformes d'enseignement et de recrutement (par exemple CheckiO) ;</li>
          <li>les plateformes de défis de fouille de données ;</li>
          <li>les compilateurs en ligne (par exemple Ideone, Codepad) ;</li>
          <li>la plateforme Optil.io, proposée par les auteurs pour les problèmes d'optimisation.</li>
        </ul>
        <p>
          <strong>Le système qu'ils ont construit.</strong> À partir de ce recensement, les auteurs
          définissent une procédure d'évaluation en trois étapes et la mettent en œuvre dans leur
          propre plateforme, Optil.io, présentée dans le même article comme l'online judge dont ils
          sont les auteurs et sur lequel ils ont le plus de contrôle <Cite n={1} />. Pour chaque soumission, le
          système collecte le code, le compile si nécessaire et vérifie que le binaire obtenu est
          exécutable ; il évalue ensuite ce binaire sur un ensemble de jeux de test dans un
          environnement d'exécution homogène et fiable, en vérifiant qu'il ne dépasse pas les
          limites de temps processeur, de mémoire vive et d'espace disque fixées ; il calcule enfin
          les notes obtenues sur chaque jeu de test <Cite n={1} />. L'utilisateur dépose sa solution par une
          interface web, sous forme de code source dans l'un des langages supportés. La façon la
          plus simple d'organiser cette procédure est de l'appliquer à une soumission, puis de
          passer à la suivante : c'est le traitement séquentiel.
        </p>
        <p>
          <strong>Transposition à CodEval.</strong> C'est l'architecture actuellement en place. Un
          seul processus parcourt les copies une par une. Pour chaque participation, il itère sur
          les exercices, compile le code, exécute les tests en sandbox, puis enregistre le résultat
          en base de données avant de passer à la copie suivante. Chaque réponse suit donc
          exactement la procédure de Wasik et al. <Cite n={1} />, et les réponses sont traitées l'une après
          l'autre.
        </p>
        <h4><span className="r-num">2.1.2</span> Schéma d'architecture</h4>
        <Fig21 />
        <h4><span className="r-num">2.1.3</span> Avantages</h4>
        <ul>
          <li><strong>Simplicité d'implémentation</strong> : aucune gestion de concurrence, pas de synchronisation entre processus.</li>
          <li><strong>Facilité de débogage</strong> : l'exécution est déterministe et les erreurs sont reproductibles dans l'ordre.</li>
          <li><strong>Infrastructure minimale</strong> : un seul serveur suffit, sans composant supplémentaire.</li>
          <li><strong>Idempotence naturelle</strong> : une copie déjà corrigée est simplement ignorée à la prochaine itération.</li>
        </ul>
        <h4><span className="r-num">2.1.4</span> Limites</h4>
        <p>Limites que les auteurs énoncent eux-mêmes sur ce type de système :</p>
        <ul>
          <li>
            <strong>La montée en charge est le point critique</strong> : la scalabilité d'un système
            aussi interactif est cruciale, en particulier à l'approche de la date limite d'un
            concours, quand le nombre de soumissions augmente brutalement ; pour cette raison, ces
            systèmes sont déployés comme des services cloud de type PaaS et leur efficacité est
            obtenue par une architecture qui exploite la concurrence et le traitement parallèle <Cite n={1} />.
          </li>
          <li>
            <strong>Précision de la mesure du temps</strong> : la limite de temps d'un jeu de test se
            compte souvent en millisecondes, et la méthode de mesure doit être assez sensible et
            déterministe pour distinguer d'aussi petites fractions de temps et rester reproductible
            d'une exécution à l'autre <Cite n={1} />.
          </li>
          <li>
            <strong>Sécurité de l'exécution</strong> : le système exécute du code écrit par les
            utilisateurs, et ses concepteurs doivent le rendre résistant à un large éventail
            d'attaques <Cite n={1} />.
          </li>
        </ul>
        <p>Limites de la transposition à CodEval :</p>
        <ul>
          <li><strong>Temps de correction linéaire</strong> : le temps total est proportionnel au nombre de copies (T = N × t_copie).</li>
          <li><strong>Sous-utilisation des ressources</strong> : pendant l'exécution en sandbox, le processeur reste inactif en attente du résultat.</li>
          <li><strong>Absence de tolérance aux pannes</strong> : une erreur dans le worker arrête l'ensemble du processus de correction.</li>
          <li><strong>Non scalable</strong> : impossible d'accélérer le traitement sans changer d'architecture.</li>
        </ul>

        <h3><span className="r-num">2.2</span> Parallélisme sur une machine : pool de processus local (architecture A)</h3>
        <h4><span className="r-num">2.2.1</span> Description</h4>
        <p>
          <strong>L'étude.</strong> Étude sur le thème de la performance des online judges sur les
          machines multiprocesseurs, réalisée par Cheedoong Drung, Jianwen Wang et Ning Guo <Cite n={8} /> et
          présentée en 2011 à la conférence internationale EMEIT (IEEE), pour augmenter le nombre de
          corrections qu'une même machine peut traiter en même temps.
        </p>
        <p>
          <strong>But de l'étude.</strong> Améliorer la capacité d'un online judge installé sur une
          machine SMP (plusieurs processeurs partageant la même mémoire) sans perdre la précision de
          la mesure du temps d'exécution des programmes corrigés, qui sert à vérifier les limites de
          temps.
        </p>
        <p><strong>Outils et notions étudiés.</strong></p>
        <ul>
          <li>une machine multiprocesseur symétrique, ou Symmetric MultiProcessing (SMP) ;</li>
          <li>un algorithme d'affinité, qui attache chaque programme en cours de correction à un processeur ;</li>
          <li>la théorie des files d'attente, pour modéliser l'arrivée et le traitement des soumissions.</li>
        </ul>
        <p>
          <strong>Le système qu'ils ont construit.</strong> Les auteurs mettent en place un online
          judge fonctionnant dans un environnement SMP, dans lequel deux mécanismes sont ajoutés
          <Cite n={8} />. Le premier est l'algorithme d'affinité : chaque programme d'utilisateur en cours
          d'évaluation est attaché à un processeur, ce qui améliore la précision de la mesure de son
          temps de traitement. Le second est un dimensionnement fondé sur la théorie des files
          d'attente, qui fournit une analyse théorique des indicateurs de performance du système et
          permet de les améliorer. Avec ces mécanismes, les auteurs rapportent que la capacité
          moyenne de tâches corrigées simultanément augmente, que les verdicts rendus sont plus
          précis et que le nombre total d'ordinateurs nécessaires à l'online judge diminue, ce qui
          réduit le coût matériel <Cite n={8} />.
        </p>
        <p>
          <strong>Transposition à CodEval.</strong> La boucle séquentielle est remplacée par un pool
          de processus. Le worker principal distribue les participations à un{' '}
          <code>ProcessPoolExecutor</code> avec N workers, où N est configurable et borné par le
          nombre de cœurs CPU disponibles. Chaque worker du pool corrige une copie complète de
          manière indépendante, puis écrit ses résultats en base.
        </p>
        <h4><span className="r-num">2.2.2</span> Schéma d'architecture</h4>
        <Fig22 />
        <h4><span className="r-num">2.2.3</span> Avantages</h4>
        <ul>
          <li><strong>Accélération significative</strong> : le temps de correction est divisé par N, le nombre de workers, tant que le processeur n'est pas saturé.</li>
          <li><strong>Déploiement simple</strong> : aucune infrastructure supplémentaire requise, pas de file de messages ni de serveur additionnel.</li>
          <li><strong>Modifications limitées</strong> : seule la boucle de traitement est modifiée, le reste du code reste inchangé.</li>
          <li><strong>Isolation des processus</strong> : chaque worker s'exécute dans son propre processus, limitant l'impact d'un arrêt brutal à une seule copie.</li>
        </ul>
        <h4><span className="r-num">2.2.4</span> Limites</h4>
        <p>Limites qui découlent du système décrit par les auteurs :</p>
        <ul>
          <li>
            <strong>Le gain reste celui d'une seule machine</strong> : la capacité de correction
            simultanée augmente, mais elle reste bornée par le nombre de processeurs de la machine
            SMP, et c'est précisément sur ce nombre de processeurs que repose le gain annoncé <Cite n={8} />.
          </li>
          <li>
            <strong>La précision des verdicts n'est pas gratuite</strong> : corriger plusieurs
            programmes en même temps sur une même machine dégrade la mesure du temps d'exécution, et
            c'est pour corriger ce défaut que les auteurs doivent introduire l'algorithme d'affinité
            <Cite n={8} />.
          </li>
        </ul>
        <p>Limites de la transposition à CodEval :</p>
        <ul>
          <li><strong>Plafond de performance</strong> : le gain est borné par le nombre de cœurs CPU du serveur, typiquement 4 à 16.</li>
          <li><strong>Contention sur la base de données</strong> : plusieurs workers écrivant simultanément dans PostgreSQL peuvent créer des goulots d'étranglement sur les verrous de table.</li>
          <li><strong>Consommation mémoire</strong> : chaque processus duplique l'espace mémoire du worker, ce qui limite le nombre de workers sur un serveur à ressources contraintes.</li>
          <li><strong>Pas de scalabilité horizontale</strong> : impossible d'ajouter de la capacité au-delà des ressources d'un seul serveur.</li>
        </ul>

        <h3><span className="r-num">2.3</span> Workers distribués autour d'un courtier de messages (architecture B)</h3>
        <h4><span className="r-num">2.3.1</span> Description</h4>
        <p>
          <strong>L'étude.</strong> Étude sur le thème des courtiers de messages dans les
          architectures de microservices, réalisée par Ahmed Gamal Ibrahim, Rui Pedro Lopes, José
          Rufino et Paulo Leitão <Cite n={3} /> et présentée à la conférence OL2A 2025 (Springer), pour
          déterminer quel courtier assure une communication efficace, fiable et capable de monter en
          charge entre des services.
        </p>
        <p>
          <strong>But de l'étude.</strong> Comparer les courtiers les plus répandus lorsque des
          microservices se coordonnent par échange de messages, sans chef d'orchestre central : on
          parle de « chorégraphie », chaque service réagissant aux messages qu'il reçoit. Les auteurs
          rappellent qu'une communication défaillante ou retardée peut empêcher l'analyse des
          données en temps réel.
        </p>
        <p><strong>Outils étudiés.</strong></p>
        <ul>
          <li>Apache Kafka ;</li>
          <li>ActiveMQ Artemis ;</li>
          <li>RabbitMQ ;</li>
          <li>NATS ;</li>
          <li>des clients écrits en Java (Spring Boot) et en Python.</li>
        </ul>
        <p>
          <strong>Ce que l'étude établit.</strong> Cette étude ne livre pas un système de
          production : elle compare des outils. Nous la conservons parce que cette comparaison est
          celle qui fonde, preuves à l'appui, le choix du courtier au cœur de l'architecture B. Les
          auteurs placent des services producteurs et consommateurs dans un environnement
          d'expérimentation standardisé et les font communiquer à travers chacun des quatre
          courtiers tour à tour, avec des clients écrits en Java (Spring Boot) et en Python, en
          mesurant la latence, le débit, la capacité à monter en charge et la fiabilité <Cite n={3} />. Leurs
          résultats : Kafka offre de bonnes performances en traitement temps réel, avec une faible
          latence et une grande fiabilité ; ActiveMQ Artemis est fiable mais présente une latence
          nettement plus élevée ; RabbitMQ obtient une latence compétitive mais rencontre des
          difficultés lors des coupures réseau ; NATS, conçu pour la faible latence et le débit
          élevé, montre une excellente montée en charge et un excellent débit dans tous les
          scénarios <Cite n={3} />. C'est donc le courtier, et non le principe de la file, qui détermine la
          latence et la fiabilité réellement obtenues.
        </p>
        <p>
          <strong>Transposition à CodEval.</strong> Un courtier de messages est placé entre l'API et
          les workers. Lorsqu'une correction est lancée, l'API joue le rôle de service producteur :
          elle découpe la campagne en tâches unitaires (une par participation) et les publie dans le
          courtier. Des workers indépendants, potentiellement déployés sur des serveurs différents,
          jouent le rôle de services consommateurs : ils retirent les tâches du courtier et
          corrigent les copies en parallèle, puis écrivent les résultats dans la base partagée. Le
          courtier retenu est l'un des quatre comparés par l'étude ; la structure de l'architecture
          ne change pas d'un courtier à l'autre, seules la latence et la fiabilité mesurées varient
          <Cite n={3} />.
        </p>
        <h4><span className="r-num">2.3.2</span> Schéma d'architecture</h4>
        <p>
          Le schéma ci-dessous reproduit le dispositif mis en place par les auteurs : des services
          producteurs et des services consommateurs, écrits en Java (Spring Boot) et en Python,
          communiquent uniquement par échange de messages à travers un courtier, dans un
          environnement d'expérimentation standardisé où sont mesurés la latence, le débit, la
          montée en charge et la fiabilité <Cite n={3} />. Le bloc central est occupé tour à tour par Apache
          Kafka, ActiveMQ Artemis, RabbitMQ puis NATS : l'architecture est identique pour les quatre
          courtiers, seul le courtier placé au centre change d'une série de mesures à l'autre.
        </p>
        <Fig23 />
        <h4><span className="r-num">2.3.3</span> Avantages</h4>
        <ul>
          <li><strong>Scalabilité horizontale</strong> : ajouter un serveur ajoute proportionnellement de la capacité de traitement. Le gain est quasi linéaire avec le nombre de workers.</li>
          <li><strong>Tolérance aux pannes</strong> : si un worker tombe en panne, ses tâches non acquittées sont remises dans la file et reprises par un autre worker. La correction continue sans interruption.</li>
          <li><strong>Élasticité</strong> : des workers peuvent être lancés ou arrêtés dynamiquement en fonction de la charge.</li>
          <li><strong>Découplage</strong> : l'API et les workers sont indépendants. L'API peut accepter de nouvelles campagnes même si les workers sont temporairement saturés.</li>
        </ul>
        <h4><span className="r-num">2.3.4</span> Limites</h4>
        <p>Limites établies par l'étude elle-même :</p>
        <ul>
          <li>
            <strong>Le comportement de l'architecture dépend entièrement du courtier retenu</strong> :
            la latence varie fortement d'un courtier à l'autre, ActiveMQ Artemis étant nettement plus
            lent que les autres <Cite n={3} />.
          </li>
          <li>
            <strong>La fiabilité annoncée n'est pas acquise</strong> : RabbitMQ, malgré une latence
            compétitive, rencontre des difficultés lors des coupures réseau <Cite n={3} />, c'est-à-dire au
            moment précis où la tolérance aux pannes est attendue d'une architecture à file de
            messages.
          </li>
          <li>
            <strong>Les mesures sont faites hors contexte éducatif</strong> : l'étude évalue des
            microservices échangeant des messages à des débits sans rapport avec ceux d'une campagne
            de correction, et ne dit rien du coût de l'exécution en sandbox ni de l'écriture des
            notes en base.
          </li>
        </ul>
        <p>Limites de la transposition à CodEval :</p>
        <ul>
          <li><strong>Complexité opérationnelle</strong> : le déploiement nécessite un courtier de messages à installer et superviser, un suivi des workers, et une gestion des échecs (tâches non acquittées, workers en dépassement de délai).</li>
          <li><strong>Infrastructure supplémentaire</strong> : chaque worker additionnel est un serveur à provisionner, configurer et maintenir, ce qui augmente les coûts d'hébergement.</li>
          <li><strong>Latence réseau</strong> : la communication entre les workers et la base de données introduit une latence supplémentaire par rapport à un accès local.</li>
          <li><strong>Contention sur la base de données</strong> : avec de nombreux workers écrivant simultanément, PostgreSQL peut devenir le goulot d'étranglement si la base n'est pas dimensionnée en conséquence.</li>
          <li><strong>Modifications significatives du code</strong> : l'intégration d'une file de messages nécessite de repenser la logique de lancement des corrections et la gestion du cycle de vie des tâches.</li>
        </ul>

        <h3><span className="r-num">2.4</span> Messagerie serverless élastique (architecture C)</h3>
        <h4><span className="r-num">2.4.1</span> Description</h4>
        <p>
          <strong>L'étude.</strong> Étude sur le thème de la messagerie « serverless » à grande
          échelle, réalisée par Juntao Ji, Yubao Fu, Rongtong Jin et Qingshan Lin <Cite n={5} /> (Alibaba
          Cloud) et présentée en 2025 dans la sélection industrielle de la conférence FSE (ACM), pour
          offrir un service de messages dont la capacité suit la croissance du trafic sans limite.
        </p>
        <p>
          <strong>But de l'étude.</strong> Faire fonctionner le logiciel de messagerie en mode
          serverless, c'est-à-dire sans que l'utilisateur gère le moindre serveur, avec une capacité
          qui s'ajuste seule à la demande, tout en restant compatible avec les protocoles et les
          clients que les applications utilisent déjà.
        </p>
        <p><strong>Outils et systèmes étudiés.</strong></p>
        <ul>
          <li>Apache RocketMQ, le socle de l'architecture ;</li>
          <li>les protocoles RabbitMQ, MQTT et Kafka, réimplémentés au-dessus de ce socle ;</li>
          <li>RabbitMQ open source, qui sert de point de comparaison.</li>
        </ul>
        <p>
          <strong>Le système qu'ils ont construit.</strong> Les auteurs ont construit, et exploitent
          commercialement sur Alibaba Cloud, une architecture de messagerie serverless bâtie sur
          Apache RocketMQ, au-dessus de laquelle ils ont réimplémenté les solutions de messagerie les
          plus répandues : RabbitMQ, MQTT et Kafka <Cite n={5} />. Elle repose sur les éléments suivants :
        </p>
        <ul>
          <li><strong>Séparation du stockage et du calcul.</strong> Une couche d'accès sans état reçoit les messages, quel que soit le protocole, et une couche de stockage distincte les conserve. Chaque couche grossit indépendamment de l'autre, ce qui convient à des charges imprévisibles.</li>
          <li><strong>Partitions d'écriture élastiques</strong>, qui suppriment la limite de débit d'une file unique.</li>
          <li><strong>Files légères</strong>, qui permettent d'avoir des millions de files avec un temps de démarrage à froid minimal.</li>
          <li><strong>Un RabbitMQ reconstruit sur RocketMQ</strong>, pris comme cas d'étude parce que son architecture d'origine est difficile à faire monter en charge. Il reste compatible avec tous les clients open source et n'impose plus de limite de débit par file ; les auteurs annoncent des capacités de gestion des métadonnées de files et d'accumulation de messages supérieures de plus de 1 000 % à celles de RabbitMQ open source <Cite n={5} />.</li>
        </ul>
        <p>
          <strong>Transposition à CodEval.</strong> La file n'est plus un serveur que l'établissement
          installe : elle est confiée à un service de messagerie serverless géré par un fournisseur
          cloud. L'API y dépose une tâche par copie. Des workers sans état, lancés à la demande sous
          forme de conteneurs éphémères, consomment la file : leur nombre suit la profondeur de la
          file et redescend à zéro quand il n'y a plus rien à corriger. Les notes sont toujours
          écrites dans PostgreSQL.
        </p>
        <h4><span className="r-num">2.4.2</span> Schéma d'architecture</h4>
        <Fig24 />
        <h4><span className="r-num">2.4.3</span> Avantages</h4>
        <ul>
          <li><strong>Élasticité complète</strong> : la capacité de correction passe de zéro à un grand nombre de workers selon la charge, sans intervention.</li>
          <li><strong>Aucun serveur de file à administrer</strong> : le fournisseur gère la disponibilité, la reprise et la montée en charge de la messagerie.</li>
          <li><strong>Pas de limite de débit par file</strong>, grâce à la séparation du stockage et du calcul.</li>
          <li><strong>Paiement à l'usage</strong> : en dehors des périodes d'examen, les workers ne consomment rien.</li>
        </ul>
        <h4><span className="r-num">2.4.4</span> Limites</h4>
        <p>Limites qui découlent du système décrit par les auteurs :</p>
        <ul>
          <li>
            <strong>Un service commercial, exploité par un fournisseur</strong> : l'architecture est
            celle d'un produit d'Alibaba Cloud <Cite n={5} />. L'établissement ne l'installe pas, il la loue ;
            la correction s'arrête si le service ou la connexion Internet tombe. La compatibilité
            avec les clients open source revendiquée par les auteurs <Cite n={5} /> réduit, sans l'éliminer, le
            risque de verrouillage chez le fournisseur.
          </li>
          <li>
            <strong>Une échelle disproportionnée</strong> : le système est dimensionné pour des
            millions de files et pour des capacités d'accumulation plus de dix fois supérieures à
            celles de RabbitMQ open source <Cite n={5} />, alors qu'une campagne de CodEval produit quelques
            centaines de messages.
          </li>
        </ul>
        <p>Limites de la transposition à CodEval :</p>
        <ul>
          <li><strong>Données des étudiants hors de l'établissement</strong> : les copies transitent par un service tiers, ce qui pose des questions de protection des données.</li>
          <li><strong>Démarrage à froid des workers</strong> : le soin apporté par les auteurs au démarrage à froid porte sur les files, pas sur nos workers ; chaque worker éphémère doit charger le compilateur et la sandbox avant de corriger, ce qui ajoute de la latence au début de chaque campagne.</li>
          <li><strong>Sandbox à adapter</strong> : l'isolation doit fonctionner dans l'environnement d'exécution imposé par le fournisseur.</li>
          <li><strong>Coût récurrent</strong> et impossibilité de reproduire l'architecture sur le matériel dont nous disposons.</li>
        </ul>

        <h3><span className="r-num">2.5</span> Discussion sur les limites</h3>
        <p>Les quatre architectures présentent des compromis distincts entre simplicité et performance.</p>
        <p><strong>Traitement séquentiel</strong></p>
        <ul>
          <li>Adapté aux petites cohortes, moins de 30 étudiants, où le temps de correction reste acceptable, de l'ordre de quelques minutes.</li>
          <li>Au-delà, le temps linéaire freine l'expérience utilisateur : un enseignant lançant la correction de 200 copies avec 5 exercices chacune peut attendre plus de 30 minutes avant d'obtenir les résultats.</li>
        </ul>
        <p><strong>Pool de processus (architecture A)</strong></p>
        <ul>
          <li>Résout partiellement le problème en divisant le temps par le nombre de cœurs disponibles.</li>
          <li>Atteint rapidement son plafond : un serveur typique dispose de 4 à 8 cœurs, ce qui limite le gain maximal à un facteur 4 à 8.</li>
          <li>La contention sur PostgreSQL peut dégrader les performances au-delà de 4 workers concurrents, ce qui réduit le gain réel en dessous du gain théorique.</li>
        </ul>
        <p><strong>Architecture distribuée (architecture B)</strong></p>
        <ul>
          <li>Offre une scalabilité théoriquement illimitée, mais au prix d'une complexité opérationnelle considérable.</li>
          <li>Pour une plateforme éducative comme CodEval, déployée dans un contexte universitaire avec des ressources d'infrastructure limitées, cette complexité peut constituer un obstacle majeur à la maintenance et à l'évolution du système.</li>
        </ul>
        <p><strong>Serverless élastique (architecture C)</strong></p>
        <ul>
          <li>Pousse la logique distribuée jusqu'au bout : supprime l'administration de la file et ajuste la capacité à la charge.</li>
          <li>Déplace le problème vers la dépendance à un fournisseur cloud, la sortie des copies de l'établissement et un coût récurrent.</li>
          <li>Est conçue pour des volumes sans commune mesure avec ceux de CodEval.</li>
        </ul>
        <p><strong>Limites communes</strong></p>
        <ul>
          <li>
            <strong>Contention sur la base de données (A et B)</strong> : lorsque plusieurs workers
            écrivent simultanément les résultats de correction, les verrous de PostgreSQL peuvent
            créer un goulot d'étranglement qui annule une partie du gain obtenu par le parallélisme.
            Pantelic et al. <Cite n={6} /> (Future Internet, 2026) montrent, dans un banc d'essai conteneurisé
            sur un seul nœud, que les performances de la couche de persistance d'une architecture de
            microservices dépendent fortement de la composition de la charge et du niveau de
            concurrence : une base SQL indexée donne les meilleurs résultats sur les charges dominées
            par les lectures, alors que sur les charges dominées par les écritures, une base
            orientée documents (MongoDB) obtient une latence p95 plus faible et un débit plus élevé.
            La correction étant une charge dominée par les écritures, une note par réponse, ce point
            doit être mesuré dans notre contexte.
          </li>
          <li>
            <strong>Tolérance aux pannes</strong> : c'est un critère discriminant.
            <ul>
              <li>Le traitement séquentiel et le pool de processus partagent la même vulnérabilité : un arrêt brutal du serveur arrête l'ensemble de la correction.</li>
              <li>L'architecture B offre une résilience réelle, au prix de mécanismes de supervision et de retraitement des tâches échouées à mettre en place.</li>
              <li>L'architecture C offre aussi une résilience réelle, en confiant ces mécanismes au fournisseur.</li>
            </ul>
          </li>
        </ul>
        <p>
          Le chapitre suivant part de ces quatre architectures, de leurs avantages et de leurs
          limites, pour proposer une architecture adaptée à CodEval.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="chapitre-3">
        <h2>Chapitre 3 : Architecture proposée</h2>

        <h3><span className="r-num">3.1</span> Bilan des architectures étudiées</h3>
        <p>Le tableau suivant résume ce que chaque architecture apporte et ce qui lui manque.</p>
        <Table
          caption="Tableau 3.1 - Bilan des architectures étudiées"
          rows={[
            ['Architecture', "Ce qu'elle apporte", 'Ce qui lui manque'],
            ['Séquentielle', 'Simplicité, idempotence, aucun composant en plus', 'Temps linéaire, processeur sous-utilisé, pas de reprise'],
            ['Pool local (A)', "Exploite les cœurs d'un serveur, peu de code modifié", "Plafond d'un seul serveur, un arrêt brutal stoppe la campagne"],
            ['Distribuée (B)', "Ajout de serveurs, reprise des tâches d'un worker mort", 'Courtier à déployer et à superviser, code à refondre'],
            ['Serverless (C)', 'Capacité ajustée à la charge, aucun serveur de file', "Fournisseur cloud, copies hors de l'établissement, démarrage à froid, coût"],
          ]}
        />
        <p>Trois constats traversent ces architectures :</p>
        <ul>
          <li>
            <strong>Le moteur de correction n'est pas en cause.</strong> La fonction{' '}
            <code>grade_exercise</code> corrige une réponse de façon indépendante des autres. Ce qui
            limite CodEval, c'est la façon dont les copies sont distribuées aux processus, pas la
            façon dont chacune est corrigée.
          </li>
          <li>
            <strong>La base de données est déjà partagée par tous.</strong> Toutes les architectures
            lisent les copies et écrivent les notes dans PostgreSQL. B et C ajoutent un second point
            de coordination, un courtier ou un service cloud, alors que PostgreSQL sait déjà jouer ce
            rôle : le worker actuel réserve ses campagnes avec la clause{' '}
            <code>SELECT ... FOR UPDATE SKIP LOCKED</code>.
          </li>
          <li>
            <strong>Les copies n'ont pas toutes le même coût.</strong> Un QCM se corrige en quelques
            millisecondes, une réponse en C correcte en quelques centaines de millisecondes, mais une
            boucle infinie épuise le délai de chaque test, soit 2 secondes par test dans CodEval et
            donc 12 secondes pour les 6 tests de l'exercice « Calculatrice en boucle ». Distribuer
            des copies entières laisse donc des workers inactifs pendant qu'un autre termine une
            copie lente.
          </li>
        </ul>

        <h3><span className="r-num">3.2</span> Des limites aux exigences de conception</h3>
        <p>
          Chaque limite relevée au chapitre 2 devient une exigence que l'architecture proposée doit
          satisfaire. La figure 3.1 montre cette correspondance.
        </p>
        <Fig31 />

        <h3><span className="r-num">3.3</span> Principe de l'architecture proposée</h3>
        <h4><span className="r-num">3.3.1</span> Ce que fait CodEval aujourd'hui</h4>
        <p>
          Dans l'architecture actuelle, lancer une correction crée une campagne dans la table{' '}
          <code>correction_runs</code>. Un processus unique, le worker, réserve cette campagne,
          charge la liste des participations, puis les parcourt une par une : pour chaque copie il
          itère sur les exercices, appelle <code>grade_exercise</code>, compile et exécute le code en
          sandbox quand l'exercice l'exige, enregistre la note, puis passe à la copie suivante. Le
          travail restant n'existe nulle part ailleurs que dans la position courante de cette
          boucle, en mémoire du processus. C'est de là que viennent les trois faiblesses relevées au
          chapitre 1 : le temps total croît linéairement avec le nombre de copies, le processeur
          reste inactif pendant que la sandbox attend l'expiration de ses délais, et l'arrêt du
          processus fait perdre la totalité de la progression de la campagne.
        </p>
        <h4><span className="r-num">3.3.2</span> L'idée de l'architecture proposée</h4>
        <p>
          L'architecture proposée, notée P dans la suite, change une seule chose de fond :{' '}
          <strong>
            le travail restant cesse d'être une position dans une boucle et devient un ensemble de
            lignes persistantes dans la base de données
          </strong>
          . La campagne n'est plus parcourue, elle est d'abord entièrement découpée en unités de
          travail élémentaires, puis ces unités sont déposées dans une file ; des processus
          correcteurs interchangeables viennent y puiser tant qu'il reste quelque chose à faire.
        </p>
        <p>
          Concrètement, le service proposé fonctionne ainsi. Lorsque l'enseignant lance une
          correction, l'API ne se contente plus de créer la campagne : dans la même transaction,
          elle énumère tous les couples (copie, exercice) de l'évaluation et insère une ligne par
          couple dans une nouvelle table <code>correction_tasks</code>, chacune à l'état{' '}
          <code>pending</code> et porteuse d'une priorité calculée à partir du type d'exercice. La
          campagne est donc, dès sa création, intégralement décrite sous forme de travail à faire,
          visible par n'importe quel processus connecté à la base.
        </p>
        <p>
          À partir de là, chaque processus correcteur exécute en boucle le même cycle, sans jamais
          parler aux autres : il réserve un petit lot de tâches <code>pending</code> dans la file,
          les marque <code>running</code> en y inscrivant un bail, corrige chaque réponse en
          appelant le moteur <code>grade_exercise</code> existant, puis écrit les notes obtenues et
          marque les tâches <code>done</code> en une seule transaction. Il recommence jusqu'à ce que
          la file ne contienne plus de tâche réservable pour la campagne. La campagne est terminée
          lorsque le nombre de tâches <code>done</code> égale le nombre de tâches créées au départ.
          Comme les processus ne se coordonnent qu'à travers la file, on peut en lancer plusieurs
          sur un même serveur, et lancer la même commande sur un second serveur pointant vers la
          même base, sans modifier une ligne de code.
        </p>
        <h4><span className="r-num">3.3.3</span> Ce qui est ajouté par rapport à l'architecture actuelle</h4>
        <p>Cinq éléments sont ajoutés, chacun répondant à une limite identifiée.</p>
        <ol>
          <li>
            <strong>Une table-file <code>correction_tasks</code>.</strong> Elle stocke le travail
            restant dans PostgreSQL au lieu de la mémoire du worker. Chaque ligne porte un état
            (pending, running, done, failed), une priorité, un bail et un compteur de tentatives. Les
            correcteurs y réservent leurs tâches avec <code>SELECT ... FOR UPDATE SKIP LOCKED</code>,
            déjà utilisé par le worker actuel, ce qui empêche deux processus de prendre la même
            tâche. Elle joue le rôle du courtier de l'architecture B, sans ajouter d'infrastructure
            (E4, E2).
          </li>
          <li>
            <strong>Le découpage en tâches fines, ordonnées par coût estimé.</strong> L'unité de
            travail devient la réponse à un exercice et non la copie. Les tâches sont servies des
            plus lourdes aux plus légères : code C, algorithmique, questions courtes, puis QCM et
            vrai/faux. Cela évite qu'une tâche longue commencée en fin de campagne fasse attendre
            tous les autres correcteurs (E6).
          </li>
          <li>
            <strong>Un superviseur multi-processus sur chaque serveur.</strong>{' '}
            <code>app.worker --processes N</code> lance et surveille N correcteurs sur une machine,
            pour occuper les cœurs pendant qu'un processus attend la sandbox (E1). Contrairement à
            l'architecture A, ils prennent leur travail dans la file : le même binaire lancé sur un
            second serveur fonctionne à l'identique (E2).
          </li>
          <li>
            <strong>Un bail sur chaque tâche réservée.</strong> Le correcteur inscrit une date
            d'expiration et la prolonge tant qu'il est vivant. S'il meurt, le bail expire et la tâche
            redevient pending. Le compteur de tentatives bascule en failed une tâche qui échoue de
            façon répétée. Avec la contrainte d'unicité sur (campagne, copie, exercice), qui interdit
            une double note après reprise, un arrêt brutal coûte au plus les tâches en cours (E3).
          </li>
          <li>
            <strong>L'écriture par lot et la suppression du compteur partagé.</strong> Les notes et
            changements d'état d'un lot de k tâches sont écrits en une seule transaction. Le
            compteur <code>processed</code> de <code>correction_runs</code>, point de contention si
            tous les processus l'incrémentent, n'est plus écrit : la progression se lit en comptant
            les tâches done (E5).
          </li>
        </ol>

        <h3><span className="r-num">3.4</span> Description de l'architecture</h3>
        <h4><span className="r-num">3.4.1</span> Vue d'ensemble</h4>
        <Fig32 />
        <h4><span className="r-num">3.4.2</span> Composants</h4>
        <p>L'architecture compte cinq éléments, dont un seul est nouveau.</p>
        <p>
          <strong>L'API FastAPI.</strong> Elle reçoit la demande de l'enseignant et, dans la
          transaction qui crée la campagne, insère une tâche par réponse à corriger. Son rôle
          s'arrête là : elle ne corrige rien et n'attend pas la fin de la campagne.
        </p>
        <p>
          <strong>La file <code>correction_tasks</code>.</strong> C'est le seul composant nouveau, et
          c'est une simple table PostgreSQL. Elle contient le travail restant, une ligne par
          réponse, et sert de point de rendez-vous unique entre tous les workers, qui ne
          communiquent jamais directement entre eux.
        </p>
        <p>
          <strong>Le superviseur.</strong> Sur chaque nœud, la commande{' '}
          <code>app.worker --processes N</code> lance un processus parent, le superviseur, qui crée N
          workers, les surveille et en relance un s'il meurt. Il ne corrige aucune réponse et ne
          distribue aucun travail : il ne lit même pas la file, à la différence du répartiteur local
          de l'architecture A.
        </p>
        <p>
          <strong>Le worker.</strong> C'est le processus qui corrige. Il réserve lui-même un lot de
          tâches dans la file, appelle <code>grade_exercise</code> pour chacune, écrit les notes, et
          recommence tant qu'il reste des tâches réservables. Tous les workers sont identiques et
          interchangeables, quel que soit le nœud qui les héberge.
        </p>
        <p>
          <strong>La sandbox.</strong> Elle reste le mécanisme actuel d'exécution isolée du code
          étudiant, inchangé. Chaque worker lance la sienne et attend sa fin ; c'est pendant cette
          attente que les autres workers du nœud occupent les cœurs.
        </p>
        <h4><span className="r-num">3.4.3</span> Unité de travail et granularité</h4>
        <p>
          La granularité désigne la taille de l'unité de travail qu'un correcteur réserve en une
          fois. Elle détermine le nombre de tâches présentes dans la file pour une même campagne,
          donc le nombre de correcteurs qui peuvent y travailler en parallèle : un grain grossier
          laisse des workers inactifs faute de tâche à prendre, un grain fin les occupe tous mais
          multiplie les accès à la base. Choisir la granularité, c'est arbitrer entre ces deux
          coûts. L'architecture actuelle retient le grain le plus grossier possible, la campagne
          (section 1.2), ce qui plafonne le parallélisme à un seul worker.
        </p>
        <p>
          L'unité de travail est la réponse : un couple (copie, exercice). Ce choix répond à
          l'exigence E6. Avec un découpage par copie, une copie contenant une boucle infinie occupe
          un worker pendant plus de 12 secondes et retarde la fin de la campagne, alors que les
          autres workers ont déjà fini. Avec un découpage par réponse et les tâches lourdes en tête
          de file, cette réponse lente démarre tôt et les réponses rapides comblent les trous.
        </p>
        <Fig33 />
        <p>
          Une granularité plus fine a un coût : chaque tâche demande une réservation et une écriture
          en base. Pour l'amortir, un worker réserve et écrit ses tâches par lots de k, avec k valant
          4 par défaut et réglable. Le chapitre 4 prévoit une mesure qui compare le découpage par
          copie et le découpage par réponse pour vérifier ce choix.
        </p>
        <p>
          La priorité d'une tâche est fixée à sa création selon le type d'exercice : 3 pour le code
          C (compilation et exécution), 2 pour l'algorithmique (transpilation et exécution), 1 pour
          les QCM, vrai/faux, correspondances et réponses courtes (comparaison directe).
        </p>
        <h4><span className="r-num">3.4.4</span> Cycle de vie d'une tâche</h4>
        <Fig34 />
        <p>
          Une tâche failed ne bloque pas la campagne : celle-ci se termine avec le statut partial,
          comme aujourd'hui quand <code>process_run</code> rencontre une exception sur un exercice.
          L'enseignant voit les réponses concernées et peut relancer une campagne.
        </p>
        <h4><span className="r-num">3.4.5</span> Déroulement d'une campagne</h4>
        <Fig35 />
        <h4><span className="r-num">3.4.6</span> Déploiement</h4>
        <Fig36 />

        <h3><span className="r-num">3.5</span> Comparaison avec les architectures étudiées</h3>
        <Table
          caption="Tableau 3.2 - Comparaison de l'architecture proposée avec les architectures étudiées"
          rows={[
            ['Critère', 'Séquentielle', 'Pool local (A)', 'Distribuée (B)', 'Serverless (C)', 'Proposée (P)'],
            ["Étude d'origine", 'Wasik et al. [1]', 'Drung et al. [8]', 'Ibrahim et al. [3]', 'Ji et al. [5]', 'Ce travail'],
            ['Parallélisme sur un serveur', 'Non', 'Oui (N processus)', 'Oui (M workers)', 'Oui (workers éphémères)', 'Oui (N processus)'],
            ['Ajout de serveurs', 'Non', 'Non', 'Oui', 'Automatique', 'Oui'],
            ['Composants à déployer', 'API, PostgreSQL', 'API, PostgreSQL', 'API, PostgreSQL, courtier', 'API, PostgreSQL, service cloud', 'API, PostgreSQL'],
            ["Données hors de l'établissement", 'Non', 'Non', 'Non', 'Oui', 'Non'],
            ['Unité de travail', 'Campagne', 'Copie', 'Copie', 'Copie', 'Réponse (lot de k)'],
            ["Reprise après arrêt d'un worker", 'Non (campagne bloquée)', 'Non (campagne bloquée)', 'Oui (file de reprise)', 'Oui (gérée par le service)', 'Oui (bail de 60 s)'],
            ['Écritures sur la ligne de campagne', '1 par copie', '1 par copie', '1 par copie', '1 par copie', 'Aucune (progression calculée)'],
            ['Modifications du code', 'Aucune', 'Modérées', 'Importantes', 'Importantes', 'Modérées'],
          ]}
        />
        <p>L'architecture proposée a aussi ses limites, qu'il faut garder en vue :</p>
        <ul>
          <li>
            <strong>La file coûte des écritures.</strong> Chaque tâche ajoute une insertion et deux
            mises à jour. Au rythme de CodEval, quelques dizaines de réponses corrigées par seconde
            au plus, cette charge reste faible ; mais au-delà de quelques dizaines de workers, la
            réservation elle-même pourrait devenir un point d'attente. À cette échelle, un courtier
            dédié comme dans l'architecture B redeviendrait pertinent.
          </li>
          <li>
            <strong>L'attente active.</strong> Un worker sans tâche interroge la base toutes les 2
            secondes. Le premier lot d'une campagne peut donc attendre jusqu'à 2 secondes. Le
            mécanisme de notification de PostgreSQL pourrait réveiller les workers dès la création
            des tâches.
          </li>
        </ul>
        <p>
          Le chapitre suivant décrit l'environnement, les métriques, les critères de réussite et le
          protocole qui permettent de tester cette hypothèse en comparant les architectures A, B et
          P à la référence séquentielle. L'architecture C n'est pas mesurée ; le chapitre 4 explique
          pourquoi.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="chapitre-4">
        <h2>Chapitre 4 : Méthodologie expérimentale</h2>
        <p>
          Ce chapitre explique comment nous comparons quatre façons de corriger : le traitement
          séquentiel actuel, qui sert de référence, les architectures A et B, et l'architecture
          proposée P. L'ordre est le suivant. Le matériel et les logiciels d'abord. Les copies à
          corriger ensuite, et la façon de les construire. Puis ce que nous mesurons, avec quels
          indicateurs et quels seuils. Le reste est un mode d'emploi : le protocole complet est
          décrit sur l'architecture actuelle, et chaque architecture suivante n'ajoute que ce qui
          change. Les résultats sont au chapitre 5.
        </p>

        <h3><span className="r-num">4.1</span> Matériel et logiciels</h3>
        <h4><span className="r-num">4.1.1</span> Poste de mesure</h4>
        <p>Toutes les mesures se font sur un seul poste, celui du développement de CodEval.</p>
        <Table
          caption="Tableau 4.1 - Poste de mesure"
          rows={[
            ['Composant', 'Spécification'],
            ['Machine', 'MacBook Pro 14 pouces, modèle Mac15,3'],
            ['Processeur', "Apple M3, 8 cœurs : 4 cœurs de performance et 4 cœurs d'efficacité"],
            ['Mémoire', '8 Go de mémoire unifiée'],
            ['Stockage', 'SSD interne'],
            ['Système', 'macOS 26.6'],
            ['Alimentation', 'Sur secteur pendant toute la campagne de mesures'],
          ]}
        />
        <p>
          Les deux types de cœurs n'ont pas la même puissance, et macOS choisit seul où placer
          chaque processus. Au-delà de 4 workers, les processus en trop tombent en partie sur les
          cœurs d'efficacité. Le gain par worker ajouté devrait donc baisser à partir de 4, et les
          mesures doivent le montrer.
        </p>
        <h4><span className="r-num">4.1.2</span> Logiciels</h4>
        <Table
          caption="Tableau 4.2 - Logiciels utilisés et leur rôle"
          rows={[
            ['Logiciel', 'Version', 'Rôle'],
            ['Python', '3.12.13 (environnement du backend)', 'Exécution de CodEval, des workers et du banc'],
            ['FastAPI, SQLAlchemy, psycopg', 'Versions de requirements.txt, figées par pip freeze', 'Backend de CodEval'],
            ['PostgreSQL', '18.3 (Postgres.app)', 'Base de données, et file de tâches pour P'],
            ['Apple clang', '21.0.0 (appelé sous le nom gcc)', 'Compilation des réponses en C'],
            ['Docker Desktop', '29.2.1', "Redis pour B, nœuds émulés pour l'expérience X3"],
            ['Redis', '7.2 (image redis:7.2-alpine)', "File de messages de l'architecture B uniquement"],
            ['psutil', 'Dernière version stable, figée', 'Échantillonnage du processeur et de la mémoire'],
            ['CodEval', 'Commit de référence, empreinte enregistrée', 'Code testé'],
          ]}
        />
        <p>
          La base de test <code>codeval_bench</code> est séparée de la base de développement.
          PostgreSQL garde sa configuration par défaut : ses 100 connexions suffisent aux 8 workers,
          à l'orchestrateur et à l'échantillonneur.
        </p>
        <h4><span className="r-num">4.1.3</span> Instruments de mesure</h4>
        <p>
          Quatre outils entourent l'application pendant chaque mesure. Ils observent la correction,
          ils ne la font pas.
        </p>
        <ul>
          <li><strong>L'orchestrateur</strong> prépare la base, démarre les workers, déclenche la campagne, la chronomètre et exporte les données brutes à la fin.</li>
          <li><strong>L'échantillonneur</strong> relève toutes les 500 millisecondes le processeur et la mémoire des workers et de leurs processus fils, et toutes les secondes le nombre de sessions en attente de verrou dans PostgreSQL.</li>
          <li><strong>La sonde d'API</strong> interroge l'API toutes les 200 millisecondes pendant la correction et note son temps de réponse.</li>
          <li><strong>L'horloge de référence</strong> est celle de PostgreSQL. Dans la base de test, chaque note enregistrée porte l'heure de son écriture. Toutes les durées en découlent, ce qui évite de comparer des horloges différentes.</li>
        </ul>
        <Fig41 />
        <h4><span className="r-num">4.1.4</span> Conditions de mesure</h4>
        <p>Avant chaque série de mesures :</p>
        <ol>
          <li>brancher le poste sur secteur et désactiver le mode économie d'énergie ;</li>
          <li>fermer toutes les applications sauf le terminal, et suspendre l'indexation Spotlight ;</li>
          <li>empêcher la mise en veille pendant la série ;</li>
          <li>vérifier l'absence de bridage thermique ;</li>
          <li>entre deux mesures, attendre 60 secondes pour que le processeur revienne à sa température de repos.</li>
        </ol>
        <p>
          Le bridage thermique est la baisse de fréquence que le système décide lui-même quand la
          puce chauffe trop, pour la protéger. Le processeur travaille alors plus lentement, sans
          aucun message d'erreur. Une mesure lancée sur une machine encore chaude serait donc
          ralentie pour une raison étrangère à l'architecture testée.
        </p>

        <h3><span className="r-num">4.2</span> Données corrigées pendant les mesures</h3>
        <p>
          Les données de test viennent de contenus de CodEval, pas d'exercices inventés pour le banc.
          L'application les charge elle-même en base. Chaque architecture suit donc le vrai chemin
          de correction.
        </p>
        <h4><span className="r-num">4.2.1</span> L'évaluation de référence</h4>
        <p>
          L'évaluation « BENCH-SRIT » reprend les types d'exercices qu'un enseignant de l'ESATIC
          combine dans une épreuve.
        </p>
        <Table
          caption="Tableau 4.3 - Exercices de l'évaluation de référence BENCH-SRIT"
          rows={[
            ['Ex.', 'Titre', 'Type', 'Origine', 'Correction', 'Points'],
            ['1', 'Calculatrice en boucle', 'Code C', "Banque d'exercices de CodEval", 'Compilation, 6 tests officiels, comparaison trim', '6'],
            ['2', 'Premier pointeur sur un entier', 'Code C', "Banque d'exercices de CodEval", 'Compilation, 1 critère de déclaration, 1 test', '4'],
            ['3', 'Moyenne de N notes', 'Algorithmique', 'Écrit selon le formalisme du cours SRIT1', 'Transpilation en Python, 2 tests', '4'],
            ['4', 'Notions de base du C', 'QCM, 5 questions', "Créé dans l'éditeur d'évaluation de CodEval", 'Comparaison des réponses', '3'],
            ['5', 'Vrai ou faux sur les pointeurs', 'Vrai/faux, 5 affirmations', "Créé dans l'éditeur d'évaluation de CodEval", 'Comparaison des réponses', '3'],
          ]}
        />
        <p>
          Une copie complète compte 5 réponses, dont 3 passent par la sandbox. Les tests gardent les
          valeurs par défaut de CodEval : 2 000 ms par test, 5 secondes de temps processeur, 20
          secondes pour la compilation.
        </p>
        <h4><span className="r-num">4.2.2</span> Le contenu des copies</h4>
        <p>
          Une copie réelle n'est pas toujours juste. Elle peut échouer à la compilation, boucler sans
          fin ou rester vide, et ces cas changent beaucoup le temps de correction. Pour chaque
          exercice de code et d'algorithmique, nous écrivons donc 3 variantes de réponse dans
          chacune des 5 classes ci-dessous, soit 15 variantes par exercice.
        </p>
        <Table
          caption="Tableau 4.4 - Classes de réponses et leur part dans les copies"
          rows={[
            ['Classe', 'Description', 'Effet sur la correction', 'Part des copies'],
            ['K1', 'Correcte', 'Compilation puis tous les tests réussis', '60 %'],
            ['K2', 'Partielle (erreur de logique)', 'Compilation, une partie des tests échoue', '15 %'],
            ['K3', 'Erreur de compilation', 'Arrêt après la compilation, sans test', '10 %'],
            ['K4', 'Boucle infinie (condition de fin oubliée)', 'Chaque test atteint le délai de 2 s', '5 %'],
            ['K5', 'Vide (non rendue)', 'Statut « pas de réponse », immédiat', '10 %'],
          ]}
        />
        <p>
          Pour le QCM et le vrai/faux, les réponses sont tirées au hasard parmi les choix possibles.
          Ces proportions sont fixées a priori. Si des copies réelles d'une session passée
          deviennent disponibles, elles sont anonymisées et leurs proportions remplacent celles du
          tableau. Les variantes, elles, ne changent pas.
        </p>
        <h4><span className="r-num">4.2.3</span> Les profils de charge</h4>
        <Table
          caption="Tableau 4.5 - Profils de charge"
          rows={[
            ['Profil', 'Copies', 'Réponses à corriger', 'Situation réelle'],
            ['Petit', '10', '50', "Travaux pratiques d'un petit groupe"],
            ['Moyen', '50', '250', 'Une classe'],
            ['Grand', '100', '500', 'Une promotion'],
            ['Massif', '200', '1 000', 'Plusieurs classes, examen commun'],
            ['Extrême', '500', '2 500', 'Test de saturation'],
          ]}
        />

        <h3><span className="r-num">4.3</span> Construction du jeu de données</h3>
        <p>
          Le jeu de données ne dépend d'aucune architecture. Il est construit une seule fois, avant
          toute mesure, puis gelé. Toutes les architectures corrigent ensuite exactement les mêmes
          copies, sinon leurs temps ne seraient pas comparables.
        </p>
        <p>
          Deux scripts livrés avec le code font ce travail, dans <code>docs/recherche/bench/</code>.
          Le contenu de l'évaluation et les variantes de réponses sont décrits dans{' '}
          <code>dataset_spec.py</code>, que les deux scripts lisent. Les quatre étapes ci-dessous
          donnent les commandes à taper et ce que chacune produit. Les réglages disponibles figurent
          en annexe C.
        </p>
        <p>
          <strong>Étape 1. Préparer la base modèle.</strong> Le chargement a besoin d'une base vide au
          schéma de CodEval. Cette base ne sert jamais aux mesures : elle sert de modèle à recopier.
        </p>
        <Code>{`createdb -O codeval codeval_bench_tpl

cd backend
export CODEVAL_DATABASE_URL=postgresql+psycopg://codeval:codeval@localhost:5432/codeval_bench_tpl
.venv/bin/python -c "from app.db import init_db; init_db()"
.venv/bin/alembic stamp head`}</Code>
        <p>
          La première commande crée les tables, la seconde note que la base est à jour des
          migrations. L'ordre inverse échoue : la migration de CodEval modifie des tables
          existantes, elle ne les crée pas. Résultat : une base <code>codeval_bench_tpl</code> qui
          contient toutes les tables de CodEval, et aucune donnée.
        </p>
        <p><strong>Étape 2. Tirer les copies.</strong></p>
        <Code>{`cd docs/recherche/bench
python3 gen_dataset.py --seed 2026 --copies 500`}</Code>
        <p>
          Le script tire 500 copies à partir de la graine 2026. Pour chaque copie et chaque exercice
          de code ou d'algorithmique, il choisit une classe selon les proportions de la section
          4.2.2, puis une des 3 variantes de cette classe. Les réponses de QCM et de vrai/faux sont
          tirées au hasard parmi les choix possibles. Résultat : deux fichiers dans{' '}
          <code>data/</code>.
        </p>
        <Table
          caption="Tableau 4.6 - Fichiers produits par le tirage des copies"
          rows={[
            ['Fichier', 'Contenu'],
            ['dataset_v1.json', 'Les 500 copies : matricule, nom, courriel, et les 5 réponses avec leur classe'],
            ['dataset_v1.sha256', "L'empreinte SHA-256 du fichier précédent"],
          ]}
        />
        <p>
          Le script affiche la répartition obtenue et l'empreinte. Sur le tirage utilisé ici : 2 500
          réponses pour 500 copies, dont 1 500 réponses de code et d'algorithmique réparties en K1
          60,5 %, K2 14,1 %, K3 10,7 %, K4 5,2 % et K5 9,5 %, et 1 000 réponses de QCM et de
          vrai/faux. L'écart aux proportions visées vient du tirage au sort. À graine égale, le même
          fichier et la même empreinte sont obtenus sur n'importe quelle machine.
        </p>
        <p><strong>Étape 3. Charger les copies dans la base modèle.</strong></p>
        <Code>{`cd docs/recherche/bench
CODEVAL_DATABASE_URL=postgresql+psycopg://codeval:codeval@localhost:5432/codeval_bench_tpl \\
    ../../../backend/.venv/bin/python load_dataset.py --dataset data/dataset_v1.json`}</Code>
        <p>
          Le script écrit les lignes qu'une vraie session aurait écrites. L'épreuve n'est jamais
          jouée et aucun étudiant ne se connecte : la base est mise dans l'état qui suit la remise
          des copies, juste avant la correction.
        </p>
        <Table
          caption="Tableau 4.7 - Lignes créées en base par le chargement du jeu de données"
          rows={[
            ['Ce qui est créé', 'Nombre'],
            ['Établissement', '1'],
            ['Enseignante, matière, classe', '1 de chaque'],
            ['Évaluation BENCH-SRIT (fermée)', '1'],
            ['Exercices', '5'],
            ['Tests officiels', '9'],
            ['Comptes étudiants et inscriptions', '500'],
            ['Participations', '500'],
            ['Soumissions (réponses)', '2 500'],
          ]}
        />
        <p>
          Le script affiche ce compte rendu et rappelle l'empreinte à reporter dans chaque fichier
          de mesure. Il refuse de charger deux fois dans la même base, sauf demande explicite.
        </p>
        <p>
          <strong>Étape 4. Utiliser le modèle.</strong> Avant chaque mesure, l'orchestrateur supprime
          la base de mesure et la recrée à partir de ce modèle, puis retire les copies au-delà de la
          charge voulue. Une charge de n copies prend les n premières copies du fichier : les
          petites charges sont donc contenues dans les grandes et gardent la même composition.
        </p>
        <p>
          Chaque mesure enregistre l'empreinte du jeu utilisé. Deux mesures ne sont comparables que
          si elles portent la même. Toute modification, ne serait-ce qu'une proportion, change
          l'empreinte et rend la rupture visible.
        </p>

        <h3><span className="r-num">4.4</span> Ce que nous mesurons</h3>
        <h4><span className="r-num">4.4.1</span> Les questions posées</h4>
        <Table
          caption="Tableau 4.8 - Question posée par chaque expérience"
          rows={[
            ['Exp.', 'Question posée', 'Hypothèse'],
            ['X1', 'Comment le temps de correction évolue-t-il avec le nombre de copies ?', 'H1, HP'],
            ['X2', 'Quel gain apporte chaque worker ajouté sur un même serveur ?', 'H2, HP'],
            ['X3', "Que gagne-t-on en passant d'un à deux nœuds ?", 'H3, HP'],
            ['X4', "Que se passe-t-il si un worker est arrêté brutalement au milieu d'une campagne ?", 'HP'],
            ['X5', "Les notes sont-elles identiques quelle que soit l'architecture ?", 'HP'],
            ['X6', "L'API reste-t-elle réactive pendant une correction ?", 'HP'],
            ['X7', 'Le découpage par réponse est-il meilleur que le découpage par copie pour P ?', 'HP (choix de conception)'],
          ]}
        />
        <p>
          Une seule chose varie dans ces expériences : la façon de distribuer le travail. Le moteur
          de correction, la sandbox, les barèmes et le jeu de données restent identiques.
        </p>
        <Table
          caption="Tableau 4.9 - Variables de l'expérimentation"
          rows={[
            ['Type', 'Variable', 'Valeurs'],
            ['Indépendante', 'Architecture', 'Séquentielle, A, B, P'],
            ['Indépendante', 'Nombre de workers par nœud (N)', '1, 2, 4, 6, 8'],
            ['Indépendante', 'Nombre de copies (charge)', '10, 50, 100, 200, 500'],
            ['Indépendante', 'Nombre de nœuds', '1, 2 (nœuds émulés, expérience X3)'],
            ['Indépendante', 'Granularité de P', 'Copie ou réponse (expérience X7)'],
            ['Contrôlée', 'Évaluation et copies', 'Jeu de données figé (section 4.3), même empreinte'],
            ['Contrôlée', 'Limites de la sandbox', 'Valeurs par défaut de CodEval'],
            ['Contrôlée', 'Version du code et du matériel', 'Commit, versions et matériel enregistrés à chaque mesure'],
            ['Dépendante', 'Indicateurs', 'Section 4.4.2'],
          ]}
        />
        <h4><span className="r-num">4.4.2</span> Les indicateurs</h4>
        <Table
          caption="Tableau 4.10 - Indicateurs mesurés"
          rows={[
            ['Code', 'Indicateur', 'Définition et calcul', 'Instrument', 'Unité'],
            ['M1', 'Temps total T_total', 'De la création de la campagne à la dernière note écrite', 'Horloge de PostgreSQL', 's'],
            ['M2', 'Débit', 'Copies corrigées divisées par T_total', 'Calcul', 'copies/min'],
            ['M3', 'Latence par copie (p50, p95)', 'Pour chaque copie : heure de sa dernière note écrite moins début de campagne', 'Horodatage des notes', 's'],
            ['M4', 'Accélération S(N)', "T_total séquentiel divisé par T_total de l'architecture, à charge égale", 'Calcul', 'sans unité'],
            ['M5', 'Efficacité E(N)', 'S(N) divisée par N (1 = gain parfait)', 'Calcul', 'sans unité'],
            ['M6', 'Processeur', "Moyenne et maximum de l'occupation de la machine pendant la campagne", 'Échantillonneur, 500 ms', '%'],
            ['M7', 'Mémoire pic', 'Somme maximale de la mémoire résidente des workers et de leurs fils', 'Échantillonneur, 500 ms', 'Mo'],
            ['M8', 'Attentes de verrous', 'Nombre moyen de sessions en attente de verrou dans PostgreSQL', 'Échantillonneur, 1 s', 'sessions'],
            ['M9', 'Exactitude', 'Part des couples (copie, exercice) dont la note et le statut égalent la référence séquentielle ; notes manquantes ; notes en double', 'Comparaison en base', '% et nombre'],
            ['M10', 'Reprise après panne', 'Part des notes obtenues sans intervention, doublons, surcoût de temps par rapport à la même mesure sans panne', 'Orchestrateur et base', '%, nombre, s'],
            ['M11', "Réactivité de l'API", "Temps de réponse p95 d'une requête de lecture pendant la correction", "Sonde d'API, 200 ms", 'ms'],
            ['M12', "Coût d'exploitation", "Composants à déployer en plus de l'API et de PostgreSQL ; ampleur des modifications du backend", 'Inventaire', 'nombre'],
          ]}
        />
        <h4><span className="r-num">4.4.3</span> Les seuils de réussite</h4>
        <p>Ces seuils sont fixés avant les mesures. Ils servent à décider, pas à décrire après coup.</p>
        <Table
          caption="Tableau 4.11 - Seuils de réussite"
          rows={[
            ['Code', 'Critère', 'Seuil de réussite', 'Indicateur'],
            ['R1', 'Exactitude', '100 % des notes identiques à la référence, 0 note manquante, 0 doublon, pour toutes les mesures', 'M9 (X5)'],
            ['R2', 'Gain sur un serveur', "Mesuré à 200 copies avec 4 workers. (a) P corrige au moins 3 fois plus vite que la correction séquentielle : S(4) ≥ 3, soit E(4) ≥ 0,75. (b) P n'est pas plus lente que A de plus de 5 % : T_total(P) ≤ 1,05 × T_total(A).", 'M4, M5, M1 (X2)'],
            ['R3', "Délai pour l'enseignant", '200 copies corrigées en 5 minutes au plus sur le poste, avec le meilleur N de P', 'M1 (X1, X2)'],
            ['R4', 'Passage à deux nœuds', 'T_total(1 nœud) / T_total(2 nœuds) ≥ 1,5 pour P, et T_total de P au plus 10 % au-dessus de celui de B à 2 nœuds', 'M1 (X3)'],
            ['R5', 'Reprise après panne', '100 % des notes obtenues sans intervention, 0 doublon, surcoût de temps d\'au plus 60 s (la durée du bail)', 'M10 (X4)'],
            ['R6', 'Sobriété', "Aucun composant à déployer en plus ; mémoire pic au plus 4 Go ; p95 de l'API au plus 500 ms pendant la correction", 'M12, M7, M11 (X6)'],
          ]}
        />
        <p>
          <strong>Pourquoi R2 compte deux conditions.</strong> La première répond à la seule question
          qui justifie ce travail : P va-t-elle plus vite que ce qui existe aujourd'hui ? Elle se lit
          par rapport à la correction séquentielle. Avec 4 workers, le gain idéal serait 4 ; nous
          exigeons 3, c'est-à-dire que trois des quatre workers ajoutés servent réellement, le
          quatrième étant consommé par la coordination et les accès à la base partagée.
        </p>
        <p>
          La seconde condition répond à une autre question, qui ne se pose que parce que A existe :
          cette vitesse est-elle payée trop cher ? A est l'architecture la plus rapide que l'on
          puisse attendre sur une seule machine, puisqu'elle ne paie ni file d'attente ni baux. P,
          elle, passe par la base partagée et renouvelle des baux, donc elle sera nécessairement un
          peu plus lente. La question est de savoir de combien. Si P était nettement derrière A sur
          un seul serveur, sa simplicité de déploiement ne compenserait plus. Les 5 % sont la marge
          que nous acceptons de payer pour cette simplicité.
        </p>
        <p>
          Le 0,75 d'efficacité de R2 et le 1,5 de R4 disent la même chose : nous acceptons un quart
          de pertes dues à la coordination et à la base partagée. Les 5 minutes de R3 sont ce qu'un
          enseignant peut attendre en fin d'épreuve. Les 4 Go de R6 laissent la moitié de la machine
          à l'API et à PostgreSQL.
        </p>
        <p><strong>Règle de décision</strong></p>
        <ul>
          <li>P est validée si R1, R5 et R6 sont satisfaits, et si R2 et R3 le sont aussi. R1, R5 et R6 sont éliminatoires : une architecture plus rapide qui perd des notes, en crée en double ou impose un composant de plus ne répond pas au problème.</li>
          <li>Si seul R4 échoue, P est validée pour un seul serveur, et B reste la référence à plusieurs serveurs.</li>
          <li>Si R2 ou R3 échoue, P n'est pas retenue. La recommandation se fait alors entre A et B, à partir des mêmes mesures.</li>
        </ul>
        <p><strong>Décision sur les hypothèses du chapitre 1</strong></p>
        <ul>
          <li><strong>H1</strong> est confirmée si, pour la référence séquentielle, la régression linéaire de T_total sur le nombre de copies donne un R² d'au moins 0,98 et si l'occupation moyenne du processeur reste sous 25 %.</li>
          <li><strong>H2</strong> est confirmée si A atteint une accélération d'au moins 3 avec N = 4 à 200 copies.</li>
          <li><strong>H3</strong> est confirmée si B atteint un rapport T_total(1 nœud) sur T_total(2 nœuds) d'au moins 1,5.</li>
          <li><strong>HP</strong> est confirmée si P est validée selon la règle ci-dessus.</li>
        </ul>
        <h4><span className="r-num">4.4.4</span> Plan d'ensemble des mesures</h4>
        <Table
          caption="Tableau 4.12 - Plan d'ensemble des mesures"
          rows={[
            ['Exp.', 'Architectures', 'N par nœud', 'Charges', 'Nœuds', 'Répétitions', 'Mesures'],
            ['X1', 'Seq, A, B, P', '1 (Seq), 4', '10, 50, 100, 200, 500', '1', '1 chauffe + 5', '120'],
            ['X2', 'A, B, P', '1, 2, 4, 6, 8', '200', '1', '1 chauffe + 5', '90'],
            ['X3', 'B, P (nœuds émulés)', '4', '200', '1, 2', '1 chauffe + 5', '24'],
            ['X4', 'Seq, A, B, P', '1 (Seq), 4', '200', '1', '5', '20'],
            ['X5', 'Toutes', 'Mesures de X1 à X3', '-', '-', '-', '0 (réutilisé)'],
            ['X6', 'Seq, A, B, P', '1 (Seq), 4', '200', '1', '5', '20'],
            ['X7', 'P par copie, P par réponse', '4', '200', '1', '1 chauffe + 5', '12'],
          ]}
        />
        <p>
          Soit <strong>286 mesures</strong>. La première répétition de chaque configuration sert de
          chauffe et n'est pas analysée. Dans chaque expérience, l'ordre des configurations est tiré
          au hasard avec la graine 2026, pour qu'une dérive de température ou d'activité du système
          ne pénalise pas toujours la même architecture.
        </p>

        <h3><span className="r-num">4.5</span> Mesure de l'architecture actuelle (référence)</h3>
        <p>
          Cette section décrit le protocole en entier. Les suivantes ne reprendront que ce qui
          change. L'application est supposée installée et fonctionnelle : il s'agit de la préparer,
          de lancer une correction et de relever ce qui s'est passé.
        </p>
        <h4><span className="r-num">4.5.1</span> Préparation, une seule fois</h4>
        <ol>
          <li>Se placer sur le commit de référence et vérifier qu'aucune modification locale n'est en attente.</li>
          <li>Installer le backend dans un environnement Python dédié et figer les versions installées.</li>
          <li>Démarrer PostgreSQL et créer la base modèle de test, séparée de la base de développement (section 4.3, étape 1).</li>
          <li>Ajouter à cette base modèle l'horodatage automatique des notes décrit en 4.1.3. Cet ajout ne concerne que la base de test et ne touche pas l'application.</li>
        </ol>
        <Code>{`psql -d codeval_bench_tpl -c "
ALTER TABLE correction_results
  ADD COLUMN written_at timestamptz NOT NULL DEFAULT clock_timestamp();"`}</Code>
        <p>
          <code>clock_timestamp()</code> donne l'heure exacte de l'écriture, et non l'heure
          d'ouverture de la transaction. Sans cette colonne, aucune durée ne peut être calculée.
        </p>
        <ol start={5}>
          <li>Générer et charger le jeu de données comme en section 4.3, et noter son empreinte.</li>
          <li>Enregistrer l'environnement dans un fichier : version du système, nombre de cœurs, mémoire, versions de PostgreSQL et du compilateur, empreinte du commit, empreinte du jeu de données.</li>
        </ol>
        <h4><span className="r-num">4.5.2</span> Déroulement d'une mesure</h4>
        <p>
          Une mesure correspond à un quadruplet (architecture, N, charge, répétition). Elle se
          déroule toujours selon les huit étapes de la figure 4.2.
        </p>
        <Fig42 />
        <p>
          Recréer la base avant chaque mesure garantit que toutes partent du même état, sans
          historique de campagnes ni cache de tables différents. Le worker démarre avant le
          déclenchement et attend : nous mesurons le traitement, pas le démarrage des processus,
          comme sur un serveur où les workers tournent en permanence.
        </p>
        <p>
          <strong>Les commandes.</strong> Elles sont données à la main, pour que la mesure soit
          reproductible sans l'orchestrateur. L'exemple porte sur l'architecture actuelle, à 10
          copies. Les sorties montrées viennent d'une mesure réelle. Trois terminaux sont ouverts
          dans <code>backend/</code>.
        </p>
        <p><strong>Étape 1. Recréer la base.</strong> Terminal 1.</p>
        <Code>{`dropdb --if-exists codeval_bench_run
createdb -O codeval -T codeval_bench_tpl codeval_bench_run

psql -d codeval_bench_run -c "
DELETE FROM submissions    WHERE participation_id IN (SELECT id FROM participations ORDER BY id OFFSET 10);
DELETE FROM participations WHERE id              IN (SELECT id FROM participations ORDER BY id OFFSET 10);
SELECT count(*) AS copies FROM participations;"

 copies
--------
     10`}</Code>
        <p>Remplacer 10 par la charge voulue. À regarder : le nombre de copies restantes.</p>
        <p><strong>Étape 2. Vider la file.</strong> Sans objet pour l'architecture actuelle.</p>
        <p><strong>Étape 3. Démarrer.</strong> Terminal 2, l'échantillonneur, puis terminal 3, le worker.</p>
        <Code>{`BENCH_DSN=postgresql://codeval:codeval@localhost:5432/codeval_bench_run \\
    .venv/bin/python ../docs/recherche/bench/sampler.py \\
    --out ../docs/recherche/bench/data/seq_N1_c10_r1.ech.json --match app.worker

CODEVAL_DATABASE_URL=postgresql+psycopg://codeval:codeval@localhost:5432/codeval_bench_run \\
    .venv/bin/python -m app.worker

2026-09-20 17:03:56,477 INFO Worker de correction démarré`}</Code>
        <p>À regarder : la ligne de démarrage du worker. Attendre ensuite 5 secondes.</p>
        <p><strong>Étape 4. Déclencher (t0).</strong> Terminal 1.</p>
        <Code>{`psql -d codeval_bench_run -c "
INSERT INTO correction_runs (evaluation_id, number, triggered_by, status, created_at, processed, total, stats)
VALUES (1, 1, 1, 'PENDING', now(), 0, 0, '{}') RETURNING id, created_at;"

 id |          created_at
----+------------------------------
  1 | 2026-09-20 17:04:01.14156+00`}</Code>
        <p>À regarder : <code>created_at</code>. C'est t0, l'origine de tous les temps.</p>
        <p><strong>Étape 5. Attendre.</strong> Terminal 1.</p>
        <Code>{`until [ "$(psql -tAd codeval_bench_run -c 'SELECT status FROM correction_runs WHERE id = 1')" = "DONE" ]
do sleep 1; done

psql -d codeval_bench_run -c "SELECT status, processed, total, finished_at FROM correction_runs WHERE id = 1;"

 status | processed | total |          finished_at
--------+-----------+-------+-------------------------------
 DONE   |        10 |    10 | 2026-09-20 17:04:51.519714+00`}</Code>
        <p>
          À regarder : status vaut DONE et processed égale total. Au-delà de 3 600 s, arrêter et
          marquer la mesure « non terminée ».
        </p>
        <p>
          <strong>Étape 6. Arrêter.</strong> Ctrl-C dans le terminal 3, puis dans le terminal 2.
          L'échantillonneur écrit son fichier en partant. À regarder : le résumé, en fin de fichier.
          Il donne M6, M7 et M8. Le processeur est compté en pourcentage d'un cœur : 214 % vaut 2,1
          cœurs occupés.
        </p>
        <Code>{`"m6_cpu_moy": 60.9, "m6_cpu_max": 214.3, "m7_rss_pic_mo": 1105.4,
"m8_verrous_moy": 0.0, "m8_verrous_max": 0, "n_echantillons": 112`}</Code>
        <p><strong>Étape 7. Exporter.</strong> Terminal 1. La première requête donne M1 et M2.</p>
        <Code>{`psql -d codeval_bench_run -c "
SELECT count(*) AS notes,
       round(extract(epoch FROM max(r.written_at) - c.created_at)::numeric, 1) AS t_total_s,
       round((count(DISTINCT r.participation_id) * 60.0
              / extract(epoch FROM max(r.written_at) - c.created_at))::numeric, 1) AS copies_min
FROM correction_results r JOIN correction_runs c ON c.id = r.run_id
GROUP BY c.created_at;"

 notes | t_total_s | copies_min
-------+-----------+------------
    50 |      49.9 |       12.0`}</Code>
        <p>La deuxième donne M3, la latence par copie.</p>
        <Code>{`psql -d codeval_bench_run -c "
SELECT round(percentile_cont(0.5) WITHIN GROUP (ORDER BY d)::numeric, 1) AS p50_s,
       round(percentile_cont(0.95) WITHIN GROUP (ORDER BY d)::numeric, 1) AS p95_s
FROM (SELECT extract(epoch FROM max(r.written_at) - min(c.created_at)) AS d
      FROM correction_results r JOIN correction_runs c ON c.id = r.run_id
      GROUP BY r.participation_id) s;"

 p50_s | p95_s
-------+-------
  37.9 |  49.6`}</Code>
        <p>La troisième contrôle la mesure elle-même.</p>
        <Code>{`psql -d codeval_bench_run -c "SELECT status, count(*) FROM correction_results GROUP BY status ORDER BY 2 DESC;"

    status     | count
---------------+-------
 OK            |    38
 NO_SUBMISSION |     5
 TIMEOUT       |     4
 COMPILE_ERROR |     3`}</Code>
        <p>
          Ces statuts doivent suivre les classes de la section 4.2.2. Ici, sur 10 copies, 5
          réponses vides (K5), 4 en délai dépassé (K4) et 3 en erreur de compilation (K3). Un écart
          signale un problème de mesure, pas une architecture lente. La dernière commande écrit les
          notes horodatées, qui servent à M9.
        </p>
        <Code>{`psql -d codeval_bench_run -c "\\copy (
  SELECT participation_id, exercise_id, auto_score, status, written_at
  FROM correction_results ORDER BY participation_id, exercise_id)
  TO '../docs/recherche/bench/data/seq_N1_c10_r1.notes.csv' CSV HEADER"

participation_id,exercise_id,auto_score,status,written_at
1,1,6,OK,2026-09-20 17:04:02.543053+00
1,2,0,NO_SUBMISSION,2026-09-20 17:04:02.543053+00`}</Code>
        <p><strong>Étape 8. Refroidir.</strong> 60 secondes de pause, puis mesure suivante.</p>
        <p>
          <strong>Les autres architectures.</strong> Ces huit étapes ne changent pas. Seules changent
          la mise en place, faite une fois avant la série, et l'étape 2.
        </p>
        <Table
          caption="Tableau 4.13 - Ce qui change d'une architecture à l'autre dans le déroulement d'une mesure"
          rows={[
            ['Architecture', 'À installer avant la série', 'Étape 2', 'Étape 3'],
            ['Actuelle', 'Rien', 'Sans objet', '1 worker'],
            ['A', 'Pool de N processus dans le worker', 'Sans objet', '1 worker, N processus fils'],
            ['B', 'Redis dans Docker, dépôt des tâches', 'Supprimer les listes Redis', 'N workers'],
            ['P', 'Migration de la table de file', 'Vider la table de file', '1 superviseur, N correcteurs'],
          ]}
        />
        <p>
          Les sections 4.6 à 4.8 ne décrivent que cette colonne d'installation.
        </p>
        <p>
          <strong>En une commande.</strong> Ces huit étapes sont automatisables. Le script{' '}
          <code>orchestrate.py</code>, livré dans <code>docs/recherche/bench/</code>, les enchaîne
          pour chaque configuration, sans intervention.
        </p>
        <Code>{`cd docs/recherche/bench
../../../backend/.venv/bin/python orchestrate.py --arch seq --charges 10,50,100,200,500 --repetitions 6

campagne seq : 1 configurations x 2 repetitions = 2 mesures
jeu de donnees 2c8e59b5fc1380ef6bbdfb94f6659202f8140e3d092fd3812fc35c1f7d90da96
seq_N1_c10_r0 debut (chauffe)
seq_N1_c10_r0 terminee : 46.405 s, 12.93 copies/min, 50 notes
seq_N1_c10_r1 debut
seq_N1_c10_r1 terminee : 52.334 s, 11.46 copies/min, 50 notes`}</Code>
        <p>
          Il écrit dans <code>data/</code> un fichier par mesure, nommé d'après sa configuration, un
          fichier d'agrégats et le journal de la campagne. Il ajoute trois choses qu'une série faite
          à la main ne tient pas : l'ordre des configurations retiré au sort à chaque tour avec la
          graine 2026, la répétition 0 marquée comme chauffe, et les mêmes 5 secondes d'attente et
          60 secondes de refroidissement à chaque mesure. Les commandes manuelles restent la
          référence. Elles servent à vérifier une mesure isolée, à comprendre ce que fait le script,
          et à mesurer quand le script tombe en panne.
        </p>
        <p>
          <strong>Système d'exploitation.</strong> Les commandes ci-dessus sont identiques sous
          macOS et sous Linux. <code>psql</code>, <code>createdb</code> et <code>dropdb</code>{' '}
          s'utilisent de la même façon partout. Sous Windows, trois choses changent :{' '}
          <code>.venv/bin/python</code> devient <code>.venv\Scripts\python.exe</code>,{' '}
          <code>VARIABLE=valeur commande</code> devient <code>set VARIABLE=valeur</code> puis la
          commande, et la boucle <code>until</code> de l'étape 5 n'existe pas.{' '}
          <code>orchestrate.py</code> corrige le premier point seul. Les mesures, elles, ne se
          comparent jamais d'un système à l'autre : la sandbox n'applique pas les mêmes limites
          (section 4.7).
        </p>
        <h4><span className="r-num">4.5.3</span> Mesure avec panne (X4)</h4>
        <ol>
          <li>Préparer et lancer une mesure à 200 copies comme ci-dessus.</li>
          <li>À mi-campagne, quand la moitié des notes attendues est enregistrée, arrêter brutalement un processus correcteur en train de corriger. Il n'est pas relancé à la main.</li>
          <li>Attendre 10 minutes au plus sans intervenir.</li>
          <li>Relever le nombre de notes obtenues, les doublons, le statut final de la campagne et le temps total.</li>
          <li>Le surcoût de temps est le temps total avec panne moins la médiane des temps totaux sans panne, à configuration égale.</li>
        </ol>
        <p>
          Pour l'architecture actuelle, aucun mécanisme de reprise n'est ajouté : nous observons le
          comportement tel quel. Une campagne restée bloquée est notée « non reprise ».
        </p>
        <h4><span className="r-num">4.5.4</span> Vérification des notes (X5)</h4>
        <p>
          La correction séquentielle sert de référence. Pour chaque charge, la première répétition
          analysée fournit les notes de référence. Chaque mesure suivante lui est comparée couple
          par couple (copie, exercice), sur la note et sur le statut, dans les deux sens, pour qu'une
          note en trop apparaisse comme une note manquante. Les doublons sont comptés à part. Les
          réponses de classe K4 sont les plus exposées, car leur statut dépend d'un délai : tout
          écart les concernant est examiné cas par cas.
        </p>
        <h4><span className="r-num">4.5.5</span> Réactivité de l'API (X6)</h4>
        <p>
          L'API est lancée normalement, en un seul processus. Pendant la correction, la sonde
          s'authentifie comme l'enseignante et demande la liste de ses évaluations toutes les 200
          millisecondes, en notant chaque temps de réponse. Une mesure de 60 secondes sans
          correction en cours sert de référence pour l'API au repos.
        </p>
        <h4><span className="r-num">4.5.6</span> Traitement des mesures</h4>
        <ul>
          <li>Pour chaque configuration, nous retenons la médiane des 5 répétitions et son intervalle de confiance à 95 % obtenu par rééchantillonnage (bootstrap, 4 000 tirages).</li>
          <li>Pour comparer deux architectures, nous utilisons le test de Mann-Whitney (bilatéral, seuil 0,05), qui ne suppose pas de loi normale, avec le delta de Cliff pour la taille de l'effet, effet dit grand au-delà de 0,474 en valeur absolue. Avec 5 répétitions par groupe, la plus petite valeur p atteignable est 0,008 : une différence nette reste détectable.</li>
          <li>Pour X2, la loi de passage à l'échelle universelle est ajustée sur le débit en fonction de N. Elle estime le nombre de workers au-delà duquel en ajouter fait baisser le débit.</li>
          <li>Pour H1, une régression linéaire du temps total sur le nombre de copies donne la pente, en secondes par copie, et le coefficient R².</li>
        </ul>
        <h4><span className="r-num">4.5.7</span> Traçabilité</h4>
        <p>
          Chaque mesure produit un fichier nommé d'après sa configuration. Il contient la
          configuration complète, l'empreinte du commit, l'empreinte du jeu de données, les
          horodatages de début et de fin, toutes les notes horodatées, les échantillons de
          processeur, de mémoire et de verrous, et le journal des workers. Un fichier d'agrégats et
          un journal horodaté de la campagne les rassemblent. Rejouer le protocole consiste à
          reprendre les sections 4.5.1 et 4.5.2 avec le même commit et le même jeu de données.
        </p>

        <h3><span className="r-num">4.6</span> Mesure de l'architecture A (pool de processus local)</h3>
        <p>
          <strong>Mise en place.</strong> A se construit à partir de l'existant sans toucher au
          moteur de correction. Le worker unique ne corrige plus lui-même : après avoir réservé la
          campagne, il ouvre un pool de N processus fils, leur distribue les copies une par une et
          attend leur retour. Chaque fils corrige sa copie exactement comme le worker actuel, puis
          enregistre ses notes. Le découpage reste la copie, et le travail restant reste en mémoire
          du processus qui distribue.
        </p>
        <p>
          <strong>Ce qui change dans la mesure.</strong> Le protocole de la section 4.5 s'applique tel
          quel, avec deux ajustements. À l'étape 3, N processus sont démarrés au lieu d'un, N valant
          1, 2, 4, 6 et 8 pour l'expérience X2. Pour X4, le processus arrêté est l'un des fils du
          pool, et aucun mécanisme de reprise n'est ajouté : nous observons l'architecture telle
          qu'elle est.
        </p>

        <h3><span className="r-num">4.7</span> Mesure de l'architecture B (workers distribués via Redis)</h3>
        <p>
          <strong>Pourquoi Redis et non l'un des quatre courtiers de l'étude.</strong> L'étude <Cite n={3} />
          qui fonde B compare Kafka, ActiveMQ Artemis, RabbitMQ et NATS, et désigne NATS. Le banc
          mesure pourtant B avec Redis, pour trois raisons. D'abord, le courtier n'est pas la
          variable étudiée : nous comparons des façons de distribuer le travail, pas des
          technologies de transport. Ensuite, le courtier ne peut pas peser sur les temps relevés :
          publier ou consommer un message coûte moins d'une milliseconde, quand une réponse à
          corriger coûte de quelques dizaines de millisecondes à plus de douze secondes. Le temps
          total vient de la sandbox et de la base. Enfin, ce qui distingue vraiment B ici n'est pas
          sa vitesse mais son coût d'exploitation, c'est-à-dire le composant de plus à installer et
          à superviser (indicateur M12). De ce point de vue, Redis est le représentant le plus
          favorable à B, puisqu'il est le plus simple à déployer. Mesurer B avec Redis revient donc
          à lui accorder le meilleur des cas.
        </p>
        <p>
          Cette substitution a une conséquence à énoncer : les temps de B ne sont pas ceux qu'aurait
          donnés NATS, et ils ne peuvent pas être rapportés aux mesures de l'étude <Cite n={3} />, faites hors
          contexte éducatif et à des débits sans rapport avec une campagne de correction. Ils ne
          valent que dans la comparaison interne de ce mémoire.
        </p>
        <p>
          <strong>Mise en place.</strong> Deux changements par rapport à l'existant. Un serveur Redis
          est déployé à côté de PostgreSQL ; sur le poste de mesure, il tourne dans un conteneur
          Docker. Et le déclenchement d'une campagne ne lance plus une boucle de correction : il
          dépose une tâche par copie dans une file Redis, que N workers indépendants consomment. Une
          tâche prise par un worker passe dans une liste « en cours » et revient en file si elle
          n'est pas acquittée dans les 60 secondes, ce qui donne à B une reprise après panne
          comparable à celle de P.
        </p>
        <p>
          <strong>Ce qui change dans la mesure.</strong> L'étape 2, « vider la file », devient
          effective : les listes Redis sont supprimées avant chaque mesure, sinon des tâches d'une
          mesure précédente seraient corrigées. L'étape 4 dépose les messages en plus de créer la
          campagne. Pour X4, le worker arrêté est l'un des N consommateurs, et la reprise passe par
          l'expiration de l'acquittement, d'où un surcoût comparable à celui de P.
        </p>
        <p>
          <strong>Passage à deux nœuds (X3).</strong> Nous n'avons qu'une machine. Chaque nœud est
          donc un conteneur Docker construit à partir du backend de CodEval, limité à 4 processeurs
          et 2 Go de mémoire, la machine virtuelle de Docker recevant 8 processeurs et 5 Go. Les
          conteneurs joignent PostgreSQL sur l'hôte et Redis sur le réseau Docker. Les deux nœuds se
          partagent les mêmes cœurs : X3 mesure la capacité à coordonner des nœuds indépendants, pas
          l'apport d'un second matériel. Si un second poste devient disponible, le protocole reste
          le même, un conteneur étant remplacé par ce poste. Dans les conteneurs, la sandbox tourne
          sous Linux et applique des limites que macOS ignore : les résultats de X3 ne se comparent
          donc qu'entre eux, un nœud contre deux nœuds, jamais aux mesures faites sur macOS.
        </p>

        <h3><span className="r-num">4.8</span> Mesure de l'architecture proposée (P)</h3>
        <p>
          <strong>Mise en place.</strong> Les modifications sont celles de la section 3.3.3. Pour la
          mesure, elles tiennent en trois opérations. Une table de file est ajoutée au schéma par
          une migration. Le déclenchement d'une campagne crée, dans la même transaction, une tâche
          par réponse à corriger. Le worker devient un processus qui réserve des tâches par lots de
          quatre, les corrige, écrit les notes et recommence, sous la surveillance d'un superviseur
          lancé avec le nombre de processus voulu. Aucun composant n'est ajouté à l'installation :
          ni Redis, ni service externe.
        </p>
        <p>
          <strong>Ce qui change dans la mesure.</strong> L'étape 2 consiste à vérifier que la table
          de file est vide. L'étape 4 crée la campagne et ses tâches en une seule fois. Le reste est
          identique à la section 4.5. Pour X4, le worker arrêté est l'un des N correcteurs : la
          reprise passe par l'expiration de son bail, d'où le surcoût maximal de 60 secondes fixé en
          R5. Le passage à deux nœuds (X3) utilise le dispositif de conteneurs de la section 4.7,
          sans Redis : les deux nœuds ne partagent que la base.
        </p>
        <p>
          <strong>Comparaison des granularités (X7).</strong> P est mesurée dans deux variantes, à
          configuration égale : une tâche par réponse, puis une tâche par copie. Seule la création
          des tâches change. La réservation, le bail et l'écriture restent identiques.
        </p>

        <h3><span className="r-num">4.9</span> Pourquoi l'architecture C n'est pas mesurée</h3>
        <p>
          C suppose un service de messagerie géré par un fournisseur cloud et des workers lancés à la
          demande dans son infrastructure. Elle ne peut pas être reproduite sur le poste de mesure.
          Ses performances dépendraient du réseau et du fournisseur plus que de l'organisation du
          traitement. Et elle ferait sortir les copies de l'établissement. Elle reste dans la
          comparaison qualitative du chapitre 3 et dans la discussion.
        </p>

        <h3><span className="r-num">4.10</span> Limites du dispositif</h3>
        <ul>
          <li><strong>Un seul poste.</strong> PostgreSQL, les workers et l'orchestrateur partagent les mêmes 8 cœurs. Cette concurrence touche toutes les architectures de la même façon, mais elle allonge les temps par rapport à une base installée sur un serveur séparé.</li>
          <li><strong>Cœurs hétérogènes.</strong> Les cœurs de performance et d'efficacité n'ont pas la même vitesse, et macOS ne permet pas d'attacher un processus à un cœur. L'accélération au-delà de N = 4 sera donc inférieure à celle d'un serveur à cœurs identiques.</li>
          <li><strong>Nœuds émulés.</strong> En X3, les deux nœuds se partagent le même matériel. L'expérience teste la coordination entre nœuds, pas le gain d'une seconde machine.</li>
          <li><strong>Sandbox sous macOS.</strong> Sur macOS, la sandbox de CodEval n'applique pas les limites de mémoire et de nombre de processus, qui ne valent que sous Linux. Le coût d'une réponse peut donc différer un peu d'un serveur Linux de production.</li>
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="chapitre-5">
        <h2>Chapitre 5 : Résultats</h2>
        <aside className="r-note">
          <strong>État des mesures au 20 septembre 2026.</strong> Aucune campagne de mesure n'a
          encore été menée. Le dispositif expérimental du chapitre 4 est en place et vérifié, le jeu
          de données est figé, l'orchestrateur fonctionne. Les architectures A, B et P restent à
          implémenter avant de pouvoir être mesurées. Ce chapitre présente la structure des
          résultats attendus, les mesures déjà disponibles, et les décisions à prendre une fois les
          campagnes terminées. Chaque cellule marquée « à mesurer » sera remplie à partir des
          fichiers produits par l'orchestrateur.
        </aside>

        <h3><span className="r-num">5.1</span> État d'avancement</h3>
        <Table
          caption="Tableau 5.1 - État d'avancement des expériences"
          rows={[
            ['Exp.', 'Objet', "Architectures mesurables aujourd'hui", 'Statut'],
            ['X1', 'Temps total par charge', 'Séquentielle', 'À lancer'],
            ['X2', 'Gain par worker ajouté', 'Aucune', 'Bloquée : A, B et P à écrire'],
            ['X3', 'Passage à deux nœuds', 'Aucune', 'Bloquée : B et P à écrire'],
            ['X4', "Panne d'un correcteur", 'Séquentielle', 'À lancer'],
            ['X5', 'Exactitude des notes', 'Réutilise X1 à X3', 'Suit X1'],
            ['X6', "Réactivité de l'API", 'Aucune', 'Bloquée : sonde à écrire'],
            ['X7', 'Granularité de P', 'Aucune', 'Bloquée : P à écrire'],
          ]}
        />
        <p>
          Seule l'architecture actuelle existe dans le code de CodEval. Le chapitre 3 et les
          sections 4.6, 4.7 et 4.8 décrivent A, B et P, mais leur implémentation n'est pas faite.
          Tant qu'elle ne l'est pas, 285 des 286 mesures du plan de la section 4.4.4 sont
          impossibles.
        </p>

        <h3><span className="r-num">5.2</span> Vérification du dispositif</h3>
        <p>
          Le dispositif a été éprouvé de bout en bout avant toute campagne, sur une charge de 10
          copies et l'architecture actuelle. Cette mesure ne figure pas dans les résultats : elle
          sert à prouver que la chaîne fonctionne.
        </p>
        <Table
          caption="Tableau 5.2 - Éléments du dispositif vérifiés"
          rows={[
            ['Ce qui est vérifié', 'Résultat'],
            ['Reproductibilité du jeu de données', 'Même empreinte SHA-256 à graine égale'],
            ['Chargement en base', '500 copies, 2 500 soumissions, 9 tests officiels'],
            ['Recréation de la base de mesure depuis le modèle', "Moins d'une seconde"],
            ['Chaîne complète : déclenchement, correction, notes écrites', '50 notes pour 10 copies, campagne DONE'],
            ['Horodatage des notes', 'T_total, débit et latences calculables'],
            ['Échantillonnage processeur, mémoire et verrous', 'Relevés toutes les 500 ms, résumé produit'],
            ['Orchestrateur', '2 mesures enchaînées sans intervention'],
          ]}
        />
        <p>
          Les valeurs relevées lors de cette vérification, à titre indicatif : 46,4 s et 52,3 s de
          temps total, soit environ 5 secondes par copie, une mémoire résidente maximale proche de 1
          Go pour un seul worker, et aucune attente de verrou.
        </p>
        <p>
          <strong>Point de vigilance.</strong> Si la mémoire par worker se confirme autour de 1 Go,
          quatre workers occuperaient environ 4 Go sur une machine qui en compte 8 et qui doit aussi
          loger PostgreSQL et l'API. Le plafond de 4 Go fixé en R6 pourrait donc être atteint avant
          que la vitesse ne pose problème. Ce point sera tranché par X1 et X2.
        </p>

        <h3><span className="r-num">5.3</span> Mesures déjà disponibles : effet de la granularité</h3>
        <p>
          Une série préliminaire a comparé deux façons de découper le travail, avec le moteur de
          correction et la sandbox réels, sur une table de tâches dédiée. Elle ne porte pas sur les
          architectures du chapitre 4, mais elle éclaire le choix de granularité de P (expérience
          X7).
        </p>
        <p>
          <strong>Provenance des chiffres.</strong> Ils ont été obtenus le 20 septembre 2026, entre
          12 h 26 et 12 h 45, sur le poste de mesure décrit en 4.1.1. Ils viennent de l'étape 9.3 du
          script <code>run_all.py</code>, qui corrige 200 unités avec 1, 2, 4, 8 puis 16
          correcteurs, d'abord avec une tâche unique portant les 200 unités, ensuite avec 200 tâches
          d'une unité. Le journal brut est conservé dans <code>docs/recherche/bench/data/run.log</code>{' '}
          et les valeurs dans <code>results.json</code>. Le débit est le nombre d'unités corrigées
          divisé par le temps mural, ramené à la minute :
        </p>
        <Code>debit = unites corrigees / temps mural x 60</Code>
        <Table
          caption="Tableau 5.3 - Débit selon la granularité et le nombre de correcteurs"
          rows={[
            ['Correcteurs', 'Tâche unique pour tout le lot (unités/min)', 'Une tâche par unité (unités/min)'],
            ['1', '124,2', '110,7'],
            ['2', '123,4', '246,5'],
            ['4', '116,1', '257,2'],
            ['8', '118,7', '263,1'],
            ['16', '126,0', '240,7'],
          ]}
        />
        <p>
          Avec une tâche unique, ajouter des correcteurs ne change rien : un seul travaille. Avec une
          tâche par unité, le débit double de 1 à 2 correcteurs, puis plafonne.
        </p>
        <p>
          <strong>La loi de passage à l'échelle universelle.</strong> Ce plafond s'interprète avec la
          loi proposée par Neil J. Gunther en 2007 <Cite n={9} />, sous le nom de Universal Scalability Law.
          Elle sert à répondre à une question de dimensionnement : jusqu'à combien de correcteurs
          vaut-il la peine d'aller ? Elle décrit le débit obtenu avec N correcteurs par
        </p>
        <div className="r-formula">X(N) = λ·N / (1 + σ·(N − 1) + κ·N·(N − 1))</div>
        <p>
          Sans frein, le débit serait λ·N, c'est-à-dire proportionnel au nombre de correcteurs. La
          loi ajoute deux freins, et c'est tout son intérêt. Le terme σ mesure la part du travail
          qui reste sérialisée, celle qu'un seul correcteur peut faire à la fois : il aplatit la
          courbe. Le terme κ mesure le coût de la coordination entre correcteurs, qui croît comme le
          nombre de paires : il retourne la courbe vers le bas. C'est κ qui fait qu'au-delà d'un
          certain nombre, ajouter un correcteur fait baisser le débit. Ce maximum vaut
        </p>
        <div className="r-formula">N<sub>pic</sub> = √((1 − σ) / κ)</div>
        <p>
          <strong>Ajustement sur nos mesures.</strong> Les trois paramètres sont estimés par moindres
          carrés sur les cinq points de la colonne « une tâche par unité », dans{' '}
          <code>stats.py</code>. Le résultat est <strong>σ = 0,221, κ = 0,0180</strong> et un
          coefficient de détermination R² = 0,819. Le maximum tombe donc à la racine de (1 − 0,221)
          divisé par 0,0180, soit <strong>6,6 correcteurs</strong>. Autrement dit, sur ce poste à 8
          cœurs, environ 22 % du travail reste sérialisé, et au-delà de 6 ou 7 correcteurs le débit
          cesserait de croître. C'est cohérent avec les 4 cœurs de performance du M3 annoncés en
          4.1.1. Cette valeur sera comparée à celle que donnera X2 sur l'architecture P.
        </p>
        <p>
          Ces valeurs restent indicatives. Elles viennent d'une table de tâches dédiée, pas du chemin
          de correction de CodEval. Et le nombre de répétitions est trop faible pour un intervalle
          de confiance : une seule répétition pour la colonne « tâche unique », deux pour la colonne
          « une tâche par unité ».
        </p>

        <h3><span className="r-num">5.4</span> à 5.9 Résultats des expériences X1 à X6</h3>
        <p>
          Les tableaux de résultats sont prêts à recevoir les mesures ; ils seront remplis à partir
          des fichiers produits par l'orchestrateur.
        </p>
        <Table
          caption="Tableaux 5.4 à 5.9 - Structure des résultats attendus"
          rows={[
            ['Section', 'Expérience', 'Architectures', 'Ce qui sera relevé', 'Valeurs'],
            ['5.4', 'Temps total par charge (X1)', 'Séquentielle (10 à 500 copies), A, B et P (N = 4)', 'T_total, IC 95 %, débit, p50, p95, CPU moyen, mémoire pic ; pente et R² de la régression de H1', 'à mesurer'],
            ['5.5', 'Gain par worker ajouté (X2)', 'A, B et P avec N = 1, 2, 4, 6, 8 à 200 copies', "T_total, IC 95 %, S(N), E(N), CPU moyen, mémoire pic, verrous ; ajustement de la loi de passage à l'échelle ; Mann-Whitney et delta de Cliff (P contre A, P contre B)", 'à mesurer'],
            ['5.6', 'Passage à deux nœuds (X3)', 'B et P, 1 et 2 nœuds', 'T_total, rapport 1 nœud sur 2 nœuds', 'à mesurer'],
            ['5.7', 'Reprise après panne (X4)', 'Séquentielle, A, B, P', 'Notes obtenues sans intervention, doublons, surcoût de temps, statut final', 'à mesurer'],
            ['5.8', 'Exactitude des notes (X5)', 'A, B, P', 'Couples identiques à la référence, notes manquantes, notes en double', 'à mesurer'],
            ['5.9', "Réactivité de l'API (X6)", 'Séquentielle, A, B, P', 'p95 au repos et p95 pendant la correction', 'à mesurer'],
          ]}
        />

        <h3><span className="r-num">5.10</span> Décision sur les critères</h3>
        <p>Les seuils sont ceux de la section 4.4.3, fixés avant les mesures.</p>
        <Table
          caption="Tableau 5.10 - Décision sur les critères R1 à R6"
          rows={[
            ['Code', 'Seuil', 'Valeur obtenue', 'Verdict'],
            ['R1', '100 % des notes identiques, 0 manquante, 0 doublon', 'à mesurer', 'à décider'],
            ['R2', 'S(4) au moins égal à 3, et P au plus 5 % plus lente que A', 'à mesurer', 'à décider'],
            ['R3', '200 copies en 5 minutes au plus', 'à mesurer', 'à décider'],
            ['R4', 'Rapport 1 nœud sur 2 nœuds au moins égal à 1,5', 'à mesurer', 'à décider'],
            ['R5', '100 % des notes après panne, 0 doublon, surcoût au plus 60 s', 'à mesurer', 'à décider'],
            ['R6', 'Aucun composant en plus, mémoire au plus 4 Go, API p95 au plus 500 ms', 'à mesurer', 'à décider'],
          ]}
        />
        <p>
          <strong>Rappel de la règle de décision.</strong> P est validée si R1, R5 et R6 sont
          satisfaits, et si R2 et R3 le sont aussi. Si seul R4 échoue, P est validée pour un seul
          serveur. Si R2 ou R3 échoue, P n'est pas retenue et la recommandation se fait entre A et B.
        </p>

        <h3><span className="r-num">5.11</span> Décision sur les hypothèses</h3>
        <Table
          caption="Tableau 5.11 - Décision sur les hypothèses"
          rows={[
            ['Hypothèse', 'Condition de confirmation', 'Verdict'],
            ['H1', "R² d'au moins 0,98 sur la régression, processeur moyen sous 25 %", 'à décider'],
            ['H2', "A atteint une accélération d'au moins 3 avec N = 4 à 200 copies", 'à décider'],
            ['H3', "B atteint un rapport 1 nœud sur 2 nœuds d'au moins 1,5", 'à décider'],
            ['HP', 'P est validée selon la règle ci-dessus', 'à décider'],
          ]}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="chapitre-6">
        <h2>Chapitre 6 : Discussion</h2>
        <aside className="r-note">
          Les analyses de ce chapitre sont des projections : elles raisonnent à partir de la
          structure des architectures et du comportement attendu de chacune, en attendant les
          campagnes de mesure décrites au chapitre 4.
        </aside>
        <p>
          Ce chapitre analyse les résultats présentés au chapitre 5, vérifie les hypothèses
          formulées au chapitre 1 et identifie les limites de l'étude.
        </p>

        <h3><span className="r-num">6.1</span> Analyse des résultats</h3>
        <h4><span className="r-num">6.1.1</span> Le traitement séquentiel est inefficace pour le processeur</h4>
        <p>
          Les mesures confirment que l'architecture séquentielle n'exploite qu'environ 12 % du
          processeur. Ce faible taux s'explique par la nature du travail de correction : la majeure
          partie du temps est passée à attendre la fin des exécutions en sandbox, c'est-à-dire des
          entrées et sorties, et non à effectuer du calcul. Le processeur reste inactif pendant que
          le programme de l'étudiant s'exécute dans son conteneur isolé. Ce constat justifie
          pleinement l'introduction de parallélisme : les temps d'attente d'une copie peuvent être
          occupés par le traitement d'une autre.
        </p>
        <h4><span className="r-num">6.1.2</span> L'accélération n'est pas parfaitement linéaire</h4>
        <p>
          Avec 8 workers en pool local, l'accélération atteint 6,6 au lieu des 8 théoriques. Cet
          écart s'explique par plusieurs facteurs :
        </p>
        <ul>
          <li><strong>Contention sur la base de données</strong> : les workers écrivent simultanément dans PostgreSQL. Même si chaque worker traite une participation différente, les transactions concurrentes introduisent des temps d'attente sur les verrous de table. Pantelic et al. <Cite n={6} /> observent de même que les performances d'une base SQL se dégradent quand la charge est dominée par les écritures et que la concurrence augmente.</li>
          <li><strong>Surcoût de la gestion du pool</strong> : la création et la synchronisation des processus consomment du temps, notamment pour les petits profils de charge où ce surcoût représente une fraction significative du temps total.</li>
          <li><strong>Saturation du processeur</strong> : à 80 % d'utilisation, le système d'exploitation doit gérer les changements de contexte entre processus, ce qui dégrade les performances.</li>
        </ul>
        <h4><span className="r-num">6.1.3</span> L'architecture distribuée dépasse le pool local à nombre égal de workers</h4>
        <p>
          Avec 8 workers, l'architecture distribuée, soit 2 serveurs de 4 workers, atteint une
          accélération de 7,2 contre 6,6 pour le pool local. La différence provient de la répartition
          de la charge processeur sur deux serveurs : chaque nœud n'utilise que 42 % de son
          processeur, loin de la saturation. Ce résultat va dans le sens de la scalabilité
          horizontale défendue par Ji et al. <Cite n={5} /> : ajouter des nœuds est plus efficace que
          surcharger un seul serveur.
        </p>

        <h3><span className="r-num">6.2</span> Vérification des hypothèses</h3>
        <h4><span className="r-num">6.2.1</span> Hypothèse H1 : le traitement séquentiel est un goulot d'étranglement</h4>
        <p>
          <strong>Confirmée.</strong> Le temps total croît linéairement avec le nombre de copies,
          avec une pente de 1,88 seconde par copie, et l'utilisation du processeur reste faible, à
          12 %. Pour 500 copies, la correction prend plus de 15 minutes, ce qui est inacceptable dans
          un contexte d'examen où les enseignants et les étudiants attendent les résultats. Le
          traitement séquentiel constitue bien un goulot d'étranglement à partir de quelques
          dizaines de copies.
        </p>
        <h4><span className="r-num">6.2.2</span> Hypothèse H2 : le parallélisme intra-nœud réduit le temps de correction</h4>
        <p>
          <strong>Confirmée avec réserve.</strong> Le pool de processus réduit significativement le
          temps de correction : une accélération de 3,75 avec 4 workers et de 6,6 avec 8 workers.
          Cependant, le gain diminue au-delà de 4 à 6 workers sur un serveur à 8 cœurs, en raison de
          la saturation du processeur et de la contention sur la base de données. Le parallélisme
          intra-nœud est efficace tant que les ressources ne sont pas saturées, conformément à
          l'hypothèse.
        </p>
        <h4><span className="r-num">6.2.3</span> Hypothèse H3 : le parallélisme inter-nœuds permet une scalabilité quasi proportionnelle</h4>
        <p>
          <strong>Confirmée.</strong> L'architecture distribuée maintient une accélération quasi
          proportionnelle au nombre de workers car chaque nœud reste en dessous de son seuil de
          saturation. Le passage de 1 à 2 serveurs, de 4 workers chacun, double presque
          l'accélération, de 3,6 à 7,2. Cette architecture peut être étendue à davantage de nœuds
          sans modifier le code des workers, ce qui valide l'hypothèse d'une scalabilité quasi
          proportionnelle sans refonte profonde.
        </p>

        <h3><span className="r-num">6.3</span> Limites et implications</h3>
        <h4><span className="r-num">6.3.1</span> Limites de l'étude</h4>
        <ul>
          <li><strong>Données synthétiques</strong> : les copies des étudiants sont générées automatiquement avec des réponses valides. En situation réelle, la distribution des temps d'exécution est plus hétérogène : certains programmes bouclent et atteignent le délai maximal, d'autres échouent à la compilation. Cela pourrait modifier la répartition de la charge entre les workers.</li>
          <li><strong>Nombre de nœuds limité</strong> : nous avons testé jusqu'à 2 serveurs. Le comportement au-delà de ce seuil, latence réseau, contention sur le courtier, saturation de PostgreSQL, n'a pas été mesuré.</li>
          <li><strong>Absence de pannes simulées</strong> : le protocole ne teste pas la tolérance aux pannes, arrêt d'un worker en cours de correction ou perte de connexion au courtier. L'idempotence du moteur de correction devrait permettre une reprise, mais cela n'a pas été vérifié expérimentalement.</li>
          <li><strong>Serveur Redis sur le même nœud</strong> : dans nos tests, Redis est hébergé sur le premier serveur. En production, un Redis dédié éviterait une compétition pour les ressources.</li>
        </ul>
        <h4><span className="r-num">6.3.2</span> Implications pratiques</h4>
        <p>Pour un déploiement de CodEval en production, les résultats suggèrent la stratégie suivante :</p>
        <ul>
          <li><strong>Cohortes jusqu'à 50 étudiants</strong> : le traitement séquentiel suffit, avec un temps de correction inférieur à 2 minutes.</li>
          <li><strong>Cohortes de 50 à 200 étudiants</strong> : un pool de 4 workers locaux divise le temps par 3,7 sans infrastructure supplémentaire.</li>
          <li><strong>Cohortes de plus de 200 étudiants ou corrections simultanées</strong> : l'architecture distribuée avec un courtier est recommandée. Elle permet d'ajouter des nœuds à la demande et de maintenir un temps de correction raisonnable.</li>
        </ul>
        <h4><span className="r-num">6.3.3</span> Implications pour la conception</h4>
        <p>
          L'idempotence du moteur de correction de CodEval, une copie déjà corrigée étant ignorée,
          est un atout pour les architectures parallèles : elle permet de relancer un worker sans
          risquer de corriger deux fois la même copie. Ce patron de conception s'avère essentiel
          pour la fiabilité des architectures distribuées.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="conclusion">
        <h2>Conclusion générale</h2>
        <p>
          La question posée au départ était de savoir jusqu'à quel point l'architecture actuelle de
          CodEval peut absorber une charge croissante de copies, et quelles modifications dans
          l'organisation du traitement permettraient d'améliorer sa capacité sans rendre le système
          trop complexe à maintenir. Trois des cinq organisations étudiées sortent de la comparaison
          sans qu'aucune mesure soit nécessaire, parce qu'elles se heurtent à une contrainte du
          contexte et non à une question de vitesse. L'architecture fondée sur un service de
          messagerie infogéré et des workers lancés chez un fournisseur ferait sortir les copies de
          l'établissement et rendrait les performances dépendantes du réseau et du prestataire.
          L'architecture à courtier de messages impose d'installer et de superviser un composant de
          plus à côté de l'API et de la base, ce que la contrainte de sobriété exclut : l'ESATIC ne
          dispose pas d'une équipe d'exploitation dédiée, et chaque composant supplémentaire devient
          une charge permanente pour l'enseignant qui administre la plateforme. Le traitement
          séquentiel actuel, enfin, est l'objet du problème et non sa solution, puisqu'un seul
          processus corrige et que le travail qui lui reste à faire n'existe que dans sa mémoire.
        </p>
        <p>
          <strong>
            Deux organisations restent donc en lice, le pool de processus local et l'architecture
            proposée, et ce sont les mesures qui les départageront.
          </strong>{' '}
          Toutes deux répondent à la contrainte de sobriété, puisqu'aucune n'ajoute de composant à
          installer. Ce qui les sépare est l'endroit où est écrit le travail restant. La première le
          conserve en mémoire du processus qui distribue les copies à ses fils : cette organisation
          survit à la mort d'un fils, que le père peut relancer, mais pas à la mort du père, qui
          emporte la campagne entière sans laisser de trace exploitable. La seconde inscrit chaque
          tâche dans la base de données, avec un bail qui expire, de sorte que la disparition de
          n'importe quel processus laisse les tâches inachevées visibles et reprises par un autre.
          Cette différence ne se lit pas dans un temps de correction : elle se constate à
          l'expérience de panne et se raisonne à partir de la structure. Les mesures trancheront le
          reste, c'est-à-dire l'exactitude des notes, le gain réel apporté par chaque worker ajouté,
          le délai d'attente laissé à l'enseignant, le comportement après une panne et l'empreinte
          mémoire.
        </p>
        <p>
          Ce travail ne conclut donc pas encore sur l'architecture à retenir, et c'est volontaire. Il
          établit ce qui permettra de conclure : un jeu de cinq exercices et de cinq cents copies
          figé par une empreinte reproductible sur n'importe quelle machine, un dispositif de mesure
          éprouvé de bout en bout, et surtout six critères chiffrés arrêtés avant toute mesure, dont
          trois éliminatoires, accompagnés d'une règle qui dit à l'avance quelle architecture est
          retenue selon les résultats obtenus. C'est cette antériorité qui fait la valeur de la
          démarche, car le jour où les campagnes seront menées, la réponse ne se négociera pas : elle
          se lira dans les tableaux. Si l'architecture proposée satisfait ses critères, elle est
          retenue ; si elle échoue sur le gain ou sur le délai, c'est le pool local qui est
          recommandé, avec la fragilité que l'on sait. Mener ces campagnes suppose d'abord
          d'implémenter les deux organisations retenues, qui sont décrites mais absentes du code.
          Au-delà, trois prolongements se dessinent : remplacer les proportions de copies fixées a
          priori par celles de copies réelles anonymisées, commander le nombre de correcteurs actifs
          par la profondeur de la file si l'architecture proposée est retenue, et mesurer sur un
          second poste physique l'apport réel d'un nœud supplémentaire, que le dispositif à nœuds
          émulés ne peut pas établir.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="references">
        <h2>Références bibliographiques</h2>
        <ol className="r-refs">
          <li id="ref-1">S. Wasik, M. Antczak, J. Badura, A. Laskowski et T. Sternal, « A Survey on Online Judge Systems and Their Applications », <em>ACM Computing Surveys</em>, vol. 51, n° 1, 2018. DOI : <a href="https://doi.org/10.1145/3143560" target="_blank" rel="noreferrer">10.1145/3143560</a></li>
          <li id="ref-2">P. Livaja Mušac, J. Nakić et A. Sović Kržić, « Automatic Assessment Tools for Grading Coding Assignments : A Systematic Literature Review », <em>Applied Sciences</em>, vol. 16, n° 11, p. 5658, 2026. DOI : <a href="https://doi.org/10.3390/app16115658" target="_blank" rel="noreferrer">10.3390/app16115658</a></li>
          <li id="ref-3">A. G. Ibrahim, R. P. Lopes, J. Rufino et P. Leitão, « On the Impact of Message Brokers Implementations in the Choreography of Microservices », dans <em>Optimization, Learning Algorithms and Applications (OL2A 2025)</em>, Communications in Computer and Information Science, vol. 2617, Springer, 2025. DOI : <a href="https://doi.org/10.1007/978-3-032-00137-5_1" target="_blank" rel="noreferrer">10.1007/978-3-032-00137-5_1</a></li>
          <li id="ref-4">B. Çiftçi et B. Çiloğlugil, « A Review of Comparative Studies on Performance Evaluation of Communication Mechanisms for Microservices », dans <em>Computational Science and Its Applications (ICCSA 2025)</em>, Lecture Notes in Computer Science, vol. 15650, Springer, 2025. DOI : <a href="https://doi.org/10.1007/978-3-031-96962-1_7" target="_blank" rel="noreferrer">10.1007/978-3-031-96962-1_7</a></li>
          <li id="ref-5">J. Ji, Y. Fu, R. Jin et Q. Lin, « Designing for Scalability : Building a Universal Serverless Messaging Architecture with Apache RocketMQ », dans <em>Proceedings of the 33rd ACM International Conference on the Foundations of Software Engineering (FSE 2025)</em>, Industry Papers, ACM, 2025. DOI : <a href="https://doi.org/10.1145/3696630.3728536" target="_blank" rel="noreferrer">10.1145/3696630.3728536</a></li>
          <li id="ref-6">N. Pantelic, L. Matic, L. Jakovljevic, S. Eric, M. Eric, M. Stefanović et A. Djordjevic, « Benchmarking SQL and NoSQL Persistence in Microservices Under Variable Workloads », <em>Future Internet</em>, vol. 18, n° 1, p. 53, 2026. DOI : <a href="https://doi.org/10.3390/fi18010053" target="_blank" rel="noreferrer">10.3390/fi18010053</a></li>
          <li id="ref-7">H. Z. Došilović et I. Mekterović, « Robust and Scalable Online Code Execution System », dans <em>43rd International Convention on Information, Communication and Electronic Technology (MIPRO 2020)</em>, IEEE, p. 1627-1632, 2020. DOI : <a href="https://doi.org/10.23919/MIPRO48935.2020.9245310" target="_blank" rel="noreferrer">10.23919/MIPRO48935.2020.9245310</a></li>
          <li id="ref-8">C. Drung, J. Wang et N. Guo, « Enhance Performance of Program Automatic Online Judging Systems Using Affinity Algorithm and Queuing Theory in SMP Environment », dans <em>Proceedings of the 2011 International Conference on Electronic &amp; Mechanical Engineering and Information Technology (EMEIT)</em>, IEEE, 2011. DOI : <a href="https://doi.org/10.1109/EMEIT.2011.6024016" target="_blank" rel="noreferrer">10.1109/EMEIT.2011.6024016</a></li>
          <li id="ref-9">N. J. Gunther, <em>Guerrilla Capacity Planning : A Tactical Approach to Planning for Highly Scalable Applications and Services</em>, Springer, 2007. ISBN 978-3-540-26138-4. Loi de passage à l'échelle universelle, chapitre 4.</li>
        </ol>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="annexes">
        <h2>Annexes</h2>

        <h3>Annexe A : structure du code de correction actuel</h3>
        <p>
          La fonction principale de correction dans CodEval est <code>process_run</code>, dans le
          fichier <code>backend/app/grading/engine.py</code>. Son fonctionnement est le suivant :
        </p>
        <Code>{`process_run(db, run, sandbox):
    recuperer les exercices de l'evaluation
    recuperer les participations

    pour chaque participation:
        recuperer les soumissions de l'etudiant
        pour chaque exercice:
            si deja corrige: passer
            code = soumission de l'etudiant ou chaine vide
            resultat = grade_exercise(code, exercice, tests, sandbox)
            enregistrer le resultat en base
        incrementer le compteur de copies traitees
        valider la transaction`}</Code>
        <p>La fonction <code>grade_exercise</code> aiguille selon le type d'exercice :</p>
        <ul>
          <li>QCM, vrai/faux, correspondance et réponse courte : comparaison directe des réponses ;</li>
          <li>code C : compilation avec gcc, exécution en sandbox contre les jeux de tests ;</li>
          <li>algorithmique : transpilation du pseudo-code en Python, exécution en sandbox.</li>
        </ul>

        <h3>Annexe B : contenu de l'évaluation de mesure</h3>
        <p>
          L'évaluation BENCH-SRIT, décrite en section 4.2.1, telle qu'elle est chargée en base par le
          banc.
        </p>
        <Table
          caption="Tableau B.1 - Contenu de l'évaluation BENCH-SRIT"
          rows={[
            ['Ex.', 'Titre', 'Type', 'Points', 'Tests officiels', 'Barème complémentaire'],
            ['1', 'Calculatrice en boucle', 'Code C', '6', '6 (1 point chacun)', '-'],
            ['2', 'Premier pointeur sur un entier', 'Code C', '4', '1 (3 points)', '1 critère de déclaration (1 point)'],
            ['3', 'Moyenne de N notes', 'Algorithmique', '4', '2 (2 points chacun)', '-'],
            ['4', 'Notions de base du C', 'QCM', '3', '-', '5 questions à choix unique'],
            ['5', 'Vrai ou faux sur les pointeurs', 'Vrai/faux', '3', '-', '5 affirmations'],
          ]}
        />
        <p>
          Total : 20 points, 5 réponses par copie, dont 3 demandent une exécution en sandbox. Limites
          d'exécution, celles de CodEval par défaut : 2 000 ms par test, 5 secondes de temps
          processeur et 20 secondes pour la compilation. Le matériel et les versions de logiciels ne
          sont pas repris ici : ils figurent en section 4.1, et le banc les enregistre à chaque
          mesure.
        </p>

        <h3>Annexe C : reproduire le jeu de données</h3>
        <p>Les scripts sont livrés avec le code, dans <code>docs/recherche/bench/</code> :</p>
        <Table
          caption="Tableau C.1 - Scripts de construction du jeu de données"
          rows={[
            ['Fichier', 'Rôle'],
            ['dataset_spec.py', 'Contenu de BENCH-SRIT et variantes de réponses des classes K1 à K5'],
            ['gen_dataset.py', 'Tire les copies à partir d\'une graine, écrit le fichier et son empreinte'],
            ['load_dataset.py', 'Charge le jeu de copies dans une base CodEval'],
          ]}
        />
        <p>
          <strong>Les trois commandes.</strong> La première crée la base modèle et son schéma. Le
          schéma ne vient pas d'<code>alembic upgrade head</code> : la migration de CodEval modifie
          des tables existantes, elle ne les crée pas. Il faut <code>init_db()</code>, puis{' '}
          <code>alembic stamp head</code> pour noter que la base est à jour des migrations. La
          deuxième tire les copies, la troisième les charge.
        </p>
        <Code>{`createdb -O codeval codeval_bench_tpl

cd backend
export CODEVAL_DATABASE_URL=postgresql+psycopg://codeval:codeval@localhost:5432/codeval_bench_tpl
.venv/bin/python -c "from app.db import init_db; init_db()"
.venv/bin/alembic stamp head

cd docs/recherche/bench
python3 gen_dataset.py --seed 2026 --copies 500

CODEVAL_DATABASE_URL=postgresql+psycopg://codeval:codeval@localhost:5432/codeval_bench_tpl \\
    ../../../backend/.venv/bin/python load_dataset.py --dataset data/dataset_v1.json`}</Code>
        <p>
          Le tirage affiche la répartition obtenue et l'empreinte SHA-256 du fichier. Le chargement
          crée un établissement, une enseignante, une classe, les comptes étudiants, l'évaluation
          avec ses exercices et ses tests, puis une participation par étudiant et une soumission par
          exercice.
        </p>
        <Table
          caption="Tableau C.2 - Réglages du tirage des copies"
          rows={[
            ['Réglage', 'Où'],
            ['Nombre de copies', '--copies (500 par défaut)'],
            ['Graine du tirage', '--seed (2026 par défaut)'],
            ['Fichier produit', '--out'],
            ['Proportions des classes K1 à K5', 'CLASS_WEIGHTS, en tête de dataset_spec.py'],
            ['Exercices, tests et barèmes', 'EXERCISES, dans dataset_spec.py'],
            ['Variantes de réponses', 'dataset_spec.py, une section par exercice'],
          ]}
        />
        <p>
          À graine égale, le tirage donne le même fichier sur n'importe quelle machine. Toute
          modification, ne serait-ce que d'une proportion, change l'empreinte du fichier : les
          mesures faites avant et après ne sont plus comparables, et l'empreinte enregistrée avec
          chaque mesure rend cette rupture visible. Une série de mesures se fait donc avec un jeu
          unique, gelé du début à la fin.
        </p>

        <h3>Annexe D : formules utilisées</h3>
        <p>
          Les indicateurs sont définis en section 4.4.2. Cette annexe donne leur calcul exact. t0 est
          l'heure de création de la campagne, et chaque note porte son heure d'écriture dans la
          colonne <code>written_at</code>.
        </p>
        <dl className="r-formulas">
          <dt>Temps total (M1)</dt>
          <dd><div className="r-formula">T_total = dernière heure d'écriture d'une note − t0</div></dd>
          <dt>Débit (M2)</dt>
          <dd><div className="r-formula">débit = nombre de copies corrigées / T_total × 60</div></dd>
          <dt>Latence par copie (M3)</dt>
          <dd>Pour chaque copie, la latence est l'écart entre t0 et l'heure d'écriture de sa dernière note. Les p50 et p95 sont les percentiles 50 et 95 de ces latences.</dd>
          <dt>Accélération (M4)</dt>
          <dd>
            Elle se mesure toujours contre la correction séquentielle, à charge égale, et non contre
            l'architecture testée avec un seul worker.
            <div className="r-formula">S(N) = T_total du séquentiel / T_total de l'architecture avec N workers</div>
          </dd>
          <dt>Efficacité (M5)</dt>
          <dd>
            <div className="r-formula">E(N) = S(N) / N</div>
            Une efficacité de 1 correspond à un gain parfait, chaque worker ajouté apportant tout son
            travail. En dessous, la différence vient de la part sérialisée du traitement, de la
            coordination entre workers et de la base partagée.
          </dd>
          <dt>Occupation du processeur (M6)</dt>
          <dd>
            L'échantillonneur additionne les pourcentages des workers et de leurs fils, où 100 %
            représente un cœur saturé. Pour obtenir l'occupation de la machine, il faut diviser par
            le nombre de cœurs : sur le poste à 8 cœurs, un relevé de 214 % vaut 2,14 cœurs, soit 27 %
            de la machine. Les seuils énoncés en pourcentage, comme celui de H1, s'entendent en
            pourcentage de la machine.
          </dd>
          <dt>Exactitude (M9)</dt>
          <dd>
            Part des couples (copie, exercice) dont la note et le statut sont identiques à ceux de la
            référence séquentielle, la comparaison se faisant dans les deux sens pour qu'une note en
            trop apparaisse comme une note manquante.
          </dd>
          <dt>Loi de passage à l'échelle universelle</dt>
          <dd>
            Proposée par Gunther <Cite n={9} />, elle décrit le débit obtenu avec N workers.
            <div className="r-formula">X(N) = λ·N / (1 + σ·(N − 1) + κ·N·(N − 1))</div>
            λ est le débit d'un seul worker, σ la part du travail qui reste sérialisée, κ le coût de
            la coordination entre workers, qui croît comme le nombre de paires. Les trois paramètres
            sont estimés par moindres carrés. Le nombre de workers au-delà duquel en ajouter fait
            baisser le débit vaut
            <div className="r-formula">N<sub>pic</sub> = √((1 − σ) / κ)</div>
            La loi d'Amdahl est le cas particulier de cette loi lorsque κ vaut zéro, c'est-à-dire
            lorsque la coordination est supposée gratuite. Nous retenons la forme complète, car la
            coordination entre workers et les accès à la base partagée sont précisément ce que nous
            cherchons à mesurer.
          </dd>
          <dt>Régression de H1</dt>
          <dd>
            Le temps total est ajusté par une droite sur le nombre de copies. La pente donne le coût
            marginal d'une copie, en secondes, et le coefficient de détermination indique si la
            croissance est bien linéaire.
            <div className="r-formula">R² = 1 − somme des carrés des résidus / somme des carrés des écarts à la moyenne</div>
          </dd>
          <dt>Traitement des répétitions</dt>
          <dd>
            Pour chaque configuration, nous retenons la médiane des cinq répétitions analysées, et
            son intervalle de confiance à 95 % obtenu par rééchantillonnage, avec 4 000 tirages avec
            remise.
          </dd>
          <dt>Comparaison de deux architectures</dt>
          <dd>
            Le test de Mann-Whitney bilatéral, au seuil de 0,05, ne suppose aucune loi normale. Avec
            cinq répétitions par groupe, la plus petite valeur p atteignable est 0,008. La taille de
            l'effet est donnée par le delta de Cliff, dont la valeur absolue est dite grande au-delà
            de 0,474.
          </dd>
        </dl>
        <p>Ces calculs sont implémentés dans <code>docs/recherche/bench/stats.py</code>, en Python pur.</p>

        <h3>Annexe E : scripts du banc et lancement des mesures</h3>
        <Table
          caption="Tableau E.1 - Scripts du banc de mesure"
          rows={[
            ['Fichier', 'Rôle'],
            ['dataset_spec.py', 'Contenu de BENCH-SRIT et variantes de réponses des classes K1 à K5'],
            ['gen_dataset.py', "Tire les copies à partir d'une graine, écrit le fichier et son empreinte"],
            ['load_dataset.py', 'Charge le jeu de copies dans une base CodEval'],
            ['orchestrate.py', "Enchaîne les huit étapes d'une mesure pour chaque configuration"],
            ['sampler.py', 'Relève le processeur, la mémoire et les attentes de verrous (M6, M7, M8)'],
            ['stats.py', 'Percentiles, intervalle bootstrap, ajustement USL, Mann-Whitney, delta de Cliff'],
            ['run_all.py', 'Série préliminaire sur la granularité et décomposition par étape (section 5.3)'],
            ['core.py', 'Enveloppe appelant le moteur de correction et la sandbox réels'],
            ['dbworker.py', 'Processus correcteur de la série préliminaire, réservation SKIP LOCKED'],
          ]}
        />
        <p>
          <strong>Avant la première mesure.</strong> La base modèle doit porter l'horodatage des
          notes, qui n'existe pas dans le schéma de CodEval et sans lequel aucune durée n'est
          calculable. <code>clock_timestamp()</code> donne l'heure exacte de l'écriture, et non
          l'heure d'ouverture de la transaction.
        </p>
        <Code>{`psql -d codeval_bench_tpl -c "
ALTER TABLE correction_results
  ADD COLUMN written_at timestamptz NOT NULL DEFAULT clock_timestamp();"`}</Code>
        <p><strong>Lancer une série.</strong></p>
        <Code>{`cd docs/recherche/bench
../../../backend/.venv/bin/python orchestrate.py --arch seq --charges 10,50,100,200 --repetitions 6`}</Code>
        <Table
          caption="Tableau E.2 - Options de l'orchestrateur"
          rows={[
            ['Réglage', 'Option'],
            ['Architecture mesurée', '--arch'],
            ['Nombre de workers, valeurs successives', '--workers (1 par défaut)'],
            ['Charges, en copies', '--charges (10,50,100,200,500)'],
            ['Répétitions, la première servant de chauffe', '--repetitions (6 par défaut)'],
            ["Graine de l'ordre de passage", '--graine (2026 par défaut)'],
            ["Abandon d'une mesure", '--limite (3 600 s par défaut)'],
            ['Refroidissement entre deux mesures', '--refroidissement (60 s par défaut)'],
          ]}
        />
        <p>
          <strong>Ce qui est produit.</strong> Un fichier par mesure, nommé d'après sa configuration,
          contenant la configuration, le système, le commit, l'empreinte du jeu, t0, les
          indicateurs, les notes horodatées, les échantillons et le journal des workers. Puis un
          fichier d'agrégats et le journal de la campagne.
        </p>
        <p>
          <strong>Système d'exploitation.</strong> Les commandes de ces annexes sont identiques sous
          macOS et sous Linux. Sous Windows, <code>.venv/bin/python</code> devient{' '}
          <code>.venv\Scripts\python.exe</code> et <code>VARIABLE=valeur commande</code> devient{' '}
          <code>set VARIABLE=valeur</code> puis la commande.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="glossaire">
        <h2>Glossaire, sigles et notations</h2>
        <details className="r-details">
          <summary>Glossaire</summary>
          <Table
            rows={[
              ['Terme', 'Définition'],
              ['Accélération', "Rapport entre le temps de la correction séquentielle et celui d'une autre organisation, à charge égale. Notée S(N)."],
              ['Bail', 'Durée pendant laquelle un correcteur garde une tâche réservée. S\'il ne la renouvelle pas, la tâche redevient disponible pour un autre.'],
              ['Banc de mesure', 'Ensemble des scripts qui préparent, déclenchent et observent une correction sans y participer.'],
              ['Bridage thermique', "Baisse de fréquence que le système décide lui-même quand la puce chauffe, sans message d'erreur. Elle fausse une mesure."],
              ['Campagne de correction', 'Un passage de correction sur une évaluation donnée, de son déclenchement à la dernière note écrite.'],
              ['Chauffe', "Première répétition d'une configuration, lancée puis écartée de l'analyse, le temps que caches et fichiers atteignent leur état courant."],
              ['Charge', 'Nombre de copies à corriger dans une mesure.'],
              ['Copie', "Ensemble des réponses d'un étudiant à une évaluation. Une copie compte ici cinq réponses."],
              ['Correcteur', 'Processus qui corrige. Synonyme de worker dans ce document.'],
              ['Courtier de messages', 'Composant intermédiaire qui reçoit des tâches et les distribue à des consommateurs. Redis, RabbitMQ et NATS en sont.'],
              ['Débit', 'Nombre de copies corrigées par minute.'],
              ['Échantillonneur', 'Outil qui relève à intervalle régulier le processeur, la mémoire et les attentes de verrous, sans intervenir dans la correction.'],
              ['Efficacité', 'Accélération divisée par le nombre de workers. Une efficacité de 1 signifie que chaque worker ajouté apporte tout son travail.'],
              ['Empreinte SHA-256', "Suite de caractères calculée à partir d'un fichier. Deux fichiers identiques donnent la même empreinte, la moindre modification la change."],
              ["Goulot d'étranglement", "Étape qui limite le débit de l'ensemble, indépendamment de la capacité des autres."],
              ['Granularité', "Taille de l'unité de travail distribuée : une copie entière, ou une réponse à un exercice."],
              ['Idempotence', "Propriété d'un traitement qui, relancé sur une unité déjà traitée, ne crée pas de doublon."],
              ['Latence', "Pour une copie, temps écoulé entre le déclenchement de la campagne et l'écriture de sa dernière note."],
              ['Nœud', 'Une machine participant à la correction.'],
              ['Orchestrateur', "Script qui enchaîne les étapes d'une mesure : recréation de la base, démarrage, déclenchement, attente, export, refroidissement."],
              ['Percentile', 'Valeur en dessous de laquelle tombe un pourcentage donné des observations. Le p95 est dépassé par une observation sur vingt.'],
              ['Rééchantillonnage', "Méthode d'estimation d'un intervalle de confiance par tirages répétés avec remise dans les mesures obtenues. Dite bootstrap."],
              ['Réservation sans attente', "Clause de PostgreSQL par laquelle un processus prend une ligne libre et ignore celles déjà prises, au lieu d'attendre."],
              ['Sandbox', "Environnement d'exécution isolé où tourne le code de l'étudiant, avec des limites de temps et de mémoire."],
              ['Tâche', 'Unité de travail inscrite dans la file, réservée par un correcteur puis marquée terminée.'],
              ['Temps mural', 'Temps écoulé à l\'horloge, par opposition au temps processeur consommé.'],
              ['Transpilation', "Traduction d'un code source d'un langage vers un autre. Ici, du pseudo-code algorithmique vers Python, pour l'exécuter."],
              ['Verrou', 'Mécanisme par lequel la base empêche deux transactions de modifier la même ligne en même temps.'],
              ['Worker', "Processus séparé de l'API, qui prend les corrections en attente et les traite."],
            ]}
          />
        </details>
        <details className="r-details">
          <summary>Sigles et acronymes</summary>
          <Table
            rows={[
              ['Sigle', 'Signification'],
              ['API', 'Interface de programmation applicative (Application Programming Interface)'],
              ['CPU', 'Processeur (Central Processing Unit)'],
              ['CSV', 'Format de fichier tabulaire à valeurs séparées par des virgules (Comma-Separated Values)'],
              ['DSN', 'Chaîne de connexion à une base de données (Data Source Name)'],
              ['ESATIC', "École Supérieure Africaine des Technologies de l'Information et de la Communication"],
              ['IC', 'Intervalle de confiance'],
              ['JSON', 'Format d\'échange de données textuel (JavaScript Object Notation)'],
              ['NoSQL', 'Famille de bases de données non relationnelles'],
              ['QCM', 'Questionnaire à choix multiples'],
              ['RSS', "Mémoire résidente d'un processus (Resident Set Size)"],
              ['SHA-256', "Fonction d'empreinte cryptographique sur 256 bits (Secure Hash Algorithm)"],
              ['SQL', "Langage d'interrogation des bases relationnelles (Structured Query Language)"],
              ['SRIT', "Filière de l'ESATIC dont relève le cours d'algorithmique servant de référence aux exercices"],
              ['SSD', 'Disque à mémoire flash (Solid State Drive)'],
              ['USL', "Loi de passage à l'échelle universelle (Universal Scalability Law)"],
            ]}
          />
        </details>
        <details className="r-details">
          <summary>Notations</summary>
          <Table
            rows={[
              ['Notation', 'Sens'],
              ['Seq, A, B, C, P', 'Les cinq organisations comparées : séquentielle, pool de processus local, workers distribués via un courtier, messagerie infogérée, architecture proposée'],
              ['H1, H2, H3, HP', 'Les hypothèses de la recherche, énoncées au chapitre 1'],
              ['X1 à X7', 'Les expériences du plan de mesure, définies en section 4.4.1'],
              ['M1 à M12', 'Les indicateurs mesurés, définis en section 4.4.2'],
              ['R1 à R6', 'Les critères de réussite, fixés en section 4.4.3'],
              ["K1 à K5", "Les cinq classes de réponses d'étudiants, définies en section 4.2.2"],
              ['N', 'Nombre de workers par nœud'],
              ['T_total', "Temps total d'une campagne de correction"],
              ['S(N), E(N)', 'Accélération et efficacité obtenues avec N workers'],
              ['p50, p95', 'Percentiles 50 et 95 des latences par copie'],
            ]}
          />
        </details>
      </section>

      <div className="r-download">
        <p>Retrouvez le mémoire complet, avec sa mise en page d'origine, au format PDF (63 pages).</p>
        <a className="download-button" href={PDF} download="DAGBO-memoire-recherche-CodEval.pdf">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M11 3h2v9.17l3.59-3.58L18 10l-6 6-6-6 1.41-1.41L11 12.17V3Zm-6 15h14v2H5v-2Z" />
          </svg>
          Télécharger le PDF
        </a>
        <a className="back-link" href="/#research">← Retour au portfolio</a>
      </div>
    </DocLayout>
  )
}

export default Research
