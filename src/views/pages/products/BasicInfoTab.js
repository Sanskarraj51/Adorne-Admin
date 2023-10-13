import { Autocomplete, Box, Button, Card, FormControl, Grid, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import { handlePutAPI } from 'src/@core/api-handler'
import { useFieldArray, useForm } from 'react-hook-form'
import FormProvider from 'src/@core/components/formProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import { RHFAutocomplete } from 'src/@core/components/RHF/RhfAutocomplete'
import { fetchBrandData, fetchCategoryData } from 'src/store/apps/product'

const BasicInfoTab = ({ productInfo, id, getProductDetailData }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { categoryData, brandData } = useSelector(state => state?.product)

  const defaultValues = {
    name: productInfo?.name || '',
    shortDescription: productInfo?.shortDescription || '',
    brand_id: productInfo?.BrandEntity?.id || '',
    category_id: productInfo?.CategoryEntity?.id || '',
    price: productInfo?.price || '',
    sku_id: productInfo?.sku_id || '',
    qty: productInfo?.qty || '',
    height: productInfo?.height || '',
    length: productInfo?.length || '',
    width: productInfo?.width || '',
    weight: productInfo?.weight || '',
    description: productInfo?.description ? JSON.parse(productInfo?.description) : [{ value: '' }]
  }

  const newProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    qty: Yup.string().required('Stock is required'),
    sku_id: Yup.string().required('SKU is required'),
    width: Yup.string().required('Width is required'),
    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    length: Yup.string().required('length is required'),
    shortDescription: Yup.string().required('Short Description is required'),
    category_id: Yup.string().required('Category is Required'),
    description: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required('Description is Required')
        })
      )
      .required(),

    brand_id: Yup.string().required('Brand is Required'),
    price: Yup.string().required('Price is required').typeError('Price is required')
  })

  const methods = useForm({
    resolver: yupResolver(newProductSchema),
    defaultValues
  })

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors, isSubmitting }
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'description'
  })

  const [loading, setLoading] = useState(false)

  async function updateProductDetails(data) {
    setLoading(true)

    let body = {
      name: data?.name,
      category_id: data?.category_id,
      price: data?.price,
      brand_id: data?.brand_id,
      shortDescription: data?.shortDescription,
      sku_id: data?.sku_id,
      description: JSON.stringify(data?.description),
      width: data?.width,
      height: data?.height,
      weight: data?.weight,
      length: data?.length,
      qty: data?.qty
    }

    let res = await handlePutAPI(`/product/${id}`, body)
    if (res) {
      getProductDetailData()
    }
    setLoading(false)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(updateProductDetails)}>
      <Grid container spacing={6} sx={{ my: 4 }}>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='name' label='Product Name' placeholder='example' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='sku_id' label='SKU Code' placeholder='example' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='price' label='Price' placeholder='' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='length' label='Package Length' placeholder='Package Length' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='width' label='Package Width' placeholder='Package Width' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='height' label='Package Height' placeholder='Package Height' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFTextField size='small' name='weight' label='Weight (kg)' placeholder='Weight in LBS' />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFAutocomplete
              options={brandData}
              size='small'
              name='brand_id'
              label='Brand'
              placeholder='Select Brand'
            />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <RHFAutocomplete
              size='small'
              name='category_id'
              label='Category'
              placeholder='Select Category'
              options={categoryData}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name='shortDescription'
              label='Short Description'
              multiline
              minRows={2}
              disabled={isSubmitting}
            />
          </FormControl>
        </Grid>

        {fields?.length > 0
          ? fields.map((field, index) => (
              <Grid item xs={12} key={field?.id} display='flex'>
                <RHFTextField
                  multiline
                  key={field.id}
                  name={`description.${index}.value`}
                  sx={{ mt: 2 }}
                  label='Description'
                  placeholder='Enter description'
                />
                <IconButton
                  color='error'
                  sx={{
                    display: watch('description')?.length > 1 ? 'flex' : 'none',
                    width: 'fit-content',
                    borderRadius: '8px'
                  }}
                  onClick={() => remove(index)}
                >
                  <Icon icon='material-symbols:close' />
                </IconButton>
              </Grid>
            ))
          : null}
        <Grid item xs={12} display='flex' mt={2} justifyContent='flex-end'>
          <Button
            startIcon={<Icon icon='material-symbols:add' />}
            onClick={() => {
              append('')
            }}
            color='primary'
            variant='contained'
          >
            Add More
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color='secondary' variant='contained' sx={{ mr: 4 }} colo onClick={() => router.push('/product')}>
            Back to product List Page
          </Button>
          <LoadingButton
            loadingPosition='start'
            type='submit'
            variant='contained'
            sx={{ mr: 4 }}
            loading={loading}
            startIcon={<Icon icon='mdi:send' />}
          >
            Save Changes
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default BasicInfoTab
