import * as React from 'react'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormHelperText } from '@mui/material'

export const RHFAutocompleteField = props => {
  const { control, options, name, size, handleChange } = props
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
              size={size || 'small'}
              value={
                value
                  ? options.find(option => {
                      return value === option.id
                    }) ?? null
                  : null
              }
              getOptionLabel={option => {
                return option.label
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
            />
            {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
          </>
        )
      }}
    />
  )
}
