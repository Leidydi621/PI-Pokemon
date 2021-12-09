import React, {useState, useEffect} from "react" 
import {Link, useHistory} from "react-router-dom" 
import {postPoke, getTypes} from "../actions"
import { useDispatch, useSelector } from "react-redux" 

import style from './PokemonCreate.module.css';


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Name required"
    } 
   return errors;
};

export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        types: [],
        img: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: ""
    
    })



    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
      
      
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        
    }

    function handleSubmit(e){
    e.preventDefault();
    dispatch(postPoke(input))
    alert("Pokemon Created!")
    setInput({
        name: "",
        types: [],
        img: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: ""  
    })
    history.push('/home')
}


    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }



    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    return (
        <div className={style.createPoke}>
            
            <img src="https://fontmeme.com/permalink/211208/46c0edb7f11a935a7ae91be6e0fe7edd.png" alt="fuente-pokemon" border="0"/>
          
          
            <form onSubmit= {handleSubmit}>
                <div>
                <label>Name: </label>
                <input
                type = "text"
                value= {input.name}
                name = "name"  
                onChange={handleChange}              
                />
                {errors.name && (
                    <p className= 'error'>{errors.name}</p>
                )}
                </div>

                <div>
                <label>Img: </label>
                <input
                type = "text"
                value= {input.img}
                name = "img"
                 onChange={(e) => handleChange(e)}                
                />
                </div>
                <div>
                <label>HP: </label>
                <input
                type = "number"
                value= {input.hp}
                name = "hp" 
                 onChange={handleChange}               
                />
                </div>
                <div>
                <label>Attack: </label>
                <input
                type = "number"
                value= {input.attack}
                name = "attack" 
                 onChange={handleChange}               
                />
                </div>
                <div>
                <label>Defense: </label>
                <input
                type = "number"
                value= {input.defense}
                name = "defense"
                 onChange={handleChange}                
                />
                </div>
                <div>
                <label>Speed: </label>
                <input
                type = "number"
                value= {input.speed}
                name = "speed"
                 onChange={handleChange}                
                />
            
                </div>
                <div>
                <label>Height: </label>
                <input
                type = "number"
                value= {input.height}
                name = "height" 
                 onChange={handleChange}               
                />
                </div>
                <div>
                <label>Weight: </label>
                <input
                type = "number"
                value= {input.weight}
                name = "weight"
                 onChange={handleChange}                
                />
                </div>
               
                <select onChange={e => handleSelect(e)}>
                {types.map((type) => (
                     <option key={type.id} value={type.name}>{type.name}</option>
                ))}
                </select>
                <br/>
                <br/>
                <button className={style.btn} type= 'submit'>Create Pokemon</button>

            </form>
            

                {input.types.map(el =>
                <div className= 'divTyp' key={el}>
                    <p key={el}>{el}</p>
                    <button key={el} className="botonX" onClick={()=> handleDelete(el)}>x</button>
                </div>
                 )}
            
            <br/>
            <br/>
            <div>
            <Link to="/home">
                <button className={style.btn}>Back</button>
            </Link>
            </div>
        </div>
    )
}

