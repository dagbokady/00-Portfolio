# Curriculum Vitae - Version Web

Un projet de CV interactif, initialement en HTML et CSS pur, désormais rendu avec React et Vite.

## 📋 Description

Ce projet est un curriculum vitae en ligne responsive qui présente de manière structurée et esthétique les informations professionnelles d'une personne. L'objectif était de créer une version web d'un CV en utilisant uniquement HTML et CSS, sans frameworks ni JavaScript.

## ✨ Fonctionnalités

- **Structure sémantique** HTML5
- **Mise en page moderne** avec Flexbox et CSS Grid


## 🗂️ Structure du projet

```
00-Web_Curriculum_Vitae/
│
├── index.html          # Point d'entrée Vite
├── style.css           # Feuille de style principale
├── src/
│   ├── main.jsx        # Montage de l'application React
│   ├── App.jsx         # Composants du CV
│   └── data/cv.jsx     # Contenu du CV (expériences, projets, compétences…)
├── files/             # Dossier des ressources
├── README.md           # Ce fichier
└── .gitignore          # Fichiers à ignorer par Git
```

## 🛠️ Technologies utilisées

- **React 19 + Vite** : Rendu du CV à partir des données
- **HTML5** : Structure sémantique du document
- **CSS3** : Styles, mises en page et animations
- **Flexbox & CSS Grid** : Mise en page moderne
- **Google Fonts** : Typographie (Roboto)
- **Font Awesome** : Icônes (via CDN)

## 🚀 Comment utiliser

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/dagbokady/00-Web-Curriculum-Vitae.git
   ```

2. **Installer et lancer** :
   ```bash
   npm install
   npm run dev
   ```
   Pour générer la version statique : `npm run build` (sortie dans `dist/`).

3. **Modifier le contenu** :
    - Éditer `src/data/cv.jsx` pour personnaliser les informations
    - Modifier `style.css` pour changer le design

## 📱 Sections du CV

1. **En-tête** : Photo, nom et titre professionnel
2. **Profil** : Description personnelle et objectifs
3. **Expérience professionnelle** : Postes occupés avec dates
4. **Formation** : Diplômes et études
5. **Compétences** : Compétences techniques et professionnelles
6. **Langues** : Langues parlées avec niveau
7. **Centres d'intérêt** : Hobbies et activités


## 🎨 image

![image](files/img.png)


### Modifier la typographie
Changer les polices dans `style.css` :
```css
body {
    font-family: Avenir, Helvetica, Arial, sans-serif
}
```

### Ajouter une photo
Placer votre photo dans `files` et l'ajouter dans `src/App.jsx`.

## 📱 Responsive Design

Le CV n'est pas encore responsive

## 📝 Bonnes pratiques implémentées

- Code HTML valide W3C
- CSS organisé et commenté
- Images optimisées
- Accessibilité (attributs alt, contrastes)
- Compatibilité cross-browser
- Performance optimale

## 🤝 Contribution

Ce projet étant un exercice pédagogique, les suggestions d'amélioration sont les bienvenues :
1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Pushez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Projet éducatif - Libre de réutilisation et modification

## 👨‍🎓 Contexte pédagogique

Ce projet a été développé comme exercice pratique pour :
- Maîtriser les bases du HTML/CSS
- Comprendre le responsive design
- Apprendre à structurer un projet web simple


## ✉️ Contact

Pour toute question ou retour sur ce projet :
- Étudiant : DAGBO KADY CHRIST-PHANUEL
- Email : dagbokady@gmail.com

---

Dernière mise à jour : 23-01-2025