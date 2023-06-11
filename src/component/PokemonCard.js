import React from 'react'

export default function PokemonCard({ pokemonList }) {
  return (
    <ul className='grid grid-cols-1 gap-3 md:grid-cols-5 xl:grid-cols-6 sm:grid-cols-2 cursor-pointer '>
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
  )
}
