// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
import { LogoSvg } from '../logo'
import themeConfig from 'src/configs/themeConfig'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
       {themeConfig?.appLogo ? (
            <Image alt=''  objectFit='contain' width={190} height={70} style={{margin:"1rem 0rem"}} src={themeConfig?.appLogo} />
          ) : (
            LogoSvg()
          )}
      <CircularProgress disableShrink sx={{ mt: 2 }} />
    </Box>
  )
}

export default FallbackSpinner
