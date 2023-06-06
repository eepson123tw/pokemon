import { useEffect, useState } from 'react'
import { getPokemon } from '../api/pokemon'
import { useScrollHandler } from '../utils/scroll'
import useDebouncedCallback from '../utils/debounce'
import React from 'react'

export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonNum, setPokemonNum] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [maxPageNum, setMaxPageNum] = useState(0)
  const showCardNum = 50
  const emptyList = new Array(showCardNum).fill('')
  const [offset] = useScrollHandler()
  let promise = []

  const onScrollDebounce = useDebouncedCallback((newValue) => {
    setPageNum(pageNum + 1)
  }, 1000)

  const fn = (list) => {
    // @ts-ignore
    setPokemonList([...pokemonList, ...list])
  }

  useEffect(() => {
    // @ts-ignore
    if (window.innerHeight + Math.round(offset) >= document.body.scrollHeight) {
      onScrollDebounce()
    }
  }, [offset])

  useEffect(() => {
    const num = pageNum === 1 ? 1 : showCardNum * (pageNum - 1) + 1
    if (pageNum === maxPageNum) return
    for (let i = num; i <= showCardNum * pageNum; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`
      promise.push(fetch(url).then((res) => res.json()))
    }
    // @ts-ignore
    Promise.all(promise).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
      }))
      fn(pokemon)
    })
  }, [pageNum])

  useEffect(() => {
    getPokemon().then((res) => {
      setPokemonNum(res.length)
      setMaxPageNum(() => Math.round(pokemonNum / 50))
    })
    return () => {
      setPokemonList([])
      setPokemonNum(0)
    }
  }, [])

  return (
    <div className='p-2'>
      <h2 className='mb-4 font-serif text-4xl text-white'>
        pokemon list {pokemonNum}
      </h2>
      <ul className='grid grid-cols-6 gap-3'>
        {!pokemonList.length &&
          emptyList.map((d, i) => (
            <li
              key={i}
              className=' bg-white border border-blue-300 shadow rounded-md p-4 h-[200px]'
            >
              <div className='animate-pulse flex  flex-col items-center h-[100%]'>
                <p className='w-full rounded h-4 bg-slate-300 mb-2'></p>
                <p className='w-full rounded  bg-slate-300 h-3 basis-5/6'></p>
              </div>
            </li>
          ))}
      </ul>
      <ul className='grid grid-cols-6 gap-3'>
        {pokemonList.length &&
          pokemonList.map((pokemon, idx) => (
            <li
              className='flex justify-center flex-col text-center text-gray-700 font-medium bg-white border border-blue-300 shadow rounded-md p-5 max-h-[250px]'
              key={pokemon.name + idx}
            >
              <p>{pokemon.name}</p>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className='block w-auto'
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
