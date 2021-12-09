import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNamePokemon} from '../actions';

import styleSb from './SearchBar.module.css';


export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState('')


    function handleInputPoke(e){
        e.preventDefault();
        setName(e.target.value);
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokemon(name));
     
    }

    return(
        <div className={styleSb.busqueda}>
            <input 
            type="text" 
            placeholder="Search..."
            onChange={(e) => handleInputPoke(e)}
            />
            <button type= 'submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}
