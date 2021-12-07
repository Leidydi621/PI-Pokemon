import React, {useState, useEffect} from "react" 
import {Link, useHistory} from "react-router-dom" 
import {postPoke, getTypes} from "../actions"
import { useDispatch, useSelector } from "react-redux" 


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
        <div>
            <Link to="/home"><button>Back</button></Link>
            <h1>Create your Pokemon</h1>
            <form onSubmit= {handleSubmit}>
                <div>
                <label>Name:</label>
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
                <label>Img:</label>
                <input
                type = "text"
                value= {input.img}
                name = "img"
                 onChange={(e) => handleChange(e)}                
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
               
                <select onChange={e => handleSelect(e)}>
                {types.map((type) => (
                     <option key={type.id} value={type.name}>{type.name}</option>
                ))}
                </select>
                
                <button type= 'submit'>Create Pokemon</button>

            </form>

            {input.types.map(el =>
                <div className= 'divTyp' key={el}>
                    <p key={el}>{el}</p>
                    <button key={el} className="botonX" onClick={()=> handleDelete(el)}>x</button>
                </div>
            )}


        </div>
    )
}
