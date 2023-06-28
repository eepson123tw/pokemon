import React from 'react'
import { getPokemonInfo, getPokemonDetail } from '../api/pokemon'
import Pokemon from '../component/Pokemon'
// @ts-ignore useContext
const PokemonContext = React.createContext()
PokemonContext.displayName = 'PokemonContext'

const actionTypes = {
  init: 'init',
  pending: 'pending',
  resolved: 'resolved',
  reset: 'reset'
}

const usePokemonReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.init: {
      return {
        pokemonList: [],
        allPokemonNumber: action.allPokemonNumber,
        maxPageNum: action.maxPageNum,
        status: ''
      }
    }
    case actionTypes.pending: {
      return {
        ...state,
        status: action.status
      }
    }
    case actionTypes.resolved: {
      return {
        ...state,
        status: action.status,
        pokemonList:
          action.pageNum === 1
            ? action.pokemonList
            : [...state.pokemonList, ...action.pokemonList]
      }
    }
    case actionTypes.reset: {
      return { pokemonList: [], allPokemonNumber: 0, maxPageNum: 0, status: '' }
    }
    default: {
      throw new Error(`Unsupported type: ${action.type}`)
    }
  }
}
// app inject the provider
const PokemonProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(usePokemonReducer, {
    pokemonList: [],
    allPokemonNumber: 0,
    maxPageNum: 0,
    status: ''
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

const mapReducer = (res) => {
  const map = {}
  const recursioneFn = (obj, res, column = '') => {
    Object.keys(res).reduce((acc, cur, idx) => {
      if (res[cur] && typeof res[cur] === 'string') {
        acc[column + cur] = { value: res[cur], idx }
      } else {
        res[cur] && recursioneFn(acc, res[cur], cur + '-')
      }
      return acc
    }, obj)
  }
  recursioneFn(map, res)
  return map
}

// call api to get pokemonList
let promise = []
let infoPromise = []
const updatedPokemon = async (
  dispatch,
  { pageNum, showCardNum, maxPageNum }
) => {
  const num = pageNum === 1 ? 1 : showCardNum * (pageNum - 1) + 1
  const filterLan = (list, language) => {
    return (idx) => {
      return list[idx].flavor_text_entries.filter(
        (item) => item.language.name === language
      )
    }
  }
  if (pageNum >= maxPageNum && maxPageNum !== 0) return
  promise = []
  infoPromise = []
  for (let i = num; i <= showCardNum * pageNum; i++) {
    promise.push(getPokemonInfo(i))
    infoPromise.push(getPokemonDetail(i))
  }
  dispatch({
    type: 'pending',
    status: 'pending'
  })

  try {
    let res = await Promise.all(promise).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: mapReducer(result.sprites),
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
      }))
      return pokemon
    })

    res = await Promise.all(infoPromise).then((results) => {
      const twPokemonNameList = filterLan(results, 'zh-Hant')
      const pokemon = results.map((result, idx) => ({
        ...res[idx],
        name: result.names[3].name,
        words: twPokemonNameList(idx)[0]
      }))
      return pokemon
    })
    dispatch({
      type: 'resolved',
      pokemonList: res,
      pageNum,
      status: 'success'
    })
  } catch (error) {
    console.log(error)
  }
}

export { PokemonProvider, usePokemonContext, updatedPokemon }
