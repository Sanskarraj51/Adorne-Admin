import { Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import CustomChip from 'src/@core/components/mui/chip'
import { tableStyles } from '../products'

import { useDispatch, useSelector } from 'react-redux'
import { fetchBannerData, fetchBrandData } from 'src/store/apps/product'
import { handleGetAPI, mediaUrl } from 'src/@core/api-handler'
import { oneTwoStatusObj } from '../blogs'
import ConfirmBox from 'src/views/pages/confirm-dialog'
import auth from 'src/configs/auth'

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

const bannerPositionObj = {
  carousel: 'success',
  side: 'warning'
}

const BannerSettings = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [loading, setLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')

  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  async function getBanners() {
    setLoading(true)
    await dispatch(fetchBannerData())
    setLoading(false)
  }

  async function deleteBanner() {
    setDelLoading(true)
    let res = await handleGetAPI(`${auth.removeBanner}?bannerId=${deletId?.id}`, 'Banner Deleted Successfully')
    if (res) {
      getBanners()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

  useEffect(() => {
    getBanners()
  }, [])

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
              row?.bannerImage
                ? `${store?.banners?.mediaUrl}${row?.bannerImage}`
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
      field: 'heading',
      headerName: 'Heading',
      renderCell: ({ row }) => <Typography>{row?.heading}</Typography>
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
            label={row.status === 1 ? 'Active' : 'In-Active'}
            color={oneTwoStatusObj[row.status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    // {
    //   flex: 0.1,
    //   minWidth: 120,
    //   field: 'bannerPosition',
    //   headerName: 'Position',
    //   renderCell: ({ row }) => {
    //     return (
    //       <CustomChip
    //         skin='light'
    //         size='small'
    //         label={row.bannerPosition}
    //         color={bannerPositionObj[row.bannerPosition]}
    //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
    //       />
    //     )
    //   }
    // },
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Edit'>
            <IconButton color='primary' component={Link} href={`/banner-settings/edit/${row?.id}`}>
              <Icon icon='mdi:pencil-outline' fontSize={27} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Banner'>
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
        title='Banners'
        action={
          <Link href='/banner-settings/add'>
            <Button variant='contained'>Add Banner</Button>
          </Link>
        }
      />
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          loading={loading}
          rows={store?.banners?.posts?.length ? store?.banners?.posts : []}
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, ...tableStyles }}
        />{' '}
      </CardContent>

      <ConfirmBox
        name={deletId?.heading}
        title='Banner'
        open={showDelete}
        closeDialog={() => setShowDelete(false)}
        toDoFunction={deleteBanner}
        loading={delLoading}
      />
    </Card>
  )
}

export default BannerSettings
