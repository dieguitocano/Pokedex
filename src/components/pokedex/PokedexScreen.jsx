import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Pagination from './Pagination'
import PokeCard from './PokeCard'
import SearchBar from './SearchBar'



const PokedexScreen = () => {

    const nameUser = useSelector(state => state.nameUser)
    const [pokemons, setPokemons] = useState()
    const [pokeSearch, setPokeSearch] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [filterPokemon, setFilterPokemon] = useState()


    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'
        /*1154*/
        axios.get(URL)
            .then(res => setPokemons(res.data.results))
            .catch(err => console.log(err))
    }, [])

    console.log(pokemons)


    let arrayPokemons = []
    const pokemonsPerPage = 6
    if (pokemons?.length < pokemonsPerPage) {
        arrayPokemons = [...pokemons]
    } else {
        const lastPokemon = currentPage * pokemonsPerPage
        arrayPokemons = pokemons?.slice(lastPokemon - pokemonsPerPage, lastPokemon)
    }

    let arrayPages = []
    let quantityPages = Math.ceil(pokemons?.length / pokemonsPerPage)
    const pagesPerBlock = 5
    let currentBlock = Math.ceil(currentPage / pagesPerBlock)
    if (currentBlock * pagesPerBlock >= quantityPages) {
        for (let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= quantityPages; i++) {
            arrayPages.push(i)
        }
    } else {
        for (let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= currentBlock * pagesPerBlock; i++) {
            arrayPages.push(i)
        }

    }

    console.log(arrayPages)
    console.log(arrayPokemons)

    useEffect(() => {
            setFilterPokemon(pokemons?.filter(e => e.name.includes(pokeSearch?.toLowerCase())))
        

    }, [pokeSearch])




    return (

        <div className='pokedex-main'>
            <div className='pokedex-letras'>
                <h1 className='pokedex-inside'>Pokedex</h1>
                <h2>Hi {nameUser}, welcome to Pokedex</h2>
                <SearchBar setPokeSearch={setPokeSearch} />
            </div>

            <Pagination
                arrayPages={arrayPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                quantityPages={quantityPages}

            />

            <div className='card-box'>
                {
                    filterPokemon ?
                        filterPokemon?.map(pokemon => (
                            <PokeCard
                                key={pokemon.url}
                                url={pokemon.url}
                            />
                        ))
                        :
                        pokemons?.map(pokemon => (
                            <PokeCard
                                key={pokemon.url}
                                url={pokemon.url}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default PokedexScreen