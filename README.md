# Project

This repo contains an implementation of a simple redux-like data store for use a single page React app, along with a UI that simulates a basic order booking operation.

* Source code lives in `/src` folder
* Unit tests are implemented in `/test` folder

To run the app:

```
yarn install
yarn start
```

The app will runs at `http://localhost:7000`

# Unit tests

To run the unit tests:

```
yarn test
```

The view unit tests require installing additional dependencies `enzyme` and `enzyme-adapter-react-16`. To do that run:

```
yarn add enzyme enzyme-adapter-react-16 @types/enzyme @types/enzyme-adapter-react-16 --dev
```

Then uncomment test code in file `ordersView.test.tsx`
