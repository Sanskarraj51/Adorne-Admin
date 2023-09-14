import { Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { tableStyles } from '../products'
import CustomChip from 'src/@core/components/mui/chip'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import auth from 'src/configs/auth'
import { fetchBrandData } from 'src/store/apps/product'
import { mediaUrl } from 'src/@core/api-handler'

const brandStatusObj = {
  active: 'primary',
  pending: 'warning',
  Inactive: 'secondary'
}

const columns = [
  {
    flex: 0.2,
    field: 'icon',
    minWidth: 150,
    headerName: 'Banner',
    renderCell: ({ row }) => (
      <Box sx={{ py: 1 }}>
        <img
          src={
            row?.icon ? `${mediaUrl}brands/${row?.icon}` : 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
          }
          alt=''
          width={120}
          height={120}
          style={{ objectFit: 'contain' }}
        />
      </Box>
    )
  },
  {
    flex: 0.3,
    minWidth: 200,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => <Typography>{row?.name}</Typography>
  },
  {
    flex: 0.4,
    minWidth: 200,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }) => <Typography>{row?.description}</Typography>
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
          color={brandStatusObj[row.status]}
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
          <IconButton color='primary' component={Link} href={`/brands/add`}>
            <Icon icon='mdi:pencil-outline' fontSize={27} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete Brand'>
          <IconButton color='error'>
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

  const [loading, setLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')

  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  async function getBrand() {
    setLoading(true)
    await dispatch(fetchBrandData())
    setLoading(false)
  }

  // async function deleteBrand() {
  //   setDelLoading(true)
  //   let res = await handleDeleteAPI(`${auth.brand}/${deletId?.id}`, 'Brand Deleted Successfully')
  //   if (res) {
  //     getBrand()
  //     setShowDelete(false)
  //   }
  //   setDelLoading(false)
  // }

  useEffect(() => {
    getBrand()
  }, [])

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
          rows={store?.brandData?.length ? store?.brandData : []}
          getRowHeight={() => 'auto'}
          loading={loading}
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

export default BrandsPage
