import React, { useEffect } from 'react'
import { useScrollHandler } from '../utils/useScroll'
export default function GoTop(ref) {
  const buttonRef = React.useRef()

  const [{ scrollX, scrollY }] = useScrollHandler()

  const scrollTo = (direction) => {
    window.scrollTo({
      top: direction === 'top' ? 0 : document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => scrollTo(scrollY > 200 ? 'top' : 'bottm')}
        className='fixed bottom-4 right-4 p-2 bg-slate-500 text-white rounded hover:text-yellow-300 hover:bg-black  ease-in duration-300'
      >
        {scrollY > 200 ? 'Go Top' : 'Go Bottom'}
      </button>
    </>
  )
}
