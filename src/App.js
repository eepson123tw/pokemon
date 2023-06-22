import React from 'react'
import Pokemon from './component/Pokemon'
// import GoTop from './component/GoTop'
import { useState } from 'react'
import { PokemonProvider } from './store/pokemonReducer'

function App() {
  const [randomColor, serRandoColor] = useState(0)
  const colorComputed = (offset) => {
    serRandoColor(Math.round(offset) % 255)
  }

  return (
    <PokemonProvider>
      <div
        style={{ background: `hsl(${randomColor},60%,70%)` }}
        className='app'
      >
        <Pokemon randomColor={randomColor} onScroll={colorComputed}></Pokemon>
        {/* <GoTop></GoTop> */}
      </div>
    </PokemonProvider>
  )
}

export default App
