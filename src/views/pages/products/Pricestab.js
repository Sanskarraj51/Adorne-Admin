import React, { useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { handleGetAPI, handlePostAPI } from 'src/@core/api-handler'
import CustomModal, { ModalActions } from 'src/pages/custom-modal'
import { useSelector } from 'src/store'
import { DataGrid } from '@mui/x-data-grid'
import IconifyIcon from 'src/@core/components/icon'
import ConfirmBox from '../confirm-dialog'

const Pricestab = ({ detailData, getProductDetails, productAttribute }) => {
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [colorId, setColorId] = useState('')
  const [selectColor, setSelectColor] = useState(false)
  const [sizeId, setSizeId] = useState('')
  const [sku, setSku] = useState('')
  const [qty, setQty] = useState('')
  const [dialogStatus, setDialogStatus] = useState('Add')
  const [deletId, setDeleteId] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  const { colors, sizes } = useSelector(state => state?.product)
  const theme = useTheme()

  async function addVarientProduct() {
    if ((productAttribute?.color?.length && !colorId) || (productAttribute?.size?.length && !sizeId)) {
      toast.error('Please select color & sizes')

      return
    }
    setLoading(true)

    let newUrl = dialogStatus === 'Add' ? '/productvariation/add-product-variant' : '/productvariation/update'

    // variation: `${sizeId},${colorId}`,
    let data = {
      product_id: detailData?.id,
      sku: sku,
      price: detailData?.price,
      quantity: qty
    }
    if (colorId) {
      data.color = colorId
    }
    if (sizeId) {
      data.size = sizeId
    }

    if (dialogStatus === 'Update') {
      data.variant_id = deletId
    }

    let response = await handlePostAPI(
      newUrl,
      data,
      `Variant ${dialogStatus === 'Add' ? 'Added' : 'Updated'} Successfully'`
    )
    if (response) {
      getProductDetails()
      setSelectColor(false)
    }
    setLoading(false)
  }

  // ** open edit dialog with selected values\
  const openEdit = data => {
    setDialogStatus('Update')
    setDeleteId(data.id)
    setSelectColor(true)
    setSku(data?.sku)
    setQty(data?.quantity)
    setSizeId(data?.SizeEntity?.id)
    setColorId(data?.ColorsEntity?.id)
  }

  const openAddDialog = () => {
    setDeleteId('')
    setSizeId('')
    setColorId('')
    setSku('')
    setQty('')
    setDialogStatus('Add')
    setSelectColor(true)
  }

  // ** open Delete confirm dialog box
  function deleteDialog(id) {
    setShowDelete(true)
    setDeleteId(id)
  }

  async function deleteVariant() {
    setDelLoading(true)
    let url = `/productvariation/remove?variant_id=${deletId?.id}`
    const response = await handleGetAPI(url)
    if (response) {
      getProductDetails()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

  const columns = [
    {
      flex: 0.3,
      minWidth: 290,
      field: 'name',
      headerName: 'Variant Name',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.sku}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'color',
      headerName: 'Color Name',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.ColorsEntity?.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'size',
      headerName: 'Size Name',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.SizeEntity?.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 290,
      field: 'quantity',
      headerName: 'Quantity',
      renderCell: params => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.quantity}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Edit'>
              <IconButton onClick={() => openEdit(row)} size='small' component='a' sx={{ textDecoration: 'none' }}>
                <IconifyIcon icon='mdi:pencil-outline' fontSize={27} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton
                color='error'
                onClick={() => deleteDialog(row)}
                size='small'
                component='a'
                sx={{ textDecoration: 'none' }}
              >
                <IconifyIcon icon='mdi:delete-outline' fontSize={27} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  return (
    <div>
      <Button onClick={() => openAddDialog()} variant='contained' color='primary' sx={{ my: 2, mx: 3 }}>
        Add Variant
      </Button>

      <CustomModal
        size='md'
        scroll='paper'
        closeDialog={() => setSelectColor(false)}
        open={selectColor}
        title={dialogStatus + ' Variants'}
        actionComponent={
          <ModalActions>
            <Box className='row align-items-center'>
              <Button color='secondary' variant='contained' onClick={() => setSelectColor(false)} sx={{ mx: 3 }}>
                Cancel
              </Button>
              <LoadingButton
                loadingPosition='start'
                variant='contained'
                color='primary'
                sx={{ mr: 4 }}
                loading={loading}
                startIcon={<Icon icon={'mdi:content-save'} />}
                onClick={addVarientProduct}
              >
                Save
              </LoadingButton>
            </Box>
          </ModalActions>
        }
      >
        <Box
          rowGap={3}
          columnGap={2}
          display='grid'
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)'
          }}
        >
          <Autocomplete
            fullWidth
            options={productAttribute?.color}
            value={
              colorId
                ? colors?.find(option => {
                    return colorId === option.id
                  }) ?? null
                : null
            }
            // eslint-disable-next-line no-unneeded-ternary
            getOptionLabel={option => (option ? option.name : '')}
            filterSelectedOptions
            onChange={(event, newValue) => {
              setColorId(newValue?.id ? newValue?.id : '')
            }}
            renderInput={params => <TextField {...params} label='Color' placeholder='' name='colors' />}
            renderOption={(props, option) => {
              return colors?.length ? (
                <ListItem
                  {...props}
                  key={option.id}
                  className={`suggestion ${props.className}`}
                  sx={{ py: 2.5, px: ` ${theme.spacing(6)} !important` }}
                  secondaryAction={
                    <Box
                      display='flex'
                      sx={{
                        m: 1,
                        height: '3rem',
                        width: '3rem',
                        background: option?.code || ''
                      }}
                    ></Box>
                  }
                >
                  <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {option?.name}
                  </Typography>
                </ListItem>
              ) : null
            }}
          />

          <Autocomplete
            fullWidth
            options={productAttribute?.size}
            // eslint-disable-next-line no-unneeded-ternary
            getOptionLabel={option => (option ? option.name : '')}
            filterSelectedOptions
            value={
              sizeId
                ? sizes?.find(option => {
                    return sizeId === option.id
                  }) ?? null
                : null
            }
            onChange={(event, newValue) => {
              setSizeId(newValue?.id ? newValue?.id : '')
            }}
            renderInput={params => <TextField {...params} label='Sizes' placeholder='' />}
          />
          <TextField label='SKU' value={sku} onChange={e => setSku(e.target.value)} name='sku' />
          <TextField label='Quantity' value={qty} onChange={e => setQty(e.target.value)} name='qty' />
        </Box>
      </CustomModal>

      <DataGrid
        autoHeight
        columns={columns}
        getRowHeight={() => true}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        loading={loading}
        rows={detailData?.ProductvariantEntities?.length ? detailData?.ProductvariantEntities : []}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />

      <ConfirmBox
        name={deletId?.sku}
        title='Variant'
        open={showDelete}
        closeDialog={() => setShowDelete(false)}
        toDoFunction={deleteVariant}
        loading={delLoading}
      />
    </div>
  )
}

export default Pricestab
