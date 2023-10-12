import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormHelperText } from '@mui/material'

export const RHFAutocomplete = props => {
  const { options, name, size, handleChange, ...other } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field

        return (
          <>
            <Autocomplete
              size={size || 'medium'}
              value={
                value
                  ? options?.find(option => {
                      return value === option.id
                    }) ?? null
                  : null
              }
              getOptionLabel={option => {
                return option?.name
              }}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.id : '')
                handleChange ? handleChange(newValue ? newValue.id : '') : null
              }}
              id='controllable-states-demo'
              options={options}
              renderInput={params => (
                <TextField error={Boolean(error)} {...params} label={props.placeholder} inputRef={ref} />
              )}
              {...other}
            />
            {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
          </>
        )
      }}
    />
  )
}
