import React, { Fragment, useCallback, useEffect, useState } from 'react'

// ** MUI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Icon from 'src/@core/components/icon'

// ** DropeZonewrapper Upload component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Pop-Up components
import ConfirmBox from '../confirm-dialog'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import { handleDeleteAPI, handleGetAPI, handlePostAPI, handlePutAPI } from 'src/@core/api-handler'
import CustomModal from 'src/pages/custom-modal'

function ProductImagesTab({ productDetail, getProductDetails, mediaUrl }) {
  // ** states
  const [show, setShow] = useState(false)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [defaultImg, setDefaultImg] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [deletId, setDeleteId] = useState('')

  async function changeImageUrl(data) {
    let newUrl = '/update-image-in-product'

    let res = await handlePostAPI(newUrl, data, 'Image Uploaded Successfully')
    if (!res) return
    setFiles([])
    setShow(false)
    getProductDetails()
  }

  const uploadFunction = async () => {
    let bodyData = new FormData()
    if (files?.length) {
      for (let i of files) {
        bodyData.append('images', i)
      }
    }

    setLoading(true)
    let res = await handlePutAPI(`/product/${productDetail?.id}`, bodyData)
    setLoading(false)
    if (!res) return
    setFiles([])
    setShow(false)
    getProductDetails()
  }

  function handleChange(e, img) {
    if (e.target.checked) {
      setDefaultImg(img)

      let data = {
        imageUrl: img,
        productId: productDetail?._id,
        isPrimary: true
      }
      changeImageUrl(data)
    }
  }

  function deleteDialog(data) {
    setShowDelete(true)
    setDeleteId(data)
  }

  async function deleteImages() {
    setDelLoading(true)
    let url = `/product/images/${deletId}`
    const response = await handleDeleteAPI(url,'Image Deleted Successfully')
    if (response) {
      setShowDelete(false)
      getProductDetails()
    }
    setDelLoading(false)
  }

  useEffect(() => {
    if (productDetail) {
      setDefaultImg(productDetail?.ProductImageEntities[0]?.key)
    }
  }, [productDetail])

  // `${mediaUrl}products/${productData?.ProductImageEntities[0]?.key}

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles)
  }, [])

  console.log('files',files);

  return (
    <Grid container spacing={4} sx={{ p: 3 }} className='match-height'>
      <CustomModal open={show} closeDialog={() => setShow(false)} size='md' title='Upload Files'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <DropzoneWrapper>
              <FileUploaderMultiple onHandleDrop={handleDrop} />
            </DropzoneWrapper>
          </Grid>
          {files?.length ? (
            <Grid item xs={12} justifyContent={'flex-end'}>
              <Button color='secondary' variant='contained' sx={{ mr: 4 }} onClick={() => setShow(false)}>
                Cancel
              </Button>
              <LoadingButton
                loadingPosition='start'
                type='submit'
                variant='contained'
                sx={{ mr: 4 }}
                loading={loading}
                onClick={uploadFunction}
                startIcon={<Icon icon='mdi:send' />}
              >
                Save Changes
              </LoadingButton>
            </Grid>
          ) : null}
        </Grid>
      </CustomModal>

      <Grid item xs={12}>
        <Button variant='outlined' color='primary' onClick={() => setShow(true)}>
          Upload More Images
        </Button>
      </Grid>
      {productDetail?.ProductImageEntities?.length
        ? productDetail?.ProductImageEntities?.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Box
                  sx={{
                    width: '100%',
                    height: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2
                  }}
                >
                  <FormControl>
                    {/* <FormControlLabel
                      control={
                        <Checkbox checked={defaultImg === item?.key} onChange={e => handleChange(e, item?.image)} />
                      }
                      label={defaultImg === item?.image ? 'Primary' : 'Set as Primary'}
                    /> */}
                  </FormControl>
                  <Tooltip title='Delete'>
                    <span>
                      <IconButton
                        onClick={() => deleteDialog(item?.id)}
                        disabled={defaultImg === item?.image}
                        color='error'
                      >
                        <Icon icon='material-symbols:delete' color='red' />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>

                <CardMedia
                  priority='true'
                  loading='lazy'
                  sx={{ height: 350, objectFit: 'contain' }}
                  image={
                    `${mediaUrl}${item?.key}` ||
                    'https://images.pexels.com/photos/10046261/pexels-photo-10046261.jpeg?auto=compress&cs=tinysrgb&w=1600'
                  }
                  component='img'
                  alt='Paella dish'
                />
              </Card>
            </Grid>
          ))
        : null}

      <ConfirmBox
        name='image'
        title='Image'
        open={showDelete}
        closeDialog={() => setShowDelete(false)}
        toDoFunction={deleteImages}
        loading={delLoading}
      />
    </Grid>
  )
}

export default ProductImagesTab
