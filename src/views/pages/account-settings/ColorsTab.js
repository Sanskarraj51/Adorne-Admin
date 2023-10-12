import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { CardContent, Grid, IconButton } from '@mui/material'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import Tooltip from '@mui/material/Tooltip'

// ** redux
import { useSelector, useDispatch } from 'react-redux'
import ConfirmBox from '../confirm-dialog'
import { fetchColorData } from 'src/store/apps/product'
import { handleGetAPI } from 'src/@core/api-handler'
import IconifyIcon from 'src/@core/components/icon'
import CustomModal from 'src/pages/custom-modal'
import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import { LoadingButton } from '@mui/lab'

import { handlePostAPI, handlePutAPI } from 'src/@core/api-handler'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import auth from 'src/configs/auth'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  hex: yup.string().required('Code is required')
})

const defaultValues = {
  name: '',
  hex: ''
}

function ColorTab() {
  // ** States
  const [pageSize, setPageSize] = useState(10)
  const [dialogStatus, setDialogStatus] = useState('Add')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  // ** hooks
  const dispatch = useDispatch()
  const commonStore = useSelector(state => state.product)

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues
  })


  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = methods

  async function addMasterData(data) {
    setDelLoading(true)
    let url = auth?.colors
    if (dialogStatus === 'Update') {
      url = auth?.updateColors
    }
    let response = await handlePostAPI(url, data)
    if (response) {
      getColorData()
      setShow(false)
    }
    setDelLoading(false)
  }

  const getColorData = async () => {
    setLoading(true)
    await dispatch(fetchColorData())
    setLoading(false)
  }

  useEffect(() => {
    getColorData()
  }, [])

  // ** open edit dialog with selected values\
  const openEdit = data => {
    setDialogStatus('Update')
    setShow(true)
    setValue('name', data?.name)
    setValue('hex', data?.code)
    setValue('color_id', data?.id)
  }

  const openAddDialog = () => {
    setDialogStatus('Add')
    setShow(true)
    reset(defaultValues)
  }

  // ** open Delete confirm dialog box
  function deleteDialog(id) {
    setShowDelete(true)
    setDeleteId(id)
  }

  const columns = [
    {
      flex: 0.7,
      minWidth: 290,
      field: 'name',
      headerName: 'Name',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'code',
      headerName: 'Color',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              width: '10rem',
              height: '5rem',
              background: row?.code
            }}
          ></Box>
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

  async function deleteColor() {
    setDelLoading(true)
    let url = `${auth.removeColors}${deletId?.id}`
    const response = await handleGetAPI(url)
    if (response) {
      getColorData()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Color List'
          action={
            <Box>
              <Button size='small' variant='contained' onClick={openAddDialog}>
                Add new Color
              </Button>
            </Box>
          }
        />

        <DataGrid
          autoHeight
          columns={columns}
          getRowHeight={() => true}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
          rows={commonStore?.colors?.length ? commonStore?.colors : []}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
        {/* <AddDialog
          getAllData={getColorData}
          value='Color'
          editData={editData}
          setShow={setShow}
          show={show}
          dialogStatus={dialogStatus}
          url={dialogStatus === 'Add' ? '/master/productcolor/add' : `/master/productcolor/update/${editData?._id}`}
        /> */}

        <ConfirmBox
          name={deletId?.name}
          title='Color'
          open={showDelete}
          closeDialog={() => setShowDelete(false)}
          toDoFunction={deleteColor}
          loading={delLoading}
        />
      </Card>

      <CustomModal open={show} closeDialog={() => setShow(false)} title={dialogStatus + ' Color'}>
        <CardContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(addMasterData)}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <RHFTextField name='name' fullWidth label='Name' placeholder='John Doe' sx={{ mt: 2 }} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <RHFTextField type='color' name='hex' fullWidth label='Color Code' sx={{ mt: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton type='submit' loading={delLoading} variant='contained' sx={{ mr: 4 }}>
                  Save Changes
                </LoadingButton>
                <Button type='reset' variant='outlined' onClick={() => setShow(false)} color='secondary'>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </FormProvider>
        </CardContent>
      </CustomModal>
    </>
  )
}

export default ColorTab
