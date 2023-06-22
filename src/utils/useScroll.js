import * as React from 'react'
import { useEffect, useState } from 'react'

const isWindowAvailable = typeof window !== 'undefined'

/**
 * to observer the scroll event
 */
function useScrollHandler() {
  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 })
  // @ts-ignore
  useEffect(() => {
    if (!isWindowAvailable) {
      return false
    }
    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return [scrollPosition]
}

export { useScrollHandler }
