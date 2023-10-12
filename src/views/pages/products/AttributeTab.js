import React, { useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  ListItem,
  styled,
  TextField,
  Typography,
  useTheme
} from '@mui/material'

import MuiCard from '@mui/material/Card'
import { LoadingButton } from '@mui/lab'
import UseBgColor from 'src/@core/hooks/useBgColor'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { handlePostAPI } from 'src/@core/api-handler'
import { useSelector } from 'src/store'

const CardDesign = styled(MuiCard)(({ theme, bg }) => ({
  border: 0,
  width: '95%',
  padding: theme.spacing(2),
  backgroundColor: bg.primaryLight.backgroundColor
}))

const AttributeTab = ({ productData, getProductDetails, productAttribute }) => {
  const bg = UseBgColor()
  const theme = useTheme()
  const { colors, sizes } = useSelector(state => state?.product)

  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleColorSize(data) {
    setLoading(true)
    let url = '/productvariation/select-attribute'
    //eslint-disable-next-line
    const response = await handlePostAPI(url, data, null)
    if (response) {
      toast.success('Product Updated Successfully')
      await getProductDetails()
      setColor([])
      setSize([])
    }
    setLoading(false)
  }

  const unique = arr => {
    let uniqueIds = []

    arr.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id)

      if (!isDuplicate) {
        uniqueIds.push(element.id)

        return true
      }

      return false
    })

    return uniqueIds
  }

  const removeId = (arr, id) => {
    let uniqueIds = []

    arr.filter(element => {
      if (element?.id !== id) {
        uniqueIds.push(element.id)

        return true
      }

      return false
    })

    return uniqueIds
  }

  const addColors = e => {
    e.preventDefault()
    if (color?.length < 1) {
      toast.error('Enter Color to Add')

      return
    }
    let newArray = [...productAttribute?.color, ...color]
    let array1 = unique(newArray)

    let data = {
      color: array1.toString(),
      product_id: productData?.id
    }

    handleColorSize(data)
  }

  const addSizes = e => {
    e.preventDefault()
    if (size?.length < 1) {
      toast.error('Enter Size to Add')

      return
    }
    let newArray = [...productAttribute?.size, ...size]
    let array1 = unique(newArray)

    let data = {
      size: array1.toString(),
      product_id: productData?.id
    }

    handleColorSize(data)
  }

  const removeSizes = size => {
    let array = removeId(productAttribute?.size, size)

    let data = {
      size: array.toString(),
      product_id: productData?.id
    }

    handleColorSize(data)
  }

  const removeColors = color => {
    let array = removeId(productAttribute?.color, color)

    let data = {
      color: array.toString(),
      product_id: productData?.id
    }

    handleColorSize(data)
  }

  return (
    <Box sx={{ mt: 2 }}>
      {productAttribute?.color?.length > 0 ? (
        <>
          <Typography fontWeight={600} sx={{ mt: 6 }}>
            Colors :
          </Typography>

          <CardDesign bg={bg} sx={{ mt: 2, mb: 4 }}>
            {productAttribute?.color?.map((data, i) => (
              <Chip
                id={data?.id}
                sx={{ m: 1, bgcolor: data?.code }}
                key={i}
                label={data?.name}
                onDelete={() => removeColors(data?.id)}
                deleteIcon={<Icon icon='mdi:close' />}
              />
            ))}
          </CardDesign>
        </>
      ) : null}
      <form className='flex__box' onSubmit={addColors}>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} sm={6}>
            {/* <TextField value={color} onChange={e => setColor(e.target.value)} label='Enter Color name' fullWidth /> */}

            <Autocomplete
              fullWidth
              multiple
              options={colors}
              value={color}
              // eslint-disable-next-line no-unneeded-ternary
              getOptionLabel={option => (option ? option.name : '')}
              filterSelectedOptions
              onChange={(event, newValue) => {
                setColor(newValue)
              }}
              renderInput={params => <TextField {...params} label='Color' placeholder='' name='colors' />}
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <LoadingButton sx={{ ml: 2 }} loading={loading} type='submit' variant='contained'>
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 4, '& .MuiDivider-wrapper': { px: 4 } }} />
      {productAttribute?.size?.length > 0 ? (
        <>
          <Typography fontWeight={600} sx={{ mt: 6 }}>
            Sizes :
          </Typography>

          <CardDesign bg={bg} sx={{ mt: 2, mb: 4 }}>
            {productAttribute?.size?.map((data, i) => (
              <Chip
                id={data?._id}
                color='primary'
                key={i}
                sx={{ m: 1 }}
                label={data?.name}
                onDelete={() => removeSizes(data?.id)}
                deleteIcon={<Icon icon='mdi:close' />}
              />
            ))}
          </CardDesign>
        </>
      ) : null}
      <form className='flex__box' style={{ marginBottom: '2rem' }} onSubmit={addSizes}>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              multiple
              options={sizes}
              // eslint-disable-next-line no-unneeded-ternary
              getOptionLabel={option => (option ? option.name : '')}
              filterSelectedOptions
              value={size}
              onChange={(event, newValue) => {
                setSize(newValue)
              }}
              renderInput={params => <TextField {...params} label='Sizes' placeholder='' />}
            />

            {/* <TextField value={size} onChange={e => setSize(e.target.value)} label='Enter Size name' fullWidth /> */}
          </Grid>

          <Grid item xs={12} sm={6}>
            <LoadingButton sx={{ ml: 2 }} loading={loading} type='submit' variant='contained'>
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AttributeTab
