import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PokeCard = ({ url }) => {

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])



  return (
    
      <article className='card-pokemon'>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        <h3 className='pokemon-name'>{pokemon?.name}</h3>
        <h3> Experience: {pokemon?.base_experience}</h3>
      </article>
    
  )
}

export default PokeCard