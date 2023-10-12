import React from 'react'
import FallbackSpinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/store'
import { fetchBlogData } from 'src/store/apps/product'
import AddBlogs from '../add'
import { useState } from 'react'
import { useEffect } from 'react'

const EditBlog = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  async function getBlogs() {
    setLoading(true)
    await dispatch(fetchBlogData())
    setLoading(false)
  }

  useEffect(() => {
    getBlogs()
  }, [dispatch])

  if (loading) {
    return <FallbackSpinner />
  }

  return <AddBlogs type='Edit' />
}

export default EditBlog
