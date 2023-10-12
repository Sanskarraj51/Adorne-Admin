import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import Tooltip from '@mui/material/Tooltip'

// ** redux
import { useSelector, useDispatch } from 'react-redux'
import ConfirmBox from '../confirm-dialog'
import { fetchColorData, fetchSizeData } from 'src/store/apps/product'
import { handleGetAPI } from 'src/@core/api-handler'
import IconifyIcon from 'src/@core/components/icon'
import AddMasterDialog from './AddMasterDialog'
import authConfig from 'src/configs/auth'

// ** renders client column
const statusObj = {
  Active: 'success',
  pending: 'warning',
  Inactive: 'secondary'
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function SizesTab() {
  // ** States
  const [pageSize, setPageSize] = useState(10)
  const [editData, setEditData] = useState([])
  const [dialogStatus, setDialogStatus] = useState('Add')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  // ** hooks
  const dispatch = useDispatch()
  const commonStore = useSelector(state => state.product)

  const getSizesData = async () => {
    setLoading(true)
    await dispatch(fetchSizeData())
    setLoading(false)
  }

  useEffect(() => {
    getSizesData()
  }, [])

  // ** open edit dialog with selected values\
  const openEdit = data => {
    setEditData(data)
    setDialogStatus('Update')
    setShow(true)
  }

  const openAddDialog = () => {
    setEditData([])
    setDialogStatus('Add')
    setShow(true)
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
    let url = `/master/productcolor/delete/${deletId?._id}`
    const response = await handleGetAPI(url)
    if (response) {
      getSizesData()
      setShowDelete(false)
    }
    setDelLoading(false)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Sizes List'
          action={
            <Box>
              <Button size='small' variant='contained' onClick={openAddDialog}>
                Add new Size
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
          rows={commonStore?.sizes?.length ? commonStore?.sizes : []}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
        <AddMasterDialog
          getAllData={getSizesData}
          value='Sizes'
          editData={editData}
          setShow={setShow}
          show={show}
          dialogStatus={dialogStatus}
          url={dialogStatus === 'Add' ? authConfig.addSize : `/master/productcolor/update/${editData?._id}`}
        />

        <ConfirmBox
          name={deletId?.name}
          title='Size'
          open={showDelete}
          closeDialog={() => setShowDelete(false)}
          toDoFunction={deleteColor}
          loading={delLoading}
        />
      </Card>
    </>
  )
}

export default SizesTab
