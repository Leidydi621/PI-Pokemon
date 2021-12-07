import React from "react";
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getPokemons, filterCreated, orderByName, getTypes, getAttackPokemon, filterTypes} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home(){

        const dispatch = useDispatch()
        const allPokemons = useSelector(state => state.pokemon)
        const [currentPage, setCurrentPage] = useState(1)
        const [pokemonsPerPage] = useState(12)
        const indexOfLastPokemon = currentPage * pokemonsPerPage
        const indexOfFirsPokemon = indexOfLastPokemon - pokemonsPerPage
        const currentPokemons = allPokemons.slice(indexOfFirsPokemon, indexOfLastPokemon)
        const [orden, setOrden] = useState('')
        const [orden2, setOrden2] = useState('')
        const types = useSelector((state) => state.types)

        //paginado previo
       const prevPage = () => {
            if (currentPage > 0){
                setCurrentPage(currentPage-1);
            }
        }
        // paginado siguiente
        const nextPage = () => {
            setCurrentPage(currentPage+1);
        }

        //paginado por numero de paginas
        const paginado =  (pageNumber) => {
            setCurrentPage(pageNumber)
        }


        useEffect(() => {
          dispatch(getPokemons());
        },[dispatch])

    
         useEffect(() => {
             dispatch(getTypes());
         }, [dispatch])

    
        function handleClick(e){
            e.preventDefault();
            dispatch(getPokemons());
        }

        function handleFilterCreated (e){
            dispatch(filterCreated(e.target.value))
        }

        function hadleFilterTypes(e){
            dispatch(filterTypes(e.target.value))
        }
        
        function handleSort(e){
            e.preventDefault();
            dispatch(orderByName(e.target.value))
            setCurrentPage(1)
            setOrden(`Ordenado'${e.target.value}`)
        }

        function hadleSortByAttack(e){
            e.preventDefault();
            dispatch(getAttackPokemon(e.target.value))
            setCurrentPage(1)
            setOrden(`Ordenado${e.target.value}`)
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
               <select onChange={e => {hadleSortByAttack(e)}}>
                   <option value= 'Minor attack'>Minor attack</option>
                   <option value= 'Major attack'>Major attack</option>
               </select>

               </div>
               <select onChange={hadleFilterTypes}>
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

               
                    {currentPokemons?.map(c => {
                       
                        return(
                        <Link to = {'/detail/' + c.id} key={c.id}>
                        <Card name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>
                        </Link>
    
                     );             
                     })}                       
                   
                
                
            

            </div>
        </div>
    )
}