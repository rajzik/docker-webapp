# WebApp

![pipeline](https://gitlab.ixperta.com/IndustrialVision/Application/web/badges/master/build.svg)
![coverage](https://gitlab.ixperta.com/IndustrialVision/Application/web/badges/master/coverage.svg)

## Docker

### Local development

Build image and start dev server

```bash
make
```

Run production build

```bash
make run-prod
```

## Setup

### prerequisites

- Node > v9.x.x
- Npm > v6.x.x
- Yarn installed globally

### Install dependencies

```bash
npm install -g yarn
yarn install
```

### Yarn commands

- start
- build
- test
- coverage

Example:

```bash
yarn start # to start dev server
yarn build # to build production build
yarn test # to start unit tests
yarn coverage # to collect coverage from source code
```

## Used technology

- react [documentation](https://reactjs.org/docs/hello-world.html)
- react-dom [documentation](https://reactjs.org/docs/react-dom.html)
- react-router-dom [documentation](https://reacttraining.com/react-router/web/guides/philosophy)
- redux [documentation](https://redux.js.org/introduction)
- react-intl [documentation](https://github.com/yahoo/react-intl)
- css modules [documentation](https://github.com/css-modules/css-modules)
- css next [documentation](https://preset-env.cssdb.org/features), [cssdb](https://cssdb.org/), [w3s](https://www.w3schools.com/css/css3_variables.asp)
- flow [documentation](https://flow.org/en/docs/)
- jest [documentation](https://facebook.github.io/jest/docs/en/getting-started.html)

## Javascript development

Rules:

- Keep it simple
  - __Don't create big complicated files__
  - function with complexity __5__ or below
- Try to keep dependencies up to date
  - Lookup for updates in [create-react-app](https://github.com/facebook/create-react-app)
  - also check `npm outdated`
    - you can try to update package one by one with committing in between
    - if it breaks something revert change!

## Folder structure

### Main folder

- .vscode - Files for vs code editor
  - `launch.json` - For debugging
  - `settings.json` - Some settings to make your life easier
- config - Build configuration __DON'T TOUCH THIS FOLDER__ <sub>Unless you know what are you doing</sub>
  - jest - some mocks for css modules and assets
  - `env.js` - Node env setup
  - `paths.js` - Important paths
  - `polyfills.js` - Jest polyfill
  - `webpack.config.*.js` - Webpack configuration, prod is only with optimizations
  - `webpackDevServer.config.js` - Dev server configuration
- flow - Flow settings
  - ...- can vary
- public - Public/static files
  - ...- can vary
- scripts - Build scripts __DON'T TOUCH THIS FOLDER__ <sub>Unless you know what are you doing</sub>
  - `build.js` - Build script called from node `npm run build`
  - `start.js` - Start script called from node `npm start`
- src - Source code
  - ... - described __below__
- `.babelrc` - Settings for babel presets and plugins
- `.editorconfig` - Editor config with our code style
- `.eslintignore` - ...
- `.eslintrc.json` - Lint record with [airbnb](https://github.com/airbnb/javascript) lint
- `.flowconfig` - Flow record with rules etc.
- `.gitignore` - ...
- `package.json` - ...
- `README.md` - ...

### Source code folder

- actions - Redux actions see: [redux](https://redux.js.org/basics/actions)
- components - Pure/stateless or whatever buzzword that describe small components with no login in it
- constants - ...
- containers - Bridge between components and redux, calling actions, process data etc.
- i18n - Translations
- pages - Basic components which wrap containers
- reducer - Redux reducers see: [redux](https://redux.js.org/basics/reducers)
  - `index.js` - Will always return combined reducers
- styles - General styles
- types - Flow types
- utilities - Shared code with general purpose
- `index.css` - ...
- `index.jsx` - ...
- `registerServiceWorker.js` - Some useful links [mozilla dev](https://developer.mozilla.org/cs/docs/Web/API/Service_Worker_API/Using_Service_Workers), [google dev](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker), [w3c dev](https://github.com/w3c/ServiceWorker/blob/master/explainer.md)
