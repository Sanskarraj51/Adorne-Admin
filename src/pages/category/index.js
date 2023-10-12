import { Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { tableStyles } from '../products'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryData, setCategoryDetailDataData } from 'src/store/apps/product'
import ConfirmBox from 'src/views/pages/confirm-dialog'
import { handleDeleteAPI } from 'src/@core/api-handler'
import auth from 'src/configs/auth'

export const userStatusObj = {
  active: 'success',
  pending: 'warning',
  Inactive: 'secondary',
  deleted: 'error'
}

const CategoryPage = () => {
  // states
  const [loading, setLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  async function getCategory() {
    setLoading(true)
    await dispatch(fetchCategoryData())
    setLoading(false)
  }
  async function deleteCategory() {
    setDelLoading(true)
    let res = await handleDeleteAPI(`${auth.category}/${deletId?.id}`, 'Category Deleted Successfully')
    if (res) {
      getCategory()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

  useEffect(() => {
    getCategory()
  }, [])

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'ID',
      renderCell: ({ row }) => {
        return <Typography>{row.id}</Typography>
      }
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
            <IconButton
              onClick={() => dispatch(setCategoryDetailDataData(row))}
              color='primary'
              component={Link}
              href={`/category/edit`}
            >
              <Icon icon='mdi:pencil-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Category'>
            <IconButton
              onClick={() => {
                setShowDelete(true)
                setDeleteId(row)
              }}
              color='error'
            >
              <Icon icon='mdi:delete-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Category Page'
        action={
          <Link href='category/add'>
            <Button variant='contained'>Add Category</Button>
          </Link>
        }
      />
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={store?.categoryData?.length ? store?.categoryData : []}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, ...tableStyles }}
        />{' '}
      </CardContent>

      <ConfirmBox
        name={deletId?.name}
        title='Category'
        open={showDelete}
        closeDialog={() => setShowDelete(false)}
        toDoFunction={deleteCategory}
        loading={delLoading}
      />
    </Card>
  )
}

export default CategoryPage
