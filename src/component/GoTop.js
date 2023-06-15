import React from 'react'

export default function GoTop(ref) {
  const buttonRef = React.useRef()
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className='fixed bottom-4 right-4 p-2 bg-slate-500 text-white rounded hover:text-yellow-300 hover:bg-black  ease-in duration-300'
      >
        Go Top
      </button>
    </>
  )
}
