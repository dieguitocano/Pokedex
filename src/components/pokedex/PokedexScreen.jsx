import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import Loader from '../loader/Loader'
import Pagination from './Pagination'
import PokeCard from './PokeCard'
import SearchBar from './SearchBar'

const PokedexScreen = () => {
    const nameUser = useSelector(state => state.nameUser)

    const [pokemons, setPokemons] = useState([])
    const [pokeSearch, setPokeSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filterPokemon, setFilterPokemon] = useState(undefined)
    const [typeList, setTypeList] = useState([])
    const [filterType, setFilterType] = useState('All Pokemons')
    const [isLoading, setIsLoading] = useState(true)

    const pokemonsPerPage = 6
    const pagesPerBlock = 5

    const navigate = useNavigate()
    const goHome = () => navigate('/')

    // Fetch Pokemon list based on filter type
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                if (filterType === 'All Pokemons') {
                    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100')
                    setPokemons(res.data.results)
                } else {
                    const res = await axios.get(`https://pokeapi.co/api/v2/type/${filterType}/`)
                    const filtered = res.data.pokemon.map(e => e.pokemon)
                    setPokemons(filtered)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [filterType])

    // Fetch list of types
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypeList(res.data.results))
            .catch(err => console.error(err))
    }, [])

    // Filter by search input
    useEffect(() => {
        if (pokeSearch) {
            setFilterPokemon(
                pokemons.filter(e => e.name.includes(pokeSearch.toLowerCase()))
            )
        } else {
            setFilterPokemon(undefined)
        }
    }, [pokeSearch, pokemons])

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1)
    }, [pokeSearch, filterType])

    // Pagination logic
    const dataSource = filterPokemon ?? pokemons
    const quantityPages = Math.ceil(dataSource.length / pokemonsPerPage)
    const lastIndex = currentPage * pokemonsPerPage
    const paginatedPokemons = dataSource.slice(lastIndex - pokemonsPerPage, lastIndex)

    const currentBlock = Math.ceil(currentPage / pagesPerBlock)
    const minPage = (currentBlock - 1) * pagesPerBlock + 1
    const maxPage = Math.min(currentBlock * pagesPerBlock, quantityPages)

    const arrayPages = []
    for (let i = minPage; i <= maxPage; i++) {
        arrayPages.push(i)
    }

    return (
        <div className='pokedex-main'>
            <div className='pokedex-letras'>
                <h1 className='pokedex-inside'>Pokedex</h1>
                <h2>Hi {nameUser}, welcome to Pokedex</h2>

                <SearchBar
                    setPokeSearch={setPokeSearch}
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
                {isLoading ? (
                    <Loader />
                ) : (
                    paginatedPokemons.map(pokemon => (
                        <PokeCard key={pokemon.url} url={pokemon.url} />
                    ))
                )}
            </div>

            <Footer />
        </div>
    )
}

export default PokedexScreen
