import {
    GET_POKEMONS, 
    FILTER_CREATED, 
    GET_TYPES, 
    FILTER_TYPES,
    ORDER_BY_NAME, 
    GET_NAME_POKEMON,
    GET_ATTACK_POKEMON,
    POST_POKE

} from '../actions';

const initialState = {
    pokemon : [],
    allPokemons : [],
    types: [],
    allTypes : [],
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
                allTypes: action.payload  
            }
        case FILTER_TYPES:

            const typesFilter = action.payload === 'Types' ? state.allPokemons.filter(e => e.types.name) : state.allPokemons.filter(e => !e.types.name)

            return{
                ...state,
                types: typesFilter
            }

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc'?
            state.pokemon.sort(function(a,b){
                if (a.name.attack > b.name.attack){
                    return 1
                }
                if (b.name > a.name){
                    return -1
                }
                return 0
            }):
            state.pokemon.sort(function(a,b){
                if (a.name > b.name){
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

            state.pokemon.sort(function(a,b){
                if (a.attack > b.attack){
                    return 1
                }
                if (b.attack > a.attack){
                    return -1
                }
                return 0
            });
            state.pokemon.sort(function(a,b){
                if (a.attack > b.attack){
                    return -1
                }
                if (b.attack > a.attack){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                pokemon: action.payload
            }
    

      
            default: 
            return state;
  }
    

}

export default rootReducer;
