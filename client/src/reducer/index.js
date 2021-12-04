import {GET_POKEMONS, FILTER_BY_TYPES} from '../actions';

const initialState = {
    pokemon : []
}

function rootReducer (state = initialState, action){

    switch (action.type){
        case GET_POKEMONS:
            
            return{
                ...state,
                pokemon: action.payload
            }
            case FILTER_BY_TYPES:
                const allTypes = state.types
                const typesFiltered = action.payload === 'All'? allTypes : allTypes.filter(el => el.status === action.payload)
                return{
                    ...state,
                    types: typesFiltered
                }
            default: 
            return state;
    }
    

}

export default rootReducer;