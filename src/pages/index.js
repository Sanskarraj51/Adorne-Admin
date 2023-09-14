import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  // const { data, isLoading, error } = UseFetchData(url)

  useEffect(() => {
    let url = '/dashboards/ecommerce'
    router.replace(url)
  }, [])

  return <>Home Page</>
}

export default Home
