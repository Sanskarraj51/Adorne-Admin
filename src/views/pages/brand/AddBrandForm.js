import { Button, FormControl, FormHelperText, Grid, InputAdornment } from '@mui/material'
import React, { useCallback, useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import Icon from 'src/@core/components/icon'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { handlePostAPI, handlePutAPI } from 'src/@core/api-handler'
import auth from 'src/configs/auth'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { fetchBrandData, setCategoryDetailDataData } from 'src/store/apps/product'
import { StyledDropZone } from 'src/@core/components/upload/Upload'

const schema = yup.object().shape({
  name: yup.string().required('Brand name is required'),
  description: yup.string().required('Description is required'),
  logo: yup.array().min(1, 'Logo is required')
})

const defaultValues = {
  description: '',
  name: '',
  logo: []
}

const AddBrandForm = ({ type = 'Add', handleClose }) => {
  const [loading, setLoading] = useState(false)

  // hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  const router = useRouter()

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
    formState: { errors, isSubmitting, isValid }
  } = methods

  const onSubmit = async data => {
    setLoading(true)
    let res
    const formData = new FormData()
    if (data?.logo?.length) {
      formData.append('icon', data?.logo[0])
    }
    formData.append('name', data?.name)
    formData.append('description', data?.description)

    if (type === 'Edit') {
      res = await handlePutAPI(`${auth.brand}/${store?.categoryDetailData?.id}`, formData, 'Brand Updated Successfully')
    } else {
      res = await handlePostAPI(auth.brand, formData, 'Brand Added Successfully')
    }
    if (res) {
      // dispatch(fetchCategoryData()) fetchBrandData
      if (router.pathname.startsWith('/brands/add')) {
        router.push('/brands')
      } else {
        dispatch(fetchBrandData({}))
        handleClose()
      }
      if (type === 'Edit') {
        dispatch(setCategoryDetailDataData({}))
      }
    }
    setLoading(false)
  }

  const handleDrop = useCallback(async acceptedFiles => {
    setValue('logo', acceptedFiles, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid sx={{ mt: 1 }} container spacing={5}>
        <Grid item xs={12} md={6}>
          <StyledDropZone
            sx={{
              ...(Boolean(errors?.product_photo) && {
                color: 'error.main',
                bgcolor: 'error.lighter',
                borderColor: 'error.light'
              })
            }}
          >
            <FileUploaderSingle handleDrop={handleDrop} />
          </StyledDropZone>
          {errors?.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors?.logo?.message}</FormHelperText>}

          {/* <DropzoneWrapper>
            <FileUploaderSingle handleDrop={handleDrop} />
          </DropzoneWrapper> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <RHFTextField
                  fullWidth
                  name='name'
                  label='Brand Name'
                  placeholder='Enter Brand name'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconifyIcon icon='mdi:account-outline' />
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <RHFTextField
                  fullWidth
                  name='description'
                  label='Description'
                  multiline
                  minRows={3}
                  placeholder='Description...'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon='mdi:message-outline' />
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                disabled={!isValid}
                fullWidth
                type='submit'
                variant='contained'
                size='large'
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default AddBrandForm
