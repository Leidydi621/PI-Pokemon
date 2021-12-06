import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS';
export const FILTER_CREATED = 'FILTER_CREATED';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_TYPES = 'FILTER_TYPES'
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_NAME_POKEMON = 'GET_NAME_POKEMON';
export const GET_ATTACK_POKEMON = 'GET_ATTACK_POKEMON';
export const POST_POKE = 'POST_POKE';


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
}

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload 
    }
}

 export function getTypes(){  
     return async function(dispatch){
         const info = await axios.get('http://localhost:3001/types');
         return dispatch({
             type: GET_TYPES,
             payload :info.data
         })
     }
 } 

 export function filterTypes(payload){
     return {
         type: FILTER_TYPES,
         payload
     }
 }

 export function postPoke(payload){   
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/pokemons', payload);
        
        return dispatch({
            type: POST_POKE,
            payload :response
        })

    }
} 



export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getNamePokemon(name){
    return async function(dispatch){
        try{
         const json = await axios.get('http://localhost:3001/pokemons?name=' + name);
         return dispatch({
             type: GET_NAME_POKEMON,
             payload :json.data
         })
        }
        catch(error){
        console.log(error);
    }

    }

}

export function getAttackPokemon(attack){
    return async function(dispatch){
        try{
         const json = await axios.get('http://localhost:3001/pokemons?name=' + attack);
         return dispatch({
             type: GET_ATTACK_POKEMON,
             payload :json.data
         })
        }
        catch(error){
        console.log(error);
    }

    }

}



