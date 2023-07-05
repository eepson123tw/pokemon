// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { getPokemonInfo } from '../../api/pokemon'
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
export default function RecommendModal() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 1100)
      setShowModal(true)
      showModal &&
        getPokemonInfo(randomNum)
          .then((res) =>
            setData({
              name: res.name,
              image: mapReducer(res.sprites),
              type: res.types.map((type) => type.type.name).join(', '),
              id: res.id
            })
          )
          .catch((err) => {
            setData({})
          })
    }, 2000)
  }, [showModal])

  //TODO badge can use random
  return (
    <>
      {showModal && data.name && (
        <div
          onClick={() => setShowModal(false)}
          role='status'
          className='text-center border-cyan-500 border-4 fixed top-[50%] left-[50%] bg-white/90  w-[60vw] h-[70vh] -translate-x-1/2 -translate-y-1/2 rounded p-4'
        >
          <h2 className='text-xl md:text-2xl  uppercase '>Daily Recommend</h2>
          <p className='my-4 text-2xl md:text-5xl uppercase'>{data?.name}</p>
          <p className='my-4 text-sm md:text-xl uppercase '>id:{data?.id}</p>
          <img
            loading='lazy'
            src={data?.image['front_default']?.value}
            alt={data.name}
            className='m-auto block object-contain  md:w-[200px] md:h-[200px]  inset-0 transform hover:animate-[wave_5s_ease-in-out_2]  transition duration-300'
          />
          {data.type.split(',').map((item, i) => (
            <span
              key={i}
              className='inline-flex items-center rounded-md bg-pink-50 p-2 uppercase text-xs md:text-xl mx-1 font-medium text-pink-600 ring-1 ring-inset ring-gray-500/10'
            >
              {item}
            </span>
          ))}
          <p className='text-left md:text-xl text-base mt-4'>
            今日推薦給你的神奇寶貝是 {data?.name}
            ！這隻神奇寶貝絕對是你的最佳夥伴。它擁有令人驚嘆的能力和特殊技能，能在戰鬥中助你一臂之力。不僅如此，
            {data?.name}{' '}
            還具有可愛的外貌和迷人的個性，絕對能成為你生活中的最佳寶貝！快來體驗這個神奇寶貝帶給你的冒險和樂趣吧！
          </p>
        </div>
      )}
    </>
  )
}
