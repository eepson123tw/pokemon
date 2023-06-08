import Pokemon from './component/Pokemon'
import { useState } from 'react'
import React from 'react'
function App() {
  const [randomColor, serRandoColor] = useState(0)
  const colorComputed = (offset) => {
    serRandoColor(Math.round(offset) % 255)
  }

  return (
    <div style={{ background: `hsl(${randomColor},60%,70%)` }}>
      <Pokemon randomColor={randomColor} onScroll={colorComputed}></Pokemon>
    </div>
  )
}

export default App
