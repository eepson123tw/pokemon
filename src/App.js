import Pokemon from './component/Pokemon'
import { useState } from 'react'
import React from 'react'
import { PokemonProvider } from './store/pokemonReducer'

function App() {
  const [randomColor, serRandoColor] = useState(0)
  const colorComputed = (offset) => {
    serRandoColor(Math.round(offset) % 255)
  }

  return (
    <div style={{ background: `hsl(${randomColor},60%,70%)` }} className='app'>
      <PokemonProvider>
        <Pokemon randomColor={randomColor} onScroll={colorComputed}></Pokemon>
      </PokemonProvider>
    </div>
  )
}

export default App
