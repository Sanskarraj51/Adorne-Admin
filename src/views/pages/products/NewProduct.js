import { useCallback, useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  Link,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'

// form
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import authConfig from 'src/configs/auth'

// Redux
// import { useDispatch, useSelector } from 'src/redux/store';

import { LoadingButton } from '@mui/lab'
import Icon from 'src/@core/components/icon'
import FormProvider from 'src/@core/components/formProvider'

import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FormDialog from 'src/@core/components/dialog/FormDialog'
import { useDispatch, useSelector } from 'src/store'
import { fetchBrandData, fetchCategoryData, fetchColorData } from 'src/store/apps/product'
import { StyledDropZone } from 'src/@core/components/upload/Upload'
import { handlePostAPI } from 'src/@core/api-handler'
import { useRouter } from 'next/router'

export default function NewProduct() {
  const dispatch = useDispatch()
  const { colors, categoryData, brandData } = useSelector(state => state?.product)

  const [createOpenProductCategory, setCreateOpenProductCategory] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [createOpenBrand, setCreateOpenBrand] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  const defaultValues = {
    product_photo: [],
    name: '',
    brand_id: '',
    category_id: '',
    price: '',
    sku_id: '',
    qty: '',
    description: [{ value: '' }],
    sizes: [{ value: '' }],
    colors: []
  }

  const newProductSchema = Yup.object().shape({
    product_photo: Yup.array().min(1, 'Photo is required'),
    name: Yup.string().required('Name is required'),
    qty: Yup.string().required('Stock is required'),
    sku_id: Yup.string().required('SKU is required'),
    width: Yup.string().required('Width is required'),
    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    length: Yup.string().required('length is required'),
    category_id: Yup.string().required('Category is Required'),
    colors: Yup.array().min(1, 'Color is Required'),
    description: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required('Description is Required')
        })
      )
      .required(),
    sizes: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required('Size is Required')
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

  const {
    fields: sizeField,
    append: sizeAppend,
    remove: sizeRemove
  } = useFieldArray({
    control,
    name: 'sizes'
  })

  const onSubmit = async data => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', data?.name)
    bodyFormData.append('category_id', data?.category_id)
    bodyFormData.append('price', data?.price)
    bodyFormData.append('brand_id', data?.brand_id)
    bodyFormData.append('sku_id', data?.sku_id || '')

    // bodyFormData.append('sizes', data?.sizes || '')
    // bodyFormData.append('colors', data?.colors || '')
    bodyFormData.append('description', JSON.stringify(data?.description))
    bodyFormData.append('width', data?.width || '')
    bodyFormData.append('height', data?.height || '')
    bodyFormData.append('weight', data?.weight || '')
    bodyFormData.append('length', data?.length || '')
    bodyFormData.append('qty', data?.qty || '')
    for (let i of data?.product_photo) {
      bodyFormData.append('images', i)
    }
    setLoading(true)
    const res = await handlePostAPI(authConfig.product, bodyFormData)
    if (res) {
      router.push('/products')
    }
    setLoading(false)
  }

  const handleDrop = useCallback(
    acceptedFiles => {
      setValue('product_photo', acceptedFiles, {
        shouldValidate: true,
        shouldDirty: true
      })
    },
    [setValue]
  )

  useEffect(() => {
    dispatch(fetchColorData())
    dispatch(fetchCategoryData())
    dispatch(fetchBrandData())
  }, [dispatch])

  return (
    <Container maxWidth='xl'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: '25px', textAlign: 'center' }}>
              <Grid
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 2
                }}
              >
                <Typography variant='h6' gutterBottom>
                  Product Images
                </Typography>
              </Grid>

              {/* <RHFUpload 
multiple={true}
name='product_photo'
onDrop={handleDrop}
/> */}

              <StyledDropZone
                sx={{
                  ...(Boolean(errors?.product_photo) && {
                    color: 'error.main',
                    bgcolor: 'error.lighter',
                    borderColor: 'error.light'
                  })
                }}
              >
                <FileUploaderMultiple onHandleDrop={handleDrop} />
              </StyledDropZone>
              {errors?.product_photo && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors?.product_photo?.message}</FormHelperText>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: '25px' }}>
              <Typography variant='h6' gutterBottom>
                Product Details
              </Typography>
              <Box
                rowGap={4}
                columnGap={2}
                display='grid'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)'
                }}
              >
                <RHFTextField name='name' label='Name' disabled={isSubmitting} />
                <Autocomplete
                  fullWidth
                  options={categoryData?.length ? categoryData : []}
                  // eslint-disable-next-line no-unneeded-ternary
                  getOptionLabel={option => (option ? option.name : '')}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setValue('category_id', newValue ? newValue?.id : '', {
                      shouldValidate: true,
                      shouldDirty: true
                    })
                  }}
                  noOptionsText={
                    <Link
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        typography: 'body2',
                        color: 'primary',
                        cursor: 'pointer',
                        mb: 0.5
                      }}
                      onClick={() => {
                        setCreateOpenProductCategory(true)
                      }}
                    >
                      Create a new category
                      <Icon icon='ic:round-keyboard-arrow-right' width={18} />
                    </Link>
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Product Category'
                      placeholder=''
                      name='category_id'
                      error={Boolean(errors.category_id)}
                      helperText={errors?.category_id?.message || ''}
                    />
                  )}
                />

                <Autocomplete
                  fullWidth
                  options={brandData?.length ? brandData : []}
                  // eslint-disable-next-line no-unneeded-ternary
                  getOptionLabel={option => (option ? option.name : '')}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setValue('brand_id', newValue?.id ? String(newValue?.id) : '', {
                      shouldValidate: true,
                      shouldDirty: true
                    })
                  }}
                  noOptionsText={
                    <Link
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        typography: 'body2',
                        color: 'primary',
                        cursor: 'pointer',
                        mb: 0.5
                      }}
                      onClick={() => {
                        setCreateOpenBrand(true)
                      }}
                    >
                      Create a new Brand
                      <Icon icon='ic:round-keyboard-arrow-right' width={18} />
                    </Link>
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Product Brand'
                      placeholder=''
                      name='brand_id'
                      error={Boolean(errors.brand_id)}
                      helperText={errors?.brand_id?.message || ''}
                    />
                  )}
                />
                <RHFTextField name='price' label='Price' type='number' disabled={isSubmitting} />
                <RHFTextField name='sku_id' label='SKU' type='text' disabled={isSubmitting} />

                <RHFTextField name='qty' label='Stock (Qty)' type='number' disabled={isSubmitting} />
              </Box>
              {fields?.length > 0
                ? fields.map((field, index) => (
                    <Grid key={field?.id} display='flex'>
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

              <Grid display='flex' mt={2} justifyContent='flex-end'>
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
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: '25px' }}>
              <Typography variant='h6' gutterBottom>
                Product Attributes
              </Typography>
              <Box
                rowGap={3}
                columnGap={2}
                display='grid'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)'
                }}
              >
                <Autocomplete
                  fullWidth
                  multiple
                  options={colors}
                  // eslint-disable-next-line no-unneeded-ternary
                  getOptionLabel={option => (option ? option.name : '')}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setValue('colors', newValue, {
                      shouldValidate: true,
                      shouldDirty: true
                    })
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Color'
                      placeholder=''
                      name='colors'
                      error={Boolean(errors?.colors)}
                      helperText={errors?.colors?.message || ''}
                    />
                  )}
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
                {sizeField?.length > 0
                  ? sizeField.map((field, index) => (
                      <Grid key={field?.id} display='flex'>
                        <RHFTextField
                          multiline
                          key={field.id}
                          name={`sizes.${index}.value`}
                          sx={{ mt: 2 }}
                          label='Sizes'
                          placeholder='Enter Sizes'
                        />
                        <IconButton
                          color='error'
                          sx={{
                            display: watch('sizes')?.length > 1 ? 'flex' : 'none',
                            width: 'fit-content',
                            borderRadius: '8px'
                          }}
                          onClick={() => sizeRemove(index)}
                        >
                          <Icon icon='material-symbols:close' />
                        </IconButton>
                      </Grid>
                    ))
                  : null}
                <Stack alignItems='flex-end' sx={{ mt: 2 }}>
                  <Button
                    startIcon={<Icon icon='material-symbols:add' />}
                    onClick={() => {
                      sizeAppend('')
                    }}
                    color='primary'
                    variant='contained'
                  >
                    Add More
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: '25px' }}>
              <Typography variant='h6' gutterBottom>
                Product Dimensions
              </Typography>
              <Box
                rowGap={3}
                columnGap={2}
                display='grid'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)'
                }}
              >
                <RHFTextField name='length' label='Length (inches)' type='number' disabled={isSubmitting} />
                <RHFTextField name='width' label='Width (inches)' type='number' disabled={isSubmitting} />
                <RHFTextField name='height' label='Height (inches)' type='number' disabled={isSubmitting} />
                <RHFTextField name='weight' label='Weigth (kg)' type='number' disabled={isSubmitting} />
              </Box>
            </Card>
          </Grid>
        </Grid>
        <FormDialog
          maxWidth='sm'
          title='Add New Category'
          open={createOpenProductCategory}
          setOpen={setCreateOpenProductCategory}
        />

        <FormDialog maxWidth='lg' title='Add New Brand' open={createOpenBrand} setOpen={setCreateOpenBrand} />
        <Stack alignItems='flex-end' sx={{ mt: 3, mb: 3 }}>
          <LoadingButton type='submit' variant='contained' loading={isLoading}>
            Create Product
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  )
}
