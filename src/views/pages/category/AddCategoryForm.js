import { Button, FormControl, Grid, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import { useDispatch, useSelector } from 'react-redux'
import { handlePostAPI, handlePutAPI } from 'src/@core/api-handler'
import auth from 'src/configs/auth'
import { fetchCategoryData, setCategoryDetailDataData } from 'src/store/apps/product'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'

const schema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  description: yup.string().required('Category name is required')
})

const defaultValues = {
  description: '',
  name: ''
}

const AddCategoryForm = ({ type = 'Add', handleClose }) => {
  const [loading, setLoading] = useState(false)
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
    reset,
    resetField,
    formState: { errors, isSubmitting, isValid }
  } = methods

  useEffect(() => {
    if (store?.categoryDetailData) {
      reset({
        name: store?.categoryDetailData?.name,
        description: store?.categoryDetailData?.description
      })
    }
  }, [store?.categoryDetailData])

  const onSubmit = async data => {
    setLoading(true)
    let res
    if (type === 'Edit') {
      res = await handlePutAPI(
        `${auth.category}/${store?.categoryDetailData?.id}`,
        data,
        'Category Updated Successfully'
      )
    } else {
      res = await handlePostAPI(auth.category, data, 'Category Added Successfully')
    }
    if (res) {
      if (type === 'Edit') {
        dispatch(setCategoryDetailDataData({}))
      }

      if (router.pathname.startsWith('/category')) {
        router.push('/category')
      } else {
        dispatch(fetchCategoryData({}))
        handleClose()
      }
      handleClose()
    }
    setLoading(false)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid sx={{ mt: 2 }} container spacing={5}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <RHFTextField
              fullWidth
              name='name'
              label='Category Name'
              placeholder='Fashion'
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
                    <IconifyIcon icon='mdi:message-outline' />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            startIcon={<IconifyIcon icon='mdi:shape-outline' />}
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
    </FormProvider>
  )
}

export default AddCategoryForm
