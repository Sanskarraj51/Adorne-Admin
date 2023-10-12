import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment
} from '@mui/material'
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
import { LoadingButton } from '@mui/lab'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import RHFTextEditor from 'src/@core/components/RHF/RHFTextEditor'

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

const AddBlogs = ({ type = 'Add' }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  // hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  const router = useRouter()

  const { blogs } = store
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
          formData.append('postImage', i)
        }
      }
    }

    formData.append('title', data?.name)
    formData.append('post', data?.description)
    if (type === 'Edit') {
      formData.append('blog_id', id)
    }

    let url = type === 'Edit' ? '/blogs/update-blog' : auth.addBlogs

    let res = await handlePostAPI(url, formData, `Blogs ${type === 'Edit' ? 'Updated' : 'Added'} Successfully`)

    if (res) {
      router.push('/blogs')
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

  useEffect(() => {
    if (type === 'Edit' && blogs?.posts?.length) {
      let data = blogs?.posts?.find(item => item.id == id)
      setData(data)
      reset({
        description: data?.post || '',
        name: data?.title || '',
        logo: [`${blogs?.mediaUrl}${data?.postImage}`] || []
      })
    }
  }, [blogs?.posts, id])

  return (
    <Container maxWidth='xl'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} justifyContent='center'>
          <Grid item xs={12} sm={10} md={9} lg={8}>
            <Card>
              <CardHeader title={type + ' Blogs'} />
              <CardContent>
                <DropzoneWrapper
                  sx={{
                    ...(Boolean(errors?.logo) && {
                      '&.dropzone, & .dropzone': {
                        color: 'error.main',
                        bgcolor: 'error.lighter',
                        borderColor: 'error.light'
                      }
                    })
                  }}
                >
                  <FileUploaderSingle previewFile={watch('logo')} handleDrop={handleDrop} />
                </DropzoneWrapper>
                {errors?.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors?.logo?.message}</FormHelperText>}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={10} md={9} lg={8}>
            <Card sx={{ padding: '25px', textAlign: 'center' }}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <RHFTextField
                      fullWidth
                      name='name'
                      label='Blog Title'
                      placeholder='Enter Blog title'
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
                    <RHFTextEditor 
                    
                    previewVal={data?.post}
                    placeholder='Post...' fullWidth name='description' />
                    {/* <RHFTextField
                      fullWidth
                      name='description'
                      label='Post'
                      multiline
                      minRows={3}
                      placeholder='Post...'
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='mdi:message-outline' />
                          </InputAdornment>
                        )
                      }}
                    /> */}
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
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  )
}

export default AddBlogs
