import React from "react";
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getPokemons, filterPokeByTypes} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';

export default function Home(){

        const dispatch = useDispatch()
        const allPokemons = useSelector(state => state.pokemon)
        const [currentPage, setCurrentPage] = useState(1)
        const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
        const indexOfLastPokemon = currentPage * pokemonsPerPage
        const indexOfFirsPokemon = indexOfLastPokemon - pokemonsPerPage
        const currentPokemons = allPokemons.slice(indexOfFirsPokemon, indexOfLastPokemon)
        

       const prevPage = () => {
            if (currentPage > 0){
                setCurrentPage(currentPage-1);
            }
        }

        const nextPage = () => {
            setCurrentPage(currentPage+1);
        }



        useEffect(() => {
          dispatch(getPokemons());
        },[dispatch])

   
        function handleFilterTypes(e){
            dispatch(filterPokeByTypes(e.target.value))
        }
    


    return (
        <div>
          <Link to="/pokemons">Crear Pokemon</Link>
           <h1>POKEMON GO!!</h1>

           

           <button onClick = {prevPage}>Previous</button>
           <button onClick = {nextPage}>Next</button>

           <button>Loading Pokemons</button>

           <div>
               <select>
                   <option value= 'asc'>Ascending</option>
                   <option value= 'desc'>Descending</option>
               </select>
            {/* intentar hacer un map a los types en orden alfabetico y por fuerza*/}
               <select onChange={e => handleFilterTypes(e)}> 
                   <option value= 'All'>All</option>
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

           
           
           
           

           

               
                    {currentPokemons.map(c => 
                       
                       <div key={c.name}>
                         <Card name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>
                         
                        </div> 
                      
                       
                   
                    )}
                
            

            </div>
        </div>
    )
}