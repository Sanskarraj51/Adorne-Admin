import { Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { tableStyles, userStatusObj } from '../products'
import CustomChip from 'src/@core/components/mui/chip'
import { itemData } from '../banner-settings'
import Image from 'next/image'



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

const BrandsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null)
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
        title='Brands Page'
        action={
          <Link href='brands/add'>
            <Button variant='contained'>Add Brands</Button>
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

export default BrandsPage

