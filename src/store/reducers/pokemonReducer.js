import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pokedex: [],
    totalPokeCaught: 0,
    id: 0,
}
const pokemonReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_POKE_SUCCESS:
            
            let isNewData = true;
            if(state.pokedex.length > 0) {
                for(let i = 0; i < state.pokedex.length; i++ ) {

                    if(state.pokedex[i].detail.name === action.data.detail.name) {

                        isNewData = false;
                        
                        let updatedPokeData = {...state.pokedex[i]}
                        updatedPokeData.ownedPoke++;
                        updatedPokeData.nicknames.push(
                            {
                                id: state.id += 1, 
                                nickname: action.data.nickname
                            }
                        )

                        let newState = {...state};
                        newState.totalPokeCaught++;
                        newState.pokedex[i] = updatedPokeData;

                        return newState;

                    }
                }
            }

            if (isNewData) {
                let id = state.id;

                const newData = {
                    
                    ownedPoke: 1,
                    detail: action.data.detail,
                    nicknames: [{
                        id: id += 1,
                        nickname: action.data.nickname
                    }],    
                };
                
                return {
                    ...state,
                    totalPokeCaught: state.totalPokeCaught + 1,
                    pokedex: [...state.pokedex, newData],
                    id: id,
                }
            }

            break;
        case actionTypes.RELEASE_POKE_SUCCESS: 
        
            let newData = {...state};
            for (let i = 0; i < state.pokedex.length; i++) {
               for (let j = 0; j < state.pokedex[i].nicknames.length; j++) {
                   if (state.pokedex[i].nicknames[j].id === action.id) {
                        state.pokedex[i].nicknames.splice(j, 1);

                        if (state.pokedex[i].nicknames.length === 0) {
                            state.pokedex.splice(i, 1);
                        } else {
                            newData.pokedex[i].ownedPoke = state.pokedex[i].ownedPoke -=1;
                        }
                        
                        newData.totalPokeCaught = state.totalPokeCaught -= 1;
                        
                        break;
                   }
               }
            }

            return newData;
            // break;
        default:
            return state;
    }
}

export default pokemonReducer;