import React from 'react'
import { useEffect, useState } from 'react'
import { useScrollHandler } from './useScroll'
import useDebouncedCallback from './useDebounce'

function usePokemonCard() {
  // to get scroll action
  const [{ scrollX, scrollY }] = useScrollHandler()
  const [pageNum, setPageNum] = useState(1)

  const onScrollDebounce = useDebouncedCallback((newValue) => {
    setPageNum(pageNum + 1)
  }, 1000)

  useEffect(() => {
    if (!scrollY) return setPageNum(1)
    // @ts-ignore
    if (
      window.innerHeight + Math.round(scrollY) >=
      document.body.scrollHeight
    ) {
      onScrollDebounce()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY])

  return {
    pageNum
  }
}

export { usePokemonCard }
