import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const SearchBar = ({setPokeSearch}) => {


  const changeInputText = e => {
     setPokeSearch(e.target.value)
  }


  

  return (
    <section className='webdesigntuts-workshop'>
      <form className="searchbar" >
        <input 
        placeholder="type your Pokemon" 
        className="input" type="text"
        onChange={changeInputText}
        />
        <button className="search-button">GO</button>
      </form>
    </section>
  )
}

export default SearchBar