import React, {useState, useEffect} from "react" 
import {Link, useHistory} from "react-router-dom" 
import {postPoke, getTypes} from "../actions"
import { useDispatch, useSelector } from "react-redux" 

export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)

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
       
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.name]
        })
        
    }

    function handleSubmit(e){
        e.preventDefault();
      
        dispatch(postPoke(input))
        alert("Pokemon created!!")
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




    useEffect(() => {
        dispatch(getTypes());
    }, [])

    return (
        <div>
            <Link to="/home"><button>Back</button></Link>
            <h1>Create your Pokemon</h1>
            <form onSubmit= {(e) => {handleSubmit(e)}}>
                <div>
                <label>Name:</label>
                <input
                type = "text"
                value= {input.name}
                name = "name"  
                onChange={handleChange}              
                />
                </div>

                <div>
                <label>Img:</label>
                <input
                type = "text"
                value= {input.img}
                name = "img"
                 onChange={handleChange}                
                />
                </div>
                <div>
                <label>HP:</label>
                <input
                type = "number"
                value= {input.hp}
                name = "hp" 
                 onChange={handleChange}               
                />
                </div>
                <div>
                <label>Attack:</label>
                <input
                type = "number"
                value= {input.attack}
                name = "attack" 
                 onChange={handleChange}               
                />
                </div>
                <div>
                <label>defense:</label>
                <input
                type = "number"
                value= {input.defense}
                name = "defense"
                 onChange={handleChange}                
                />
                </div>
                <div>
                <label>Speed:</label>
                <input
                type = "number"
                value= {input.speed}
                name = "speed"
                 onChange={handleChange}                
                />
            
                </div>
                <div>
                <label>Height:</label>
                <input
                type = "number"
                value= {input.height}
                name = "height" 
                 onChange={handleChange}               
                />
                </div>
                <div>
                <label>Weight:</label>
                <input
                type = "number"
                value= {input.weight}
                name = "weight"
                 onChange={handleChange}                
                />
                </div>
                <a>Types:</a>
                <select onChange={handleSelect}>
                    {types.map(e=> (
                        <option key={e.name} value={e.name}>{e.name}</option>
                    ))}
                </select>

                
                <button type= 'submit'>Create Pokemon</button>

            </form>
        </div>
    )
}
