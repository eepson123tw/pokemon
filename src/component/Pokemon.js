import { useEffect, useLayoutEffect } from 'react'
import { getPokemon } from '../api/pokemon'
import LoadingCard from './LoadingCard'
import PokemonCard from './PokemonCard'
import React from 'react'
import { usePokemonCard } from '../utils/usePokemonCard'
import { usePokemonContext, updatedPokemon } from '../store/pokemonReducer'

export default function Pokemon() {
  // every time will get 50 card
  const showCardNum = 50
  const [{ pokemonList, allPokemonNumber, maxPageNum }, pokemonDispatch] =
    usePokemonContext()

  //TODO reload return to top?

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
    updatedPokemon(pokemonDispatch, {
      pageNum,
      showCardNum,
      maxPageNum,
      pokemonList
    })
  }, [pageNum])

  return (
    <div className='p-2'>
      <h2 className='uppercase antialiased  mb-4 font-mono text-4xl text-white oldstyle-nums  hover:text-blue-600'>
        pokemon list {allPokemonNumber}
      </h2>

      {!pokemonList.length && (
        <LoadingCard showCardNum={showCardNum}></LoadingCard>
      )}

      {pokemonList.length && (
        <PokemonCard pokemonList={pokemonList}></PokemonCard>
      )}
    </div>
  )
}
