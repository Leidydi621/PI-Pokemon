import React from "react";
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getPokemons, filterCreated, orderByName, getTypes} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home(){

        const dispatch = useDispatch()
        const allPokemons = useSelector(state => state.pokemon)
        const [currentPage, setCurrentPage] = useState(1)
        const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
        const indexOfLastPokemon = currentPage * pokemonsPerPage
        const indexOfFirsPokemon = indexOfLastPokemon - pokemonsPerPage
        const currentPokemons = allPokemons.slice(indexOfFirsPokemon, indexOfLastPokemon)
        const [orden, setOrden] = useState('')
        const types = useSelector((state) => state.types)


       const prevPage = () => {
            if (currentPage > 0){
                setCurrentPage(currentPage-1);
            }
        }

        const nextPage = () => {
            setCurrentPage(currentPage+1);
        }

        const paginado =  (pageNumber) => {
            setCurrentPage(pageNumber)
        }


        useEffect(() => {
          dispatch(getPokemons());
        },[dispatch])

    
         useEffect(() => {
             dispatch(getTypes());
         }, [])
     
    
        function handleClick(e){
            e.preventDefault();
            dispatch(getPokemons());
        }

        function handleFilterCreated (e){
            dispatch(filterCreated(e.target.value))
        }
        
        function handleSort(e){
            e.preventDefault();
            dispatch(orderByName(e.target.value))
            setCurrentPage(1)
            setOrden(`Ordenado'${e.target.value}`)
        }

 

    return (
        <div>
          <Link to="/pokemons">Crear Pokemon</Link>
           <h1>POKEMON GO!!</h1>
           <button onClick={e => {handleClick(e)}}>Loading Pokemons</button>

           <div>
            <SearchBar/>
               <select onChange={e => {handleSort(e)}}>
                   <option value= 'asc'>Ascending</option>
                   <option value= 'desc'>Descending</option>
               </select>
               <select>
                   <option></option>
               </select>

               </div>
                <select>
                    {types.map(e=> (
                        <option key={e.name} value={e.name}>{e.name}</option>
                    ))}
                </select>
                <div>
              
               <select onChange={e => handleFilterCreated(e)}>
                   <option value= 'All'>All</option>
                   <option value= 'Created'>Created</option>
                   <option value= 'Api'>Exist</option>
               </select>
               
               <br/>
                
               <button onClick = {prevPage}>Previous</button>
               <Paginado
                pokemonsPerPage = {pokemonsPerPage}
                allPokemons = {allPokemons.length}
                paginado = {paginado}
                />


                <button onClick = {nextPage}>Next</button>

               
                    {currentPokemons.map(c => 
                       
                       <div key={c.name}>
                         <Card name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>
                         
                        </div> 
                      
                       
                   
                    )}
                
            

            </div>
        </div>
    )
}