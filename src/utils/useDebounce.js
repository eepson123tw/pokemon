import React from 'react'

/**
 * to debounce any action which will be triggered usually.
 */

const useDebouncedCallback = (callback, delay, dependencies) => {
  const timeout = React.useRef()

  // Avoid error about spreading non-iterable (undefined)
  const comboDeps = dependencies
    ? [callback, delay, ...dependencies]
    : [callback, delay]

  return React.useCallback((...args) => {
    if (timeout.current != null) {
      clearTimeout(timeout.current)
    }

    // @ts-ignore
    timeout.current = setTimeout(() => {
      callback(...args)
    }, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, comboDeps)
}

export default useDebouncedCallback
