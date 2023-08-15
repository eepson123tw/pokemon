import {
  useEffect,
  useLayoutEffect,
  useRef,
  Suspense,
  lazy,
  useState
} from 'react'
import { getPokemon } from '../api/pokemon'
import React from 'react'
import LoadingCircle from './LoadingCircle'
import { usePokemonCard } from '../utils/usePokemonCard'
import { usePokemonContext, updatedPokemon } from '../store/pokemonReducer'
const LoadingCard = lazy(() => import('./LoadingCard'))
const PokemonCard = lazy(() => import('./PokemonCard'))
const LoadingCircleMemo = React.memo(LoadingCircle)

export default function Pokemon() {
  // every time will get 50 card
  const showCardNum = 50
  const [
    { pokemonList, allPokemonNumber, maxPageNum, status },
    pokemonDispatch
  ] = usePokemonContext()

  const [loading, setLoading] = useState(true)
  // init card data
  useLayoutEffect(() => {
    getPokemon().then((res) => {
      // @ts-ignore
      pokemonDispatch({
        type: 'init',
        allPokemonNumber: res.length,
        maxPageNum: 21
      })
    })
    return () => {
      // @ts-ignore
      pokemonDispatch({ type: 'reset' })
    }
  }, [])

  // get card current page and scroll page
  const { pageNum } = usePokemonCard()

  useEffect(() => {
    if (maxPageNum && pageNum) {
      updatedPokemon(pokemonDispatch, {
        pageNum,
        showCardNum,
        maxPageNum
      })
    }
  }, [pageNum])

  useEffect(() => {
    if (status === 'success') {
      setLoading(false)
    }
    if (status === 'pending') {
      setLoading(true)
    }
  }, [status])

  return (
    <div className='p-2 h-full font-zpix'>
      <h2 className='uppercase antialiased  mb-4  text-4xl text-white oldstyle-nums  hover:text-blue-600 inline-block'>
        pokemon list {allPokemonNumber}
      </h2>
      <React.Suspense fallback={<></>}>
        {pokemonList.length === 0 && (
          <LoadingCard showCardNum={showCardNum}></LoadingCard>
        )}
        {pokemonList.length !== 0 && (
          <PokemonCard pokemonList={pokemonList}></PokemonCard>
        )}
      </React.Suspense>
      <LoadingCircleMemo loading={loading}></LoadingCircleMemo>
    </div>
  )
}
