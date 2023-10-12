// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { LoadingButton } from '@mui/lab'

import FormProvider from 'src/@core/components/formProvider'
import RHFTextField from 'src/@core/components/RHF/RHFTextField'
import CustomModal from 'src/pages/custom-modal'
import { handlePostAPI, handlePutAPI } from 'src/@core/api-handler'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  name: yup.string().required('Name is required')
})

const defaultValues = {
  name: ''
}

const AddMasterDialog = props => {
  const { value, dialogStatus, show, setShow, editData, url, getAllData } = props
  const [loading, setLoading] = useState(false)

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

  async function addMasterData(data) {
    setLoading(true)

    let bodyData = {
      name: data?.name
    }

    let response = ''

    if (dialogStatus === 'Add') {
      response = await handlePostAPI(url, bodyData)
    } else {
      response = await handlePutAPI(url, bodyData)
    }
    if (response) {
      getAllData ? getAllData() : null
      setShow(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (dialogStatus === 'Update') {
      setValue('name', editData?.name)
    } else {
      reset(defaultValues)
    }
  }, [editData])

  return (
    <CustomModal open={show} closeDialog={() => setShow(false)} title={dialogStatus + ' ' + value}>
      <CardContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(addMasterData)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <RHFTextField name='name' fullWidth label='Name' placeholder='John Doe' sx={{ mt: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type='submit' loading={loading} variant='contained' sx={{ mr: 4 }}>
                Save Changes
              </LoadingButton>
              <Button type='reset' variant='outlined' onClick={() => setShow(false)} color='secondary'>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </CardContent>
    </CustomModal>
  )
}

export default AddMasterDialog
