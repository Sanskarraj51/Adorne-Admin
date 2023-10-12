import { Card, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FallbackSpinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/store'
import { fetchBannerData } from 'src/store/apps/product'
import BannerForm from 'src/views/pages/banner'

const BannerEdit = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  async function getBanners() {
    setLoading(true)
    await dispatch(fetchBannerData())
    setLoading(false)
  }

  useEffect(() => {
    getBanners()
  }, [])

  if (loading) {
    return <FallbackSpinner />
  }

  return (
    <Card>
      <CardHeader title='Edit Banner' />
      <BannerForm type='Edit' />
    </Card>
  )
}

export default BannerEdit
