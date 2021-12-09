import React, {useEffect} from "react" 
import {Link} from "react-router-dom" 
import {getDetail} from "../actions"
import { useDispatch, useSelector } from "react-redux" 

import stylesD from "./Detail.module.css"

export default function Detail(props){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
      },[dispatch])
    
    const myPokemon = useSelector((state) => state.detail)

    return (
        <div className={stylesD.bkg}>
            <div className={stylesD.container}>
                <div className={stylesD.details}>
                {
                    myPokemon.length>0 ?
                    <div >
                        <h1 className={stylesD.pokeName}>I'm {myPokemon[0].name}</h1>
                        <h4 className={stylesD.pokeTypes}>Types: {myPokemon[0].types.map(el => el.name + ' ')}</h4>
                        <img src={myPokemon[0].img} alt= "img not found" width= "300px" height= "300px"/>
                        <div className={stylesD.pokeTypes}>
                        <h4>Hp: {myPokemon[0].hp}</h4>
                        <h4>Attack: {myPokemon[0].attack}</h4>
                        <h4>Defence: {myPokemon[0].defense}</h4>
                        <h4>Speed: {myPokemon[0].speed}</h4>
                        <h4>Height: {myPokemon[0].height}</h4>
                        <h4>Weight: {myPokemon[0].weight}</h4>    
                        </div>
                    </div> : <p>Loading...</p>
                }
                 <br/>
                 <br/>
                <Link  to= '/home'>
                    <button className={stylesD.btn}>Go back!!</button>
                </Link>

                </div>
            </div>
        </div>
    )
}

