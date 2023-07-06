import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputAdornment } from '@mui/material'
import React from 'react'
import IconifyIcon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import Icon from 'src/@core/components/icon'

const schema = yup.object().shape({
  name: yup.string().required('Brand name is required'),
  description: yup.string().required('escription is required')
})

const defaultValues = {
  description: '',
  email: ''
}

const AddBrands = () => {
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
    resetField,
    formState: { errors, isSubmitting, isValid }
  } = methods
  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader title='Add Brand' />
      <CardContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
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
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default AddBrands
