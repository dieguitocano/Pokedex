import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const SearchBar = ({setPokeSearch, typeList, setFilterType, goHome}) => {


  const changeInputText = e => {
     setPokeSearch(e.target.value)
  }

  const changeSelect = e => {
    setFilterType(e.target.value)
  }


  

  return (
    <section className='webdesigntuts-workshop'>
      <form className="searchbar" >
        <input 
        placeholder="type your Pokemon" 
        className="input" type="text"
        onChange={changeInputText}
        />
       

        <select className='select' onChange={changeSelect}>
          <option value="All Pokemons">All Pokemons</option>
          {
            typeList?.map(type => (
              <option key={type.name} value={type.name}>{type.name}</option>
            ))
          }

        </select>
        <button className='webdesigntuts-workshop' onClick={goHome}>Sign out</button>
      </form>
    </section>
  )
}

export default SearchBar