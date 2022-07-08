import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import Pagination from './Pagination'
import PokeCard from './PokeCard'
import SearchBar from './SearchBar'



const PokedexScreen = () => {

    const nameUser = useSelector(state => state.nameUser)
    const [pokemons, setPokemons] = useState()
    const [pokeSearch, setPokeSearch] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [filterPokemon, setFilterPokemon] = useState()
    const [typeList, setTypeList] = useState()
    const [filterType, setFilterType] = useState('All Pokemons')


    useEffect(() => {
        if (filterType === 'All Pokemons') {
            //Petición de todos los pokemon
            const URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'
            /*1154*/
            axios.get(URL)
                .then(res => {

                    setPokemons(res.data.results)
                })
                .catch(err => console.log(err))
        } else {
            //pokemons por tipo
            const URL_FILTER = `https://pokeapi.co/api/v2/type/${filterType}/`
            axios.get(URL_FILTER)
                .then(res => {
                    console.log(res.data.pokemon)
                    const array = res.data.pokemon.map(e => e.pokemon)
                    setPokemons(array)
                })
                .catch(err => console.log(err))
        }
    }, [filterType])

    console.log(pokemons)

    useEffect(() => {
        const URL_POKEMONS = 'https://pokeapi.co/api/v2/type/'
        axios.get(URL_POKEMONS)
            .then(res => setTypeList(res.data.results))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setFilterPokemon(pokemons?.filter(e => e.name.includes(pokeSearch?.toLowerCase())))


    }, [pokeSearch])


    let arrayPivote
    if (filterPokemon) {
        arrayPivote = filterPokemon
    } else {
        arrayPivote = pokemons
    }

    let arrayPokemons = []
    const pokemonsPerPage = 6
    if (arrayPivote?.length < pokemonsPerPage) {
        arrayPokemons = [...arrayPivote]
    } else {
        const lastPokemon = currentPage * pokemonsPerPage
        arrayPokemons = arrayPivote?.slice(lastPokemon - pokemonsPerPage, lastPokemon)
    }


    let arrayPages = []
    let quantityPages = Math.ceil(arrayPivote?.length / pokemonsPerPage)
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


    const navigate = useNavigate()
    const goHome = () => navigate('/')






    return (

        <div className='pokedex-main'>
            <div className='pokedex-letras'>
                <h1 className='pokedex-inside'>Pokedex</h1>
                <h2>Hi {nameUser}, welcome to Pokedex</h2>
                <SearchBar setPokeSearch={setPokeSearch}
                    typeList={typeList}
                    setFilterType={setFilterType}
                    goHome={goHome}
                />
                
            </div>

            <Pagination
                arrayPages={arrayPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                quantityPages={quantityPages}

            />

            <div className='card-box'>
                {
                    /*filterPokemon ?
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
                        ))*/

                    arrayPokemons?.map(pokemon => (
                        <PokeCard
                            key={pokemon.url}
                            url={pokemon.url}
                        />
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default PokedexScreen