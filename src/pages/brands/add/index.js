import { Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import AddBrandForm from 'src/views/pages/brand/AddBrandForm'

const AddBrands = () => {
  return (
    <Card>
      <CardHeader title='Add Brand' />
      <CardContent>
        <AddBrandForm />
      </CardContent>
    </Card>
  )
}

export default AddBrands
