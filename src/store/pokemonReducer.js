import { useEffect, useLayoutEffect } from 'react'
import React from 'react'

// @ts-ignore useContext
const PokemonContext = React.createContext()
PokemonContext.displayName = 'PokemonContext'

const usePokemonReducer = (state, action) => {
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
// app inject the provider
const PokemonProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(usePokemonReducer, {
    pokemonList: [],
    allPokemonNumber: 0,
    maxPageNum: 0
  })
  const value = [state, dispatch]
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  )
}

const usePokemonContext = () => {
  const context = React.useContext(PokemonContext)
  if (context === undefined) {
    throw new Error(` usePokemon must be used within a PokemonProvider`)
  }
  return context
}

let promise = []
// call promise
const updatedPokemon = (dispatch, { pageNum, showCardNum, maxPageNum }) => {
  const num = pageNum === 1 ? 1 : showCardNum * (pageNum - 1) + 1

  if (pageNum >= maxPageNum - 3 && maxPageNum !== 0) return
  promise = []
  for (let i = num; i <= showCardNum * pageNum; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promise.push(fetch(url).then((res) => res.json()))
  }
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
}

export { PokemonProvider, usePokemonContext, updatedPokemon }
