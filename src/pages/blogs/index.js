import { Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Image from 'next/image'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { Box } from '@mui/system'
import CustomChip from 'src/@core/components/mui/chip'
import { tableStyles } from '../products'

export const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats'
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey'
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball'
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern'
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms'
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil'
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star'
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike'
  }
]

const userStatusObj = {
    Active: 'success',
    pending: 'warning',
    Inactive: 'secondary'
  }


  const columns = [
    {
      flex: 0.2,
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
      flex: 0.3,
      minWidth: 200,
      field: 'title',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography>{row?.title}</Typography>
    },
    {
      flex: 0.4,
      minWidth: 200,
      field: 'Description',
      headerName: 'Description',
      renderCell: ({ row }) => <Typography>{row?.title}</Typography>
    },
  
    {
      flex: 0.1,
      minWidth: 120,
      field: 'status',
      headerName: 'Status',
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
            <IconButton  color='primary' component={Link} href={`/brand/add`}>
              <Icon icon='mdi:pencil-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Banner'>
            <IconButton color='error' >
              <Icon icon='mdi:delete-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]
const Blogs = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const rowData = itemData?.map((item, i) => {
    return {
      ...item,
      id: i,
      status: 'Active'
    }
  })

  return (
    <Card>
      <CardHeader
        title='Blogs Page'
        action={
          <Link href='/blogs/add'>
            <Button variant='contained'>Add Blogs</Button>
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
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },...tableStyles }}
        />{' '}
      </CardContent>
    </Card>
  )
}

export default Blogs

