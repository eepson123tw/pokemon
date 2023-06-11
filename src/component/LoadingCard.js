import React from 'react'

export default function LoadingCard({ showCardNum }) {
  const emptyList = new Array(showCardNum).fill('')

  return (
    <ul className='grid grid-cols-1 gap-3 md:grid-cols-5 xl:grid-cols-6 sm:grid-cols-2'>
      {emptyList.map((d, i) => (
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
  )
}
