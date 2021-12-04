
export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []
    
    for(let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
          { pageNumbers &&
          pageNumbers.map(number => ( 
            <button className="number" key={number} onClick={() => paginado(number)}>{number}</button>
          ))}
        </nav>
    )
}