import React from "react";
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getPokemons} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card'

export default function Home(){

        const dispatch = useDispatch()
        const allPokemons = useSelector(state => state.pokemon)


        console.log(allPokemons, "home") // muestra en pantalla los pokemons --> debo eliminar este console log
        useEffect(() => {
          dispatch(getPokemons());
        },[dispatch])
    


    return (
        <div>
          <Link to="/pokemons">Crear Pokemon</Link>
           <h1>POKEMON GO!!</h1>
           <button>Loading Pokemons</button>

           <div>
               <select>
                   <option value= 'asc'>Ascending</option>
                   <option value= 'desc'>Descending</option>
               </select>
            {/* intentar hacer un map a los types en orden alfabetico y por fuerza*/}
               <select> 
                   
                   <option value= 'type'>Types</option>
                   <option value= 'bug'>bug</option>
                   <option value= 'dark'>dark</option>
                   <option value= 'dragon'>dragon</option>
                   <option value= 'electric'>electric</option>
                   <option value= 'fairy'>fairy</option>
                   <option value= 'fighting'>fighting</option>
                   <option value= 'fire'>fire</option>
                   <option value= 'flying'>flying</option>
                   <option value= 'ghost'>ghost</option>           
                   <option value= 'grass'>grass</option>
                   <option value= 'ground'>ground</option>
                   <option value= 'ice'>ice</option>
                   <option value= 'normal'>normal</option>
                   <option value= 'poison'>poison</option>
                   <option value= 'psychic'>psychic</option>
                   <option value= 'rock'>rock</option>
                   <option value= 'shadow'>shadow</option>
                   <option value= 'steel'>steel</option>
                   <option value= 'unknown'>unknown</option>
                   <option value= 'water'>water</option>

               </select>
               <select>
                   <option value= 'All'>All</option>
                   <option value= 'created'>Created</option>
                   <option value= 'api'>Exist</option>
               </select>
               <select>
                   <option value= 'a-z'>A-Z</option>
               </select>

               
                    {allPokemons.map(c => 
                       
                       <div key={c.name}>
                         <Card name={c.name} img={c.img}/>
                         
                        </div> 
                      
                       
                   
                    )}
                
            

            </div>
        </div>
    )
}