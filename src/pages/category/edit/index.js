import { Button, Card, CardContent, CardHeader } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import IconifyIcon from 'src/@core/components/icon'

import AddCategoryForm from 'src/views/pages/category/AddCategoryForm'

const EditCategory = () => {
  return (
    <Card>
      <CardHeader
        title='Edit Category'
        action={
          <Button component={Link} href='/category' startIcon={<IconifyIcon icon='mdi:arrow-left' />}>
            Back to Categories page
          </Button>
        }
      />
      <CardContent>
        <AddCategoryForm type='Edit' />
      </CardContent>
    </Card>
  )
}

export default EditCategory
