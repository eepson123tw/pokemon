import * as React from 'react'
import { useEffect, useState } from 'react'

const isWindowAvailable = typeof window !== 'undefined'
const getPosition = () => (isWindowAvailable ? window.pageYOffset : undefined)

/**
 * to observer the scroll event
 */
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
