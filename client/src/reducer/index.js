import {GET_POKEMONS} from '../actions';

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
            default: 
            return state;
    }
    

}

export default rootReducer;
