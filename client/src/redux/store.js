import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";
// Permite utilizar "REACT-REDUX":
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( reducer, composeEnhancer( applyMiddleware( thunkMiddleware ) )); // Permite hacer peticiones asíncronas:

export default store;