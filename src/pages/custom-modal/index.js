import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, Fade, IconButton, Typography, alpha } from '@mui/material'
import React, { forwardRef } from 'react'
import UseBgColor from 'src/@core/hooks/useBgColor'
import Icon from 'src/@core/components/icon'


export const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

export const ModalActions = ({ selected, children }) => {
  return (
    <Box
      className='modal__titlediv'
      sx={{ bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) }}
    >
      <Typography color='inherit' variant='subtitle1' component='div'>
        {selected ? selected : ''}
      </Typography>

      {children}
    </Box>
  )
}

function CustomModal(props) {
  // ** props
  const { closeDialog, children, open, title, size, scroll, id, fullScreen, actionComponent } = props

  // ** custom background manage component
  const bg = UseBgColor()

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen || false}
      open={open}
      maxWidth={size || 'sm'}
      scroll={scroll || 'body'}
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
      id={id || 'custom_modal'}
    >
      <Box className='modal__titlediv' sx={{ background: '#86533C' }}>
        <Typography variant='h6' color='white' sx={{ display: 'flex', alignItems: 'center' }}>
          {title}
        </Typography>
        <IconButton size='small' onClick={closeDialog}>
        <Icon icon='mdi:close' color='white'  />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: { xs: 7, sm: 10.5 }, py: { xs: 3, sm: 4 }, position: 'relative' }}>
        {children}
      </DialogContent>
      {actionComponent}
    </Dialog>
  )
}

export default CustomModal
