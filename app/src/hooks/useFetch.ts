import { useState, useCallback } from 'react'

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [response, setResponse] = useState<any>(null)

  const doFetch = useCallback(
    (promise: Promise<any>) => {
      setIsLoading(true)

      promise
        .then(res => setResponse(res.data))
        .catch(e => setError(e))
        .finally(() => setIsLoading(false))
    }, [])

  return {response, isLoading, error, doFetch}
}
