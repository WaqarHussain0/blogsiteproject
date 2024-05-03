// import { createStore } from "redux";
// import { reducer1 } from "../reducers";

// const store = createStore(reducer1);

// export default store;

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import globalRootReducer from "../reducers/global.reducer";
import globalRootSagas from "../saga/global.sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(globalRootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(globalRootSagas);

export default store;
