import { Button, FormControl, Grid, InputAdornment } from '@mui/material'
import React from 'react'
import IconifyIcon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import Icon from 'src/@core/components/icon'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

const schema = yup.object().shape({
  name: yup.string().required('Brand name is required'),
  description: yup.string().required('escription is required')
})

const defaultValues = {
  description: '',
  email: ''
}

const AddBrandForm = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = methods
  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid sx={{ mt: 1 }} container spacing={5}>
        <Grid item xs={12} md={6}>
          <DropzoneWrapper>
            <FileUploaderSingle />
          </DropzoneWrapper>
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
              <Button disabled={!isValid} fullWidth type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default AddBrandForm
