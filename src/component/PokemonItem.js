import React from 'react'

function PokemonItem({ pokemon, idx }) {
  const pokemonImageHandler = (map, e) => {
    let keyList = Object.keys(map).filter((key) => key.includes('ani'))
    let randomIdx = Math.floor(Math.random() * keyList.length)
    const target = e.target
    const setImgSrc = () => {
      if (!target.querySelector('img')) return
      target.querySelector('img').src = map[keyList[randomIdx]].value
    }
    if (!keyList.length) return
    map[keyList[randomIdx]] && setImgSrc()
  }
  return (
    <li
      className='min-h-[200px] w-[100%] flex items-center flex-col text-center text-gray-700 font-medium bg-white border border-blue-300 shadow rounded-md p-2 max-h-[150px] uppercase hover:border-pink-700 hover:bg-black ease-linear duration-300 hover:text-yellow-100'
      key={pokemon.name + idx}
      onClick={(e) => pokemonImageHandler(pokemon.image, e)}
    >
      <p className='text-base mb-2'>{pokemon.name}</p>
      <div className='w-[50px] h-[50px] relative mb-2'>
        <img
          loading='lazy'
          src={
            pokemon?.image['animated-front_default']?.value ||
            pokemon?.image['front_default'].value
          }
          alt={pokemon.name}
          className='block object-contain w-[50px] h-[50px]  inset-0 transform hover:animate-[wave_5s_ease-in-out_2]  transition duration-300'
        />
      </div>
      <p className='overflow-ellipsis overflow-hidden  w-full px-1'>
        {pokemon.words &&
          pokemon.words.flavor_text &&
          pokemon.words.flavor_text}
      </p>
      {!pokemon.words && <p>無中文說明</p>}
    </li>
  )
}

export default PokemonItem
