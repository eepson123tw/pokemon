import React, { useEffect } from 'react'
import { useState } from 'react'
import { useScrollHandler } from './utils/useScroll'
import { PokemonProvider } from './store/pokemonReducer'
import RecommendModal from './component/modal/RecommendModal'

const ScrollDirection = React.lazy(() =>
  import('./component/ScrollDirection.js')
)
const Pokemon = React.lazy(() => import('./component/Pokemon'))

const RecommendModalMemo = React.memo(RecommendModal)

function App() {
  const [randomColor, serRandoColor] = useState(0)
  const [{ scrollX, scrollY }] = useScrollHandler()
  const colorComputed = (offset) => {
    serRandoColor(Math.round(offset) % 255)
  }

  useEffect(() => {
    colorComputed(scrollY)
    return () => {
      colorComputed(0)
    }
  }, [scrollY])

  return (
    <>
      <PokemonProvider>
        <div
          style={{ background: `hsl(${randomColor},60%,70%)` }}
          className='app'
        >
          <Pokemon></Pokemon>
          <ScrollDirection></ScrollDirection>
        </div>
        <RecommendModalMemo></RecommendModalMemo>
      </PokemonProvider>
    </>
  )
}

export default App
