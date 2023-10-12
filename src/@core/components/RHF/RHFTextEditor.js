import { FormControl, FormHelperText } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import WYSWIGEditor from '../WYSWIGEditor'

export default function RHFTextEditor({ name, helperText, previewVal, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component='fieldset'>
          <WYSWIGEditor fullWidth value={field.value} previewVal={previewVal} onChange={data => field.onChange(data)} {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
