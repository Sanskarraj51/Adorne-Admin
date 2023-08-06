import { Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Image from 'next/image'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { Box } from '@mui/system'
import CustomChip from 'src/@core/components/mui/chip'
import { itemData } from '../banner-settings'


export const tableStyles = {
  '& .MuiDataGrid-columnHeaders': {
    bgcolor: '#0E2366',
    color: 'white'
  }
}

export const userStatusObj = {
  'In Stock': 'success',
  pending: 'warning',
  Inactive: 'secondary'
}
const brandStatusObj = {
  'In Stock': 'primary',
  pending: 'warning',
  Inactive: 'secondary'
}

const columns = [
  {
    flex: 0.12,
    field: 'images',
    minWidth: 150,
    headerName: 'Banner',
    renderCell: ({ row }) => (
      <Box sx={{ py: 1 }}>
        <Image src={row.img} alt='' width={120} height={90} style={{ objectFit: 'contain' }} />
      </Box>
    )
  },
  {
    flex: 0.18,
    minWidth: 150,
    field: 'title',
    headerName: 'Name',
    renderCell: ({ row }) => <Typography>{row?.title}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'Description',
    headerName: 'Description',
    renderCell: ({ row }) => <Typography>{row?.title}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'price',
    headerName: 'Price',
    renderCell: ({ row }) => <Typography>$100</Typography>
  },

  {
    flex: 0.1,
    minWidth: 120,
    field: 'category',
    headerName: 'Category',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label='Tech'
          color={brandStatusObj[row.status]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    }
  },

  {
    flex: 0.1,
    minWidth: 120,
    field: 'brand',
    headerName: 'Brand',
    renderCell: ({ row }) => {
      return <Typography>Tech Trox</Typography>
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'status',
    headerName: 'Stock',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Edit'>
          <IconButton color='primary' component={Link} href={`/products/${row?.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={27} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete Banner'>
          <IconButton color='error'>
            <Icon icon='mdi:delete-outline' fontSize={27} />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
]

const Products = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const rowData = itemData?.map((item, i) => {
    return {
      ...item,
      id: i,
      status: 'In Stock'
    }
  })

  return (
    <Card>
      <CardHeader
        title='Products page'
        action={
          <Link href='/products/add'>
            <Button variant='contained'>Add Products</Button>
          </Link>
        }
      />
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rowData}
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, ...tableStyles }}
        />{' '}
      </CardContent>
    </Card>
  )
}

export default Products
