# 🚀 Guide d'utilisation avec Cursor IDE

## Installation et configuration dans Cursor

### 1. Créer un nouveau projet

1. Ouvrez **Cursor**
2. Cliquez sur **"File" > "Open Folder"**
3. Créez un nouveau dossier appelé `habitat-partage-france`
4. Sélectionnez ce dossier

### 2. Créer les fichiers

Dans Cursor, créez les fichiers suivants :

#### Fichier 1 : `index.html`
- Clic droit dans l'explorateur de fichiers
- **"New File"** > nommez-le `index.html`
- Copiez-collez tout le code HTML fourni

#### Fichier 2 : `README.md`
- Clic droit dans l'explorateur de fichiers
- **"New File"** > nommez-le `README.md`
- Copiez-collez le contenu du README

#### Fichier 3 : `.gitignore` (optionnel)
```
.DS_Store
*.log
node_modules/
.cursor/
```

### 3. Prévisualisation en direct

#### Option A : Extension Live Server
1. Installez l'extension **"Live Server"** dans Cursor
2. Clic droit sur `index.html`
3. Sélectionnez **"Open with Live Server"**
4. Votre navigateur s'ouvre automatiquement avec le site

#### Option B : Terminal intégré
1. Ouvrez le terminal dans Cursor : **View > Terminal**
2. Tapez :
   ```bash
   # Si vous avez Python
   python -m http.server 8000
   ```
3. Ouvrez `http://localhost:8000` dans votre navigateur

### 4. Édition avec Cursor AI

Cursor offre des fonctionnalités AI pour améliorer votre code :

#### Commandes utiles :
- **Cmd/Ctrl + K** : Demander à l'AI d'éditer le code
- **Cmd/Ctrl + L** : Chat avec l'AI pour des questions
- **Cmd/Ctrl + Shift + L** : Générer du code avec contexte

#### Exemples de prompts pour Cursor :

```
"Ajoute une animation de chargement plus sophistiquée"
```

```
"Crée une section FAQ avec accordéon interactif"
```

```
"Optimise les performances du JavaScript"
```

### 5. Git et GitHub avec Cursor

#### Initialiser Git :
1. Ouvrez le terminal dans Cursor
2. Tapez :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Guide Habitat Partagé"
   ```

#### Connecter à GitHub :
1. Créez un nouveau repository sur GitHub
2. Dans le terminal Cursor :
   ```bash
   git remote add origin https://github.com/votre-username/habitat-partage-france.git
   git branch -M main
   git push -u origin main
   ```

### 6. Déploiement automatique

#### Fichier de workflow GitHub Actions :
Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### 7. Commandes Cursor spécifiques

#### Raccourcis essentiels :
- **Cmd/Ctrl + P** : Recherche rapide de fichiers
- **Cmd/Ctrl + Shift + P** : Palette de commandes
- **Cmd/Ctrl + B** : Toggle sidebar
- **Cmd/Ctrl + J** : Toggle terminal

#### Snippets personnalisés :
Créez des snippets pour accélérer le développement :

1. **Cmd/Ctrl + Shift + P** > "Configure User Snippets"
2. Sélectionnez "html.json"
3. Ajoutez :

```json
{
  "Section Template": {
    "prefix": "section",
    "body": [
      "<section id=\"$1\">",
      "    <div class=\"container\">",
      "        <div class=\"section-header\">",
      "            <h2>$2</h2>",
      "            <p class=\"section-subtitle\">$3</p>",
      "        </div>",
      "        <div class=\"content\">",
      "            $4",
      "        </div>",
      "    </div>",
      "</section>"
    ]
  }
}
```

### 8. Debugging dans Cursor

Pour débugger le JavaScript :

1. Installez l'extension **"Debugger for Chrome"**
2. Créez `.vscode/launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:8000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

3. Appuyez sur **F5** pour lancer le debug

### 9. Optimisations Cursor

#### Extensions recommandées :
- **Live Server** : Preview en temps réel
- **Prettier** : Formatage du code
- **ESLint** : Détection d'erreurs JS
- **Color Highlight** : Visualisation des couleurs
- **Auto Rename Tag** : Renommage automatique des balises

#### Settings.json personnalisé :
Créez `.vscode/settings.json` :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "liveServer.settings.port": 5500,
  "files.autoSave": "afterDelay",
  "editor.wordWrap": "on",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### 10. Workflow de développement

1. **Édition** : Utilisez Cursor AI pour suggestions
2. **Preview** : Live Server pour voir les changements
3. **Commit** : Git intégré dans Cursor
4. **Deploy** : Push vers GitHub = déploiement auto

### Commandes Terminal utiles

```bash
# Créer la structure complète
mkdir habitat-partage-france && cd habitat-partage-france
touch index.html README.md .gitignore
echo "# Habitat Partagé France" > README.md

# Serveur local rapide
npx serve .

# Build pour production (minification)
npx html-minifier index.html -o index.min.html --collapse-whitespace --remove-comments

# Vérifier les liens cassés
npx link-checker http://localhost:8000
```

### Tips Cursor Pro

1. **Multi-curseurs** : Alt + Click pour éditer plusieurs endroits
2. **Refactoring** : F2 pour renommer partout
3. **Zen Mode** : Cmd/Ctrl + K, Z pour focus maximal
4. **Split View** : Drag un fichier sur le côté pour comparer

---

💡 **Astuce** : Utilisez Cursor AI pour générer des variations de contenu, optimiser le SEO, ou créer des tests automatisés pour votre guide !

---

Pour plus d'aide avec Cursor : [cursor.sh/docs](https://cursor.sh/docs)