import { Card, CardHeader } from '@mui/material'
import React from 'react'
import BannerForm from 'src/views/pages/banner'

const BannerAdd = () => {
  return (
    <Card>
      <CardHeader title='Add Banner' />
      <BannerForm type='Add' />
    </Card>
  )
}

export default BannerAdd
