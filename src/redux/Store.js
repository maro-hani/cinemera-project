import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducer";
let middleWares = [thunk];


let initialStore = {
    isAuth: false,
    movies: [],
    persons: []
}

let store = createStore(rootReducer, initialStore,
    compose(applyMiddleware(...middleWares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store;