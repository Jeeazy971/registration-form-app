# RegistrationFormApp

---

Ce projet est une application Angular permettant aux utilisateurs de s'enregistrer via un formulaire. Il inclut des validations strictes, des tests complets, et un pipeline CI/CD configuré pour garantir la qualité du code.

## **Caractéristiques principales**

- Formulaire d'inscription avec les champs :
  - **Nom**, **Prénom**, **Email**, **Date de naissance**, **Ville**, **Code postal**
- Validation des champs :
  - Nom, prénom, et ville : caractères alphabétiques uniquement (accents et tirets acceptés).
  - Email : format valide obligatoire.
  - Date de naissance : l'utilisateur doit avoir **18 ans ou plus**.
  - Code postal : format français à **5 chiffres**.
- Messages d'erreur dynamiques sous chaque champ en cas d'invalidité.
- Bouton de sauvegarde désactivé tant que le formulaire n'est pas valide.
- Affichage d'un toaster de succès après une soumission valide et réinitialisation du formulaire.
- Liste des utilisateurs enregistrés, chargée depuis `localStorage`.

---

## **Installation**

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Jeeazy971/registration-form-app.git
   cd registration-form-app
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

---

## **Lancer l'application en local**

1. Lancez le serveur de développement :

   ```bash
   npm start
   ```

2. Ouvrez votre navigateur et accédez à :
   [http://localhost:4200](http://localhost:4200).

### **Tests locaux**

1. Pour exécuter les tests unitaires :

   ```bash
   npm test
   ```

2. Pour exécuter les tests avec la couverture de code :

   ```bash
   npm run test -- --coverage
   ```

3. Le rapport de couverture est généré dans le dossier `coverage/`. Ouvrez le fichier `index.html` dans un navigateur pour afficher le rapport :
   ```bash
   open coverage/index.html # Mac/Linux
   start coverage/index.html # Windows
   ```

---

## **Scripts disponibles**

### **Développement**

- `npm start` : Lance le serveur de développement.

### **Build**

- `npm run build:prod` : Crée une version optimisée pour la production dans le dossier `dist/registration-form-app`.

### **Tests**

- `npm test` : Exécute les tests unitaires avec Jest.
- `npm run test -- --coverage` : Génère un rapport de couverture dans le dossier `coverage/`.

### **Déploiement**

- `npm run deploy` : Déploie l'application sur GitHub Pages.

---

## **Pipeline CI/CD**

Le pipeline CI/CD, configuré via GitHub Actions, inclut les étapes suivantes :

1. **Tests et couverture :**
   - Les tests unitaires sont exécutés avec Jest.
   - Un rapport de couverture est généré et envoyé à [Codecov](https://codecov.io).
2. **Build :**
   - Le projet est compilé pour la production.
   - Les artefacts de build sont stockés.
3. **Déploiement :**
   - L'application est déployée automatiquement sur GitHub Pages.

---

## **Tests**

Les tests suivants ont été implémentés pour garantir la qualité et la fiabilité du projet :

### **Validation des champs :**

- Calcul de l'âge : bloque les utilisateurs de moins de 18 ans.
- Format du code postal : accepte uniquement des chaînes de 5 chiffres.
- Format des noms, prénoms, et ville : accepte les accents, rejette les chiffres et caractères spéciaux.
- Format de l'email : respecte les standards.

### **Comportement du formulaire :**

- Vérifie que le bouton est désactivé tant que les champs sont invalides.
- Vérifie l'affichage du toaster de succès après une soumission valide.
- Vérifie que les champs sont vidés après une soumission réussie.
- Vérifie l'affichage des messages d'erreur sous les champs invalides.

---

## **Documentation technique**

### **Fichiers importants :**

- `src/app/components/registration-form/registration-form.component.ts` :
  - Implémentation du formulaire, des validations et des comportements liés.
- `src/app/components/registration-form/registration-form.component.spec.ts` :
  - Tests unitaires pour le composant.
- `jest.config.ts` :
  - Configuration de Jest pour les tests unitaires.

---

## **Contributions**

1. Clonez le projet :

   ```bash
   git clone https://github.com/Jeeazy971/registration-form-app.git
   ```

2. Créez une nouvelle branche :

   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```

3. Commitez vos changements avec des messages clairs :

   ```bash
   git commit -m "feat: ajout de la validation pour le champ prénom"
   ```

4. Poussez vos changements :

   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```

5. Créez une pull request sur GitHub.

6. Enjoy ! 😊

---
