import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';

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

//export function getTypes(){
//
//    return async function(dispatch){
//        try{
//            const json = await axios.get('http://localhost:3001/types');
//            
//            return dispatch({
//                type: GET_TYPES,
//                payload: json.data
//            })
//        } catch(error){
//            console.log(error);
//        }
//    }
//};

