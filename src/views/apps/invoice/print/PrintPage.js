
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import Image from 'next/image'
import { LogoSvg } from 'src/@core/components/logo'
import dayjs from 'dayjs'

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const InvoicePrint = ({ data }) => {
  // ** Hooks
  const theme = useTheme()
  if (data) {
    return (
      <Box id='preview_print' sx={{ p: 12, pb: 6 }}>
        <Grid container>
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                {themeConfig?.appLogo ? (
                  <Image
                    alt=''
                    width={200}
                    height={80}
                    style={{ margin: '1rem 0rem', objectFit: 'contain' }}
                    src={themeConfig?.appLogo}
                  />
                ) : (
                  LogoSvg()
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {`Invoice #${data?.id}`}
              </Typography>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography variant='body2' sx={{ mr: 3 }}>
                  Date Issued:
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container>
          <Grid item xs={7} md={8} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
              Invoice To:
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.full_name}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.email}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.phone}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.email}
            </Typography>
          </Grid>
          <Grid item xs={5} md={4}>
            <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
              Shipping Address:
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.address1}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.address2}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.city}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.state} , {data?.AddressEntity?.pin}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.country}
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {data?.AddressEntity?.phone}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important' }} />

        <Table sx={{ mb: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>qty</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.OrderitemEntities?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item?.ProductEntity?.name || ''}</TableCell>
                <TableCell>{item?.ProductEntity?.sku_id || ''}</TableCell>
                <TableCell>{item?.ProductEntity?.price || ''}</TableCell>
                <TableCell>{item?.quantity || ''}</TableCell>
                <TableCell>${Number(item?.ProductEntity?.price) * item?.quantity || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Grid container>
          <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
            <Typography variant='body2'>Thanks for your Order</Typography>
          </Grid>
          <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
            <CalcWrapper>
              <Typography variant='body2'>Subtotal:</Typography>
              <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                ${data?.total}
              </Typography>
            </CalcWrapper>
            <Divider
              sx={{ mt: theme => `${theme.spacing(5)} !important`, mb: theme => `${theme.spacing(3)} !important` }}
            />
            <CalcWrapper>
              <Typography variant='body2'>Total:</Typography>
              <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                ${data?.total}
              </Typography>
            </CalcWrapper>
          </Grid>
        </Grid>

        <Divider sx={{ my: `${theme.spacing(6)} !important` }} />
        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
          <strong>Note:</strong> It was a pleasure fullfilling your Order. We hope you will keep us in mind for future
          Orders. Thank You!
        </Typography>
      </Box>
    )
  } else {
    return null
  }
}

export default InvoicePrint
