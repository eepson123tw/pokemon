import { useEffect, useState } from 'react'
import { getPokemon } from '../api/pokemon'
import { useScrollHandler } from '../utils/scroll'
import useDebouncedCallback from '../utils/debounce'
import React from 'react'

export default function Pokemon({ randomColor, onScroll }) {
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
    if (pageNum === 1) {
      return setPokemonList(list)
    }
    // @ts-ignore
    setPokemonList([...pokemonList, ...list])
  }

  useEffect(() => {
    // @ts-ignore
    if (window.innerHeight + Math.round(offset) >= document.body.scrollHeight) {
      onScrollDebounce()
    }
    onScroll(offset)
    // colorComputed(offset)
  }, [offset])

  useEffect(() => {
    const num = pageNum === 1 ? 1 : showCardNum * (pageNum - 1) + 1
    if (pageNum < maxPageNum - 3) return
    promise = []
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
      <ul className='grid grid-cols-1 gap-3 md:grid-cols-5 xl:grid-cols-6 sm:grid-cols-2'>
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
      <ul className='grid grid-cols-1 gap-3 md:grid-cols-5 xl:grid-cols-6 sm:grid-cols-2  '>
        {pokemonList.length &&
          pokemonList.map((pokemon, idx) => (
            <li
              className='flex justify-center items-center flex-col text-center text-gray-700 font-medium bg-white border border-blue-300 shadow rounded-md p-2 max-h-[150px] uppercase hover:border-pink-700 hover:bg-black ease-linear duration-300 hover:text-yellow-100'
              key={pokemon.name + idx}
            >
              <p className='text-base'>{pokemon.name}</p>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className='block w-auto '
              />
            </li>
          ))}
      </ul>
      {pageNum < 22 && (
        <p className='animate-bounce w-6 h-6 rounded-full text-center bg-black text-white border border-purple-200 fixed bottom-2 left-1/2 '>
          ↓
        </p>
      )}
    </div>
  )
}
