import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import pokemonReducer from './reducers/pokemonReducer';

const rootReducers = combineReducers({
    pokemon: pokemonReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
    return createStore(rootReducers,composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
