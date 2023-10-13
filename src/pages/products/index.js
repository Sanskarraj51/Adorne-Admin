import { Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box } from '@mui/system'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductData } from 'src/store/apps/product'
import IconifyIcon from 'src/@core/components/icon'
import ConfirmBox from 'src/views/pages/confirm-dialog'
import { handleDeleteAPI } from 'src/@core/api-handler'
import auth from 'src/configs/auth'

export const tableStyles = {
  '& .MuiDataGrid-columnHeaders': {
    bgcolor: '#86533C',
    color: 'white'
  }
}

export const userStatusObj = {
  'In Stock': 'success',
  pending: 'warning',
  Inactive: 'secondary'
}

// const RenderAvatar = ({ brand }) => {
//   const { name, icon } = brand
//   if (icon) {
//     return <Avatar alt={name} src={icon} />
//   } else {
//     return (
//       <Avatar skin='light' color='primary'>
//         {getInitials(name)}
//       </Avatar>
//     )
//   }
// }

// row?.ProductImageEntity?.key||

const Products = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [loading, setLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [deletId, setDeleteId] = useState({})

  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  async function getProducts() {
    setLoading(true)
    await dispatch(fetchProductData())
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [dispatch])

  const columns = [
    {
      flex: 0.1,
      field: 'ProductImageEntity',
      minWidth: 150,
      headerName: 'Image',
      renderCell: ({ row }) => (
        <Box sx={{ py: 1 }}>
          <img
            src={
              row?.ProductImageEntities[0]?.key
                ? store?.data?.mediaUrl + row?.ProductImageEntities[0]?.key
                : '/images/products/iphone-11.png'
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
      flex: 0.15,
      minWidth: 150,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography>{row?.name}</Typography>
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'shortDescription',
      headerName: 'Short Description',
      renderCell: ({ row }) => {
        return <Typography>{row?.shortDescription}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'price',
      headerName: 'Price',
      renderCell: ({ row }) => <Typography>€{row?.price || 0}</Typography>
    },

    {
      flex: 0.1,
      minWidth: 120,
      field: 'CategoryEntity.name',
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.CategoryEntity?.name || ''}
            color='primary'
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
        return <Typography>{row?.BrandEntity?.name}</Typography>
      }
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
            <IconButton color='primary' component={Link} href={`/products/${row?.id}`}>
              <IconifyIcon icon='mdi:eye-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Product'>
            <IconButton
              onClick={() => {
                setShowDelete(true)
                setDeleteId(row)
              }}
              color='error'
            >
              <IconifyIcon icon='mdi:delete-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  async function deleteProduct() {
    setDelLoading(true)
    let res = await handleDeleteAPI(`/product/${deletId?.id}`, 'Product Deleted Successfully')
    if (res) {
      getProducts()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

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
          loading={loading}
          rows={store?.data?.products?.length ? store?.data?.products : []}
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, ...tableStyles }}
        />{' '}
      </CardContent>

      <ConfirmBox
        name={deletId?.name}
        title='Product'
        open={showDelete}
        closeDialog={() => setShowDelete(false)}
        toDoFunction={deleteProduct}
        loading={delLoading}
      />
    </Card>
  )
}

export default Products
