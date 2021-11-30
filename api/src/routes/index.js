const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Pokemon, Type} = require('../db')



const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const apiUrl2 = await axios.get(apiUrl.data.next);
    const apiInfo = await apiUrl.data.results.map(el => axios.get(el.url))
    const apiInfo2 = await apiUrl2.data.results.map(el => axios.get(el.url))
    const dataTotal = await apiInfo.concat(apiInfo2)
    const allData = await Promise.all(dataTotal)
   
    const pokemonsData = allData.map(el => {
        return {
            name: el.data.name,
            id: el.data.id,
            types: el.data.types.map(el => ({
                name: el.type.name,
                id: el.slot
            })),
            img: el.data.sprites.other.home.front_default,
            hp: el.data.stats[0].base_stat,
            attack: el.data.stats[1].base_stat,
            defense: el.data.stats[2].base_stat,
            speed: el.data.stats[5].base_stat,
            height: el.data.height,
            weight: el.data.weight


        }
    })
    
    return pokemonsData;     
};

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = await apiInfo.concat(dbInfo);

    return infoTotal
}

router.get('/pokemons', async(req, res)=>{
    const name = req.query.name
    let pokemonsTotal = await getAllPokemons();
    let routP = pokemonsTotal.map(el => {
        return {
            name: el.name,
            img: el.img,
            types: el.types
        }
    })
    if(name){
        let pokemonName = await routP.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName ?
        res.status(200).send(pokemonName) :
        res.status(404).send("This Pokemon doesn't exist");       
    }else {
        res.status(200).send(routP)
    }

})

router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id;
    const pokemonId = await getAllPokemons();
    if (id) {
        let pokemonI;
        if (id.length > 1 ){

            pokemonI= pokemonId.filter(pokemon => pokemon.id === (id));

        } else {
            pokemonI= pokemonId.filter(pokemon => pokemon.id === parseInt(id));  

        }
        pokemonI.length?
        res.status(200).send(pokemonI):
        res.status(404).send("This Pokemon doesn't exist");  

    }
})

router.get('/types', async (req, res)=>{
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
    const typesPokemon = typesApi.data.results.map(el => el.name)
    typesPokemon.forEach(el => {
        Type.findOrCreate({ 
            where: { name: el}
        })
    })

   const allTypes = await Type.findAll();
   res.send(allTypes);
   console.log(allTypes);
   
})


router.post('/pokemons', async (req, res) => {
 
  
  if (req.body){
    console.log('datos por body', req.body);
    Pokemon.create(req.body).then(pokemonCreated => res.send(pokemonCreated))
  }

})


module.exports = router;
