import React from 'react'
import PokemonItem from './PokemonItem.js'

const PokemonMemo = React.memo(PokemonItem, (prevProps, nextProps) => {
  // @ts-ignore
  if (prevProps.noNeedToReRender !== nextProps.noNeedToReRender) return false
  return true
})
export default function PokemonCard({ pokemonList }) {
  return (
    <ul className='grid grid-cols-1 gap-3 md:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 cursor-pointer '>
      {pokemonList.map((pokemon, idx) => (
        <PokemonMemo pokemon={pokemon} idx={idx} key={idx}></PokemonMemo>
      ))}
    </ul>
  )
}
