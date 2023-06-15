import React from 'react'
import { useEffect, useState } from 'react'
import { useScrollHandler } from '../utils/scroll'
import useDebouncedCallback from '../utils/debounce'

function usePokemonCard({ onScroll }) {
  // to get scroll action
  const [offset] = useScrollHandler()
  const [pageNum, setPageNum] = useState(1)

  const onScrollDebounce = useDebouncedCallback((newValue) => {
    setPageNum(pageNum + 1)
  }, 1000)

  useEffect(() => {
    if (!offset) return setPageNum(1)
    // @ts-ignore
    if (window.innerHeight + Math.round(offset) >= document.body.scrollHeight) {
      onScrollDebounce()
    }
    onScroll(offset)
  }, [offset])

  return {
    pageNum
  }
}

export { usePokemonCard }
