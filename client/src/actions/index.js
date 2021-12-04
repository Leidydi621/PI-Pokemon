import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';


// conexion con el Backend

export function getPokemons(){

    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/pokemons');
            
            return dispatch({
                type: GET_POKEMONS,
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
};