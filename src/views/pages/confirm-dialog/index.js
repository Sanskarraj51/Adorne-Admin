import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { forwardRef } from 'react'
import IconifyIcon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

function ConfirmBox({ name, title, toDoFunction, closeDialog, open, loading }) {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ px: { xs: 8, sm: 12.5 }, py: { xs: 8, sm: 12 }, position: 'relative' }}>
        <IconButton size='small' onClick={closeDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <IconifyIcon icon='mdi:close' />

        </IconButton>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='h4' sx={{ mb: 3, lineHeight: '2rem' }}>
                Delete {title}
              </Typography>
              <Typography variant='body1'>Are You Sure you want to delete {name} ?</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={closeDialog} sx={{ mx: 3 }}>
              Cancel
            </Button>

            <LoadingButton
              loadingPosition='start'
              variant='contained'
              color='error'
              sx={{ mr: 4 }}
              loading={loading}
              startIcon={<IconifyIcon icon='mdi:delete' />}
              onClick={toDoFunction}
            >
              Delete
            </LoadingButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmBox
