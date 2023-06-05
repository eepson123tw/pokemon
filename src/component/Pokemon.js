import { useEffect, useState } from 'react'
import { getPokemon } from '../api/pokemon'
import React from 'react'
export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonNum, setPokemonNum] = useState(0)
  let promise = []
  useEffect(() => {
    getPokemon().then((res) => {
      promise = []
      for (let i = 1; i <= 200; i++) {
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

  console.log(pokemonList)
  return (
    <div className='p-2'>
      <h2 className='mb-4 font-serif text-4xl text-white'>
        pokemon list {pokemonNum}
      </h2>
      <ul className='flex flex-wrap justify-center'>
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
      </ul>
    </div>
  )
}
