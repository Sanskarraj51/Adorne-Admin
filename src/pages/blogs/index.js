import { Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { Box } from '@mui/system'
import CustomChip from 'src/@core/components/mui/chip'
import { tableStyles } from '../products'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogData } from 'src/store/apps/product'
import { handleGetAPI } from 'src/@core/api-handler'
import ConfirmBox from 'src/views/pages/confirm-dialog'

export const oneTwoStatusObj = {
  1: 'primary',
  0: 'warning'
}

const Blogs = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [loading, setLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')

  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  async function getBlogs() {
    setLoading(true)
    await dispatch(fetchBlogData())
    setLoading(false)
  }

  async function deleteBlogs() {
    setDelLoading(true)
    let res = await handleGetAPI(`/blogs/removepost/${deletId?.id}`, 'Blog Deleted Successfully')
    if (res) {
      getBlogs()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const columns = [
    {
      flex: 0.2,
      field: 'v',
      minWidth: 150,
      headerName: 'Image',
      renderCell: ({ row }) => (
        <Box sx={{ py: 1 }}>
          <img
            src={
              row?.postImage
                ? `${store?.blogs?.mediaUrl}${row?.postImage}`
                : 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
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
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => <Typography>{row?.title}</Typography>
    },
    {
      flex: 0.4,
      minWidth: 200,
      field: 'post',
      headerName: 'Post',
      renderCell: ({ row }) => (
        <div className='max-h-5 text_next_line' dangerouslySetInnerHTML={{ __html: row?.post }}></div>
      )
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
            label={row.status === 1 ? 'Active' : 'In-Active'}
            color={oneTwoStatusObj[row.status]}
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
            <IconButton color='primary' component={Link} href={`/blogs/edit/${row?.id}`}>
              <Icon icon='mdi:pencil-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Blog'>
            <IconButton
              onClick={() => {
                setShowDelete(true)
                setDeleteId(row)
              }}
            color='error'>
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
          loading={loading}
          rows={store?.blogs?.posts?.length ? store?.blogs?.posts : []}
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, ...tableStyles }}
        />{' '}
      </CardContent>

      <ConfirmBox
        name={deletId?.title}
        title='Blog'
        open={showDelete}
        closeDialog={() => setShowDelete(false)}
        toDoFunction={deleteBlogs}
        loading={delLoading}
      />
    </Card>
  )
}

export default Blogs
