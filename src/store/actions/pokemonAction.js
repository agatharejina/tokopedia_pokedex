import * as actionTypes from './actionTypes';

export const addPokemon = data => {
    return dispatch => {
        dispatch(addPokemonSuccess(data));
    }
}

export const addPokemonSuccess = (data) => {
    return {
        type: actionTypes.ADD_POKE_SUCCESS,
        data
    }
}

export const releasePoke = (id) => {
    return dispatch => {
        dispatch(releasePokeSuccess(id));
    }
}

export const releasePokeSuccess = (id) => {
    return {
        type: actionTypes.RELEASE_POKE_SUCCESS,
        id
    }
}