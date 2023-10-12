import { Button, Card, CardContent, CardHeader, IconButton, MenuItem, Select, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box } from '@mui/system'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersData, fetchProductData } from 'src/store/apps/product'
import IconifyIcon from 'src/@core/components/icon'
import { handleGetAPI } from 'src/@core/api-handler'
import CustomModal from '../custom-modal'
import dayjs from 'dayjs'
import InvoicePreview from 'src/views/apps/invoice/preview/Preview'

export const tableStyles = {
  '& .MuiDataGrid-columnHeaders': {
    bgcolor: '#86533C',
    color: 'white'
  }
}

export const userStatusObj = {
  Pending: 'warning',
  'In-Transit': 'secondary',
  Shipped: 'info',
  Delivered: 'primary',
  Completed: 'success',
  Cancelled: 'error'
}

const Orders = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [loading, setLoading] = useState(false)
  const [openDtail, setOpenDetail] = useState(false)
  const [details, setDetails] = useState({})

  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  async function getOrders() {
    setLoading(true)
    await dispatch(fetchOrdersData())
    setLoading(false)
  }

  useEffect(() => {
    getOrders()
  }, [dispatch])

  async function updateOrder(status, id) {
    let url = `/orders/update-status?order_id=${id}&order_status=${status}`

    let res = await handleGetAPI(url)

    if (res) {
      await dispatch(fetchOrdersData())
    }
  }

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'Order Id',
      renderCell: ({ row }) => <Typography>#{row?.id} </Typography>
    },
    {
      flex: 0.1,
      field: 'created_at',
      minWidth: 150,
      headerName: 'Order Date',
      renderCell: ({ row }) => <Typography>{dayjs(row?.created_at).format('DD/MM/YYYY hh:mm A')} </Typography>
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'full_name',
      headerName: 'Customer Name',
      renderCell: ({ row }) => <Typography>{row?.AddressEntity?.full_name}</Typography>
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'AddressEntity.address1',
      headerName: 'Location',
      renderCell: ({ row }) => {
        return (
          <Typography>
            {row?.AddressEntity.address1} <br />
            {row?.AddressEntity.city} <br />
            {row?.AddressEntity.state},{row?.AddressEntity.pin} <br />
            {row?.AddressEntity.country} <br />
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'phone',
      headerName: 'Customer Phone',
      renderCell: ({ row }) => <Typography>{row?.AddressEntity?.phone || ''}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'total',
      headerName: 'Price',
      renderCell: ({ row }) => <Typography>${row?.total || 0}</Typography>
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
      flex: 0.2,
      minWidth: 150,
      field: 'change',
      headerName: 'Update',
      renderCell: ({ row }) => {
        return (
          <Select
            defaultValue={row?.status}
            size='small'
            sx={{}}
            onChange={e => {
              updateOrder(e.target.value, row?.id)
            }}
          >
            <MenuItem value='Active'>Active</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='In-Transit'>In-Transit</MenuItem>
            <MenuItem value='Shipped'>Shipped</MenuItem>
            <MenuItem value='Delivered'>Delivered</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
            <MenuItem value='Cancelled'>Cancelled</MenuItem>
          </Select>
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
            <IconButton
              onClick={() => {
                setOpenDetail(true)
                setDetails(row)
              }}
              color='primary'
            >
              <IconifyIcon icon='mdi:eye-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Card>
      <CardHeader title='Products page' />
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          loading={loading}
          rows={store?.orders?.length ? store?.orders : []}
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, ...tableStyles }}
        />{' '}
      </CardContent>

      <CustomModal open={openDtail} fullScreen={true} closeDialog={() => setOpenDetail(false)} title={'Order Detail'}>
        <CardContent>
          <InvoicePreview data={details} />
        </CardContent>
      </CustomModal>
    </Card>
  )
}

export default Orders
