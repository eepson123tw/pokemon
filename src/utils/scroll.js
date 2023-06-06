import * as React from 'react'
import { useEffect, useState } from 'react'
/**
 * to observer the scroll event
 */

const debounce = (func, wait = 200) => {
  let timeout // for the setTimeout function and so it can be cleared
  return function executedFunction(...args) {
    // the function returned from debounce
    const later = () => {
      // this is the delayed function
      clearTimeout(timeout) // clears the timeout when the function is called
      func(...args) // calls the function
    }
    clearTimeout(timeout) // this clears the timeout each time the function is run again preventing later from running until we stop calling the function
    timeout = setTimeout(later, wait) // this sets the time out to run after the wait period
  }
}

const isWindowAvailable = typeof window !== 'undefined'
const getPosition = () => (isWindowAvailable ? window.pageYOffset : undefined)

function useScrollHandler() {
  const [scrollPosition, setScrollPosition] = useState(getPosition())

  // @ts-ignore
  useEffect(() => {
    if (!isWindowAvailable) {
      return false
    }

    const handleScroll = () => setScrollPosition(getPosition())

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [scrollPosition]
}

export { useScrollHandler }
