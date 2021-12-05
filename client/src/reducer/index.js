import {GET_POKEMONS, FILTER_CREATED} from '../actions';

const initialState = {
    pokemon : [],
    allPokemons : []
}

function rootReducer (state = initialState, action){

    switch (action.type){
        case GET_POKEMONS:
            
            return{
                ...state,
                pokemon: action.payload,
                allPokemons: action.payload
            }
        //se GET_TYPES:
        //  const allPokemons = state.pokemon
        //  const typesFiltered = action.payload === 'Types' ? allPokemons : allPokemons.filter(e => el.status === action.payload)
        //  return{
        //      ...state,
        //      types: action.payload
        //  }
            case FILTER_CREATED:
               
                const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
                console.log(createdFilter)
                return{
                    ...state,
                    pokemon: createdFilter
                }

            default: 
            return state;
    }
    

}

export default rootReducer;
