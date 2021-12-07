import {
    GET_POKEMONS, 
    FILTER_CREATED, 
    GET_TYPES, 
    FILTER_TYPES,
    ORDER_BY_NAME, 
    GET_NAME_POKEMON,
    GET_ATTACK_POKEMON,
    POST_POKE,
    GET_DETAILS,

} from '../actions';

const initialState = {
    pokemon : [],
    allPokemons : [],
    types: [],
    allTypes : [],
    detail: []
}

function rootReducer (state = initialState, action){

    switch (action.type){

        case GET_POKEMONS:
           
            return{
             ...state,
             pokemon: action.payload,
             allPokemons: action.payload
         }

        case FILTER_CREATED:

            const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
           
            return{
             ...state,
             pokemon: createdFilter
            }
        case GET_NAME_POKEMON:
            return{
                ...state,
                pokemon: action.payload
            }
        case POST_POKE:
            return{ ...state}

        case GET_TYPES:
            
            return{
                ...state,
                types: action.payload,
                 
            }

        case FILTER_TYPES:

            const typesFilter = action.payload === state.types.filter(e => e.name) 

            return{
                ...state,
                types: typesFilter
            }

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc'?
            state.pokemon.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1
                }
                if (b.name > a.name){
                    return -1
                }
                return 0
            }):
            state.pokemon.sort(function(a,b){
                if (a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1
                }
                if (b.name > a.name){
                    return 1
                }
                return 0
            })

            return {
                ...state,
                pokemon: sortedArr
            }

        case GET_ATTACK_POKEMON:
            let sortedAttack = action.payload === 'Minor attack'?
            state.allPokemons.sort(function(a,b){
                if (a.attack > b.attack){
                    return 1
                }
                if (b.attack > a.attack){
                    return -1
                }
                return 0
            }):
            state.pokemon.sort(function(a,b){
                if (a.attack > b.attack){
                    return -1
                }
                if (b.attack > a.attack){
                    return 1
                }
                return 0
            })

            return {
                ...state,
                pokemon: sortedAttack
            }

            case GET_DETAILS:
                let detalle = action.payload
               
                return {
                    ...state,
                    detail: action.payload,
                }
            
            default: 
            return state;
  }
    

}

export default rootReducer;
