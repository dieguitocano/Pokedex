import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './components/home/HomeScreen'
import PokedexScreen from './components/pokedex/PokedexScreen'

function App() {

  


  return (
    <div className="App">
     
      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/pokedex' element={<PokedexScreen />}></Route>
      </Routes>

    </div>
  )
}

export default App
