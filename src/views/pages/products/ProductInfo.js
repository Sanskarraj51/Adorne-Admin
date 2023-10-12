import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const ProductInfo = ({ productData ,mediaUrl}) => {
  let desc = productData?.description ? JSON.parse(productData?.description) : []

  return (
    <Grid container spacing={6} minHeight='25vh'>
      <Grid item xs={12} sm={8} sx={{ order: [2, 1] }}>
        <Box>
          <Typography variant='h6'>
            {productData?.name || ''} ({productData?.sku_id || ''})
          </Typography>
          <Typography variant='body2' sx={{ mt: 3 }}>
            {productData?.shortDescription || ''}
          </Typography>
          <ul>
            {desc?.map((item, i) => (
              <li key={i}>
                <Typography variant='body2' sx={{ mt: 3 }}>
                  {item?.value || ''}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          order: [1, 2],
          textAlign: 'center'
        }}
      >
        <img
          style={{ width: '15rem', maxHeight: '18rem', objectFit: 'contain' }}
          src={
            productData?.ProductImageEntities?.length
              ? `${mediaUrl}${productData?.ProductImageEntities[0]?.key}`
              : '/images/products/iphone-11.png'
          }
          alt=''
        />
      </Grid>
    </Grid>
  )
}

export default ProductInfo
