import { useRef, useEffect } from 'react';

/**
 * Custom Hook to warn user when trying to refresh page
 * that data might be lost.
 * Only applied in production mode to prevent hindering of development.
 * @param func
 */
 const useBeforeUnload = (func: (e: BeforeUnloadEvent) => void): void => {
  const element = useRef(func)

  useEffect(() => {
    const onUnload = element.current

    if (process.env.NODE_ENV === 'production') {
      window.addEventListener('beforeunload', onUnload)
      return () => window.removeEventListener('beforeunload', onUnload)
    }

  }, [element])
}

export default useBeforeUnload
