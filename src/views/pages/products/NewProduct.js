import { useCallback, useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material'

// form
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// Redux
// import { useDispatch, useSelector } from 'src/redux/store';

import { LoadingButton } from '@mui/lab'
import Icon from 'src/@core/components/icon'
import FormProvider from 'src/@core/components/formProvider'
// import { RHFUpload } from 'src/@core/components/RHF/RHFUpload';
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import { RHFAutocomplete } from 'src/@core/components/RHF/RhfAutocomplete'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FormDialog from 'src/@core/components/dialog/FormDialog'

export default function NewProduct() {
  //   const { enqueueSnackbar } = useSnackbar();
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { productCategories, productTypes, allocationTypes, isLoading } = useSelector(
  //     (state) => state?.products
  //   );

  const [createOpenProductCategory, setCreateOpenProductCategory] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [createOpenType, setCreateOpenType] = useState(false)
  const [createOpenBrand, setCreateOpenBrand] = useState(false)

  const inviteNewUserSchema = Yup.object().shape({
    product_photo: Yup.mixed().optional(),
    name: Yup.string().required('Name is required'),
    nameOnWebsite: Yup.string().required('Name on website is required'),
    isHot: Yup.boolean().required('Condition is required'),
    meatOrVeg: Yup.string().required('Type is required'),
    notes: Yup.string().required('Notes is required'),
    productCategory: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          uuid: Yup.string().required()
        })
      )
      .required(),
    productType: Yup.object()
      .shape({
        name: Yup.string().required('Product type is required'),
        uuid: Yup.string().required('Product type is required')
      })
      .required('Product type is required'),
    allocationType: Yup.object()
      .shape({
        name: Yup.string().required('Allocation type is required'),
        uuid: Yup.string().required('Allocation type is required')
      })
      .required('Allocation type is required'),
    price: Yup.string().required('Price is required').typeError('Price is required'),
    gstApplicable: Yup.boolean().required('GST is required')
  })

  const defaultValues = {
    product_photo: '',
    name: '',
    nameOnWebsite: '',
    isHot: false,
    meatOrVeg: '',
    productCategory: [],
    productType: undefined,
    allocationType: undefined,
    notes: '',
    price: '',
    gstApplicable: false,
    description: ['']
  }

  const methods = useForm({
    resolver: yupResolver(inviteNewUserSchema),
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

  const onSubmit = async data => {
    // const selected_categories = data?.productCategory?.map((zone: { uuid}) => zone.uuid);
    // const type = data?.meatOrVeg === 'Vegetable' ? 'veg' : 'meat';
    // let obj = {
    //   name: data?.name,
    //   nameOnWebsite: data?.nameOnWebsite,
    //   isHot: data?.isHot,
    //   meatOrVeg: type,
    //   productCategories: selected_categories,
    //   productType: data?.productType?.uuid || null,
    //   allocationType: data?.allocationType?.uuid || null,
    //   price: Number(data?.price),
    //   notes: data?.notes,
    //   gstApplicable: data?.gstApplicable,
    // };
    // if (data?.product_photo instanceof File) {
    //   const formData = new FormData();
    //   formData.append('file', data?.product_photo);
    //   Object.entries(obj).forEach(([key, value]) => {
    //     if (value !== null && typeof value === 'object') {
    //       Object.entries(value).forEach(([nestedKey, nestedValue]) => {
    //         formData.append(`${key}[${nestedKey}]`, String(nestedValue));
    //       });
    //     } else if (typeof value === 'boolean') {
    //       formData.append(key, String(value));
    //     } else {
    //       const valueToAppend = value !== null ? value : null;
    //       formData.append(key, String(valueToAppend));
    //     }
    //   });
    //   obj = formData;
    // }
    // await createNewProduct(obj).then((res) => {
    //   if (res?.status === 200) {
    //     enqueueSnackbar(res?.data?.message);
    //     navigate(PATH_PRODUCTS.productsPage);
    //   } else {
    //     enqueueSnackbar(res?.data?.message, { variant: 'error' });
    //   }
    // });
  }

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0]

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file)
      })

      if (file) {
        setValue('product_photo', newFile, {
          shouldValidate: true,
          shouldDirty: true
        })
      }
    },
    [setValue]
  )

  //   useEffect(() => {
  //     dispatch(fetchAllProductCategories(enqueueSnackbar));
  //     dispatch(fetchAllProductTypes(enqueueSnackbar));
  //     dispatch(fetchAllAllocationTypes(enqueueSnackbar));
  //   }, [dispatch, enqueueSnackbar]);
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
                {watch('product_photo') && (
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => resetField('product_photo')}
                    color='error'
                    startIcon={<Icon icon='gg:trash' width={18} />}
                  >
                    Remove Image
                  </Button>
                )}
              </Grid>

              <DropzoneWrapper>
                <FileUploaderMultiple />
              </DropzoneWrapper>

              {/* <RHFUpload
                name="product_photo"
                maxSize={3000000}
                onDrop={handleDrop}
                disabled={isSubmitting}
              /> */}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: '25px' }}>
              <Typography variant='h6' gutterBottom>
                Product Details
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
                <RHFTextField name='name' label='Name' disabled={isSubmitting} />
                <Autocomplete
                  multiple
                  fullWidth
                  options={[]}
                  // eslint-disable-next-line no-unneeded-ternary
                  getOptionLabel={option => (option ? option.name : '')}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setValue('productCategory', newValue, {
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
                    <TextField {...params} label='Product Category' placeholder='' name='productCategory' />
                  )}
                />
                <Autocomplete
                  fullWidth
                  options={[]}
                  // eslint-disable-next-line no-unneeded-ternary
                  getOptionLabel={option => (option ? option.name : '')}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setValue('productType', newValue, {
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
                    <TextField {...params} label='Product Brand' placeholder='' name='productType' />
                  )}
                />

                <RHFTextField name='price' label='Price' type='number' disabled={isSubmitting} />
                <RHFTextField name='price' label='SKU' type='number' disabled={isSubmitting} />
                <RHFTextField name='price' label='Length (inches)' type='number' disabled={isSubmitting} />
                <RHFTextField name='price' label='Width (inches)' type='number' disabled={isSubmitting} />
                <RHFTextField name='price' label='Height (inches)' type='number' disabled={isSubmitting} />
                <RHFTextField name='price' label='Weigth (kg)' type='number' disabled={isSubmitting} />
                <RHFTextField name='price' label='Stock (Qty)' type='number' disabled={isSubmitting} />
              </Box>
              {fields?.length > 0
                ? fields.map((field, index) => (
                    <Grid key={field?.id} display='flex'>
                      <RHFTextField
                      multiline
                        name={`description.${index}`}
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

            <Stack alignItems='flex-end' sx={{ mt: 3, mb: 3 }}>
              <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                Create Product
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
        <FormDialog
          maxWidth='sm'
          title='Add New Category'
          open={createOpenProductCategory}
          setOpen={setCreateOpenProductCategory}
        />

        <FormDialog maxWidth='lg' title='Add New Brand' open={createOpenBrand} setOpen={setCreateOpenBrand} />
      </FormProvider>
    </Container>
  )
}
