import React, { useState } from 'react'

export default function PokemonCard({ pokemonList }) {
  const pokemonImageHandler = (map, e) => {
    let keyList = Object.keys(map).filter((key) => key.includes('ani'))
    let randomIdx = Math.floor(Math.random() * keyList.length)
    const target = e.target
    const fn = () => {
      if (!target.querySelector('img')) return
      target.querySelector('img').src = map[keyList[randomIdx]].value
    }
    map[keyList[randomIdx]] && fn()
  }
  const [isLoading, setIsLoading] = useState(true)
  const onLoad = () => {
    setTimeout(() => setIsLoading(true), 1000)
  }
  return (
    <ul className='grid grid-cols-1 gap-3 md:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 cursor-pointer '>
      {pokemonList.map((pokemon, idx) => (
        <li
          className='h-[200px] flex justify-center items-center flex-col text-center text-gray-700 font-medium bg-white border border-blue-300 shadow rounded-md p-2 max-h-[150px] uppercase hover:border-pink-700 hover:bg-black ease-linear duration-300 hover:text-yellow-100'
          key={pokemon.name + idx}
          onClick={(e) => pokemonImageHandler(pokemon.image, e)}
        >
          <p className='text-base mb-2'>{pokemon.name}</p>
          <div className='w-[50px] h-[50px] '>
            <p
              className='w-full rounded  bg-slate-300 h-[50px] animate-pulse'
              style={{ display: isLoading ? 'none' : 'block' }}
            ></p>
            <img
              loading='lazy'
              src={pokemon.image['animated-front_default'].value}
              alt={pokemon.name}
              className='block object-contain w-[50px] h-[50px]'
              style={{ display: isLoading ? 'block' : 'none' }}
              onLoad={onLoad}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
