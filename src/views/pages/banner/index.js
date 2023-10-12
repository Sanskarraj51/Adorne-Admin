import { Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputAdornment } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import Icon from 'src/@core/components/icon'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import { StyledDropZone } from 'src/@core/components/upload/Upload'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { handlePostAPI, handlePutAPI } from 'src/@core/api-handler'
import { setCategoryDetailDataData } from 'src/store/apps/product'
import auth from 'src/configs/auth'
import RHFRadioGroup from 'src/@core/components/RHF/RHFRadioGroup'

const schema = yup.object().shape({
  name: yup.string().required('Brand name is required'),
  description: yup.string().required('Description is required'),
  logo: yup.array().min(1, 'Logo is required')
})

const defaultValues = {
  description: '',
  name: '',
  position: 'carousel',
  logo: []
}

const BannerForm = ({ type = 'Add' }) => {
  const [loading, setLoading] = useState(false)

  // hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  const { banners } = store

  const router = useRouter()
  const { id } = router.query

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

  const onSubmit = async data => {
    setLoading(true)
    const formData = new FormData()
    if (data?.logo?.length) {
      for (let i of data?.logo) {
        if (i instanceof File) {
          formData.append('bannerImage', i)
        }
      }
    }
    formData.append('heading', data?.name)
    formData.append('description', data?.description)
    formData.append('bannerPosition', data?.position)

    if (type === 'Edit') {
      formData.append('banner_id', id)
    }

    let url = type === 'Edit' ? '/banners/update-banner' : auth.addBanner

    const res = await handlePostAPI(url, formData, `Banner ${type === 'Edit' ? 'Updated' : 'Added'} Successfully`)

    if (res) {
      router.push('/banner-settings')
    }
    setLoading(false)
  }

  const handleDrop = useCallback(async acceptedFiles => {
    setValue('logo', acceptedFiles, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [])

  useEffect(() => {
    if (type === 'Edit' && banners?.posts?.length) {
      let data = banners?.posts?.find(item => item.id == id)
      console.log('----data', data)

      reset({
        description: data?.description || '',
        name: data?.heading || '',
        position: data?.bannerPosition || 'carousel',
        logo: [`${banners?.mediaUrl}${data?.bannerImage}`] || []
      })
    }
  }, [banners?.posts])

  return (
    <CardContent>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
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
              <FileUploaderSingle previewFile={watch('logo')} handleDrop={handleDrop} />
            </StyledDropZone>
            {errors?.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors?.logo?.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <RHFTextField
                    fullWidth
                    name='name'
                    label='Banner Title'
                    placeholder='Enter Banner title'
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
              {/* <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <RHFRadioGroup
                    row='row'
                    name='position'
                    label='Position'
                    options={[
                      { label: 'Carousel', value: 'carousel' },
                      { label: 'Right Side', value: 'side' }
                    ]}
                  />
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <Button disabled={!isValid} fullWidth type='submit' variant='contained' size='large'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </CardContent>
  )
}

export default BannerForm
