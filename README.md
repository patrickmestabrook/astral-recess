welcome to :candle:astral recess:candle:
========================================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
Additionally this project uses:
 - [easy-peasy](https://easy-peasy.now.sh/) for state management (redux with less boilerplate)
 - [redux-saga](https://redux-saga.js.org/) for side-effects
 - [emotion](https://emotion.sh) for styles
 - [storybook](https://storybook.js.org/) for developing components in isolation

I've found that this combination of tooling allows for clear separation of concerns in a way that maximizes testability and minimizes boilerplate.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

###  `gh-pages deploy`

Deploys the app to [https://astral-recess.patrickme.dev](https://astral-recess.patrickme.dev).<br />
NB: Until I fix this, after each deploy you must edit the URL setting in the github repo settings
to properly point to `astral-recess.patrickme.dev`.  It `gh-pages` clobbers this setting every time we deploy for some reason.
