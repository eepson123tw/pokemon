import { useEffect, useLayoutEffect } from 'react'
import { getPokemon } from '../api/pokemon'
import LoadingCard from './LoadingCard'
import PokemonCard from './PokemonCard'
import React from 'react'
import { usePokemonCard } from '../utils/getPokemonCard'

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'init': {
      return {
        pokemonList: [],
        allPokemonNumber: action.allPokemonNumber,
        maxPageNum: action.maxPageNum
      }
    }
    case 'resolved': {
      return {
        ...state,
        pokemonList:
          action.pageNum === 1
            ? action.pokemonList
            : [...state.pokemonList, ...action.pokemonList]
      }
    }
    case 'rejected': {
      return { pokemonList: [], allPokemonNumber: 0, maxPageNum: 0 }
    }
    default: {
      break
    }
  }
}

export default function Pokemon({ onScroll }) {
  // every time will get 50 card
  const showCardNum = 50
  // main api to get data
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    pokemonList: [],
    allPokemonNumber: 0,
    maxPageNum: 0
  })
  const { pokemonList, allPokemonNumber, maxPageNum } = state

  // init card data
  useLayoutEffect(() => {
    getPokemon().then((res) => {
      // @ts-ignore
      dispatch({
        type: 'init',
        allPokemonNumber: res.length,
        maxPageNum: Math.round(res.length / 50)
      })
    })
    return () => {
      // @ts-ignore
      dispatch({ type: 'rejected' })
    }
  }, [])

  // get card current page
  const { pageNum } = usePokemonCard({
    onScroll
  })

  let promise = []

  // get card info
  useEffect(() => {
    const num = pageNum === 1 ? 1 : showCardNum * (pageNum - 1) + 1

    if (pageNum >= maxPageNum - 3 && maxPageNum !== 0) return
    promise = []
    for (let i = num; i <= showCardNum * pageNum; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`
      promise.push(fetch(url).then((res) => res.json()))
    }
    // TODO make the loading performance more better
    Promise.all(promise)
      .then((results) => {
        const pokemon = results.map((result) => ({
          name: result.name,
          image: result.sprites['front_default'],
          type: result.types.map((type) => type.type.name).join(', '),
          id: result.id
        }))
        // @ts-ignore
        dispatch({
          type: 'resolved',
          pokemonList: pokemon,
          pageNum
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [pageNum])

  return (
    <div className='p-2'>
      <h2 className='mb-4 font-serif text-4xl text-white'>
        pokemon list {allPokemonNumber}
      </h2>
      {!pokemonList.length && (
        <LoadingCard showCardNum={showCardNum}></LoadingCard>
      )}

      {pokemonList.length && (
        <PokemonCard pokemonList={pokemonList}></PokemonCard>
      )}

      {pageNum <= 21 && (
        <p className='animate-bounce w-6 h-6 rounded-full text-center bg-black text-white border border-purple-200 fixed bottom-2 left-1/2 '>
          ↓
        </p>
      )}
    </div>
  )
}
