import { useEffect, useState } from 'react'
import { getPokemon } from '../api/pokemon'
import React from 'react'
export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonNum, setPokemonNum] = useState(0)
  const emptyList = new Array(50).fill('')
  console.log(emptyList)
  let promise = []
  useEffect(() => {
    getPokemon().then((res) => {
      promise = []
      for (let i = 1; i <= 20; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promise.push(fetch(url).then((res) => res.json()))
      }
      Promise.all(promise).then((results) => {
        console.log({ results })
        const pokemon = results.map((result) => ({
          name: result.name,
          image: result.sprites['front_default'],
          type: result.types.map((type) => type.type.name).join(', '),
          id: result.id
        }))
        setPokemonList(pokemon)
      })
      setPokemonNum(res.length)
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
      <ul className='grid grid-cols-9 gap-6'>
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
      {/* <ul className='flex flex-wrap justify-center'>
        {pokemonList.length &&
          pokemonList.map((pokemon, idx) => (
            <li
              className='m-2 text-center text-gray-700 font-medium p-2 bg-white'
              key={pokemon.name + idx}
            >
              <p>{pokemon.name}</p>
              <img src={pokemon.image} alt={pokemon.name} />
            </li>
          ))}
      </ul> */}
    </div>
  )
}
