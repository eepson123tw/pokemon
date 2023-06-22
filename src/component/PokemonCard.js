import React from 'react'

export default function PokemonCard({ pokemonList }) {
  // const [hasLoaded, setLoaded] = React.useState(false)
  // const onLoad = () => {
  //   setLoaded(true)
  // }

  return (
    <ul className='grid grid-cols-1 gap-3 md:grid-cols-5 xl:grid-cols-6 sm:grid-cols-2 cursor-pointer '>
      {pokemonList.map((pokemon, idx) => (
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
          {/* {!hasLoaded && (
            <div className='animate-pulse flex flex-col w-[100px] items-center h-[250px] '>
              <p className='w-full rounded  bg-slate-300 h-[100%] basis-5/6 mt-2'></p>
            </div>
          )} */}
        </li>
      ))}
    </ul>
  )
}
