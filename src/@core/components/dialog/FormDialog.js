/* eslint-disable react/no-unstable-nested-components */
// @mui
import { Dialog, DialogTitle, DialogContent, Typography, Breakpoint, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import AddBrandForm from 'src/views/pages/brand/AddBrandForm'
import AddCategoryForm from 'src/views/pages/category/AddCategoryForm'

export default function FormDialog({ open, setOpen, title, id, log, maxWidth, display_close_icon }) {
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={maxWidth || 'xs'}
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '200px'
        }
      }}
    >
      <DialogTitle>
        <Typography sx={{ fontSize: 22, fontWeight: 'bold' }} color={theme.palette.text.primary}>
          {title}
        </Typography>
        {display_close_icon && (
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              color: 'text.primary',
              position: 'absolute',
              right: 15,
              top: 15
            }}
          >
            <Icon icon='material-symbols:close' style={{ width: 26, height: 24 }} />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent >{DialogContentCheck(title)}</DialogContent>
    </Dialog>
  )

  function DialogContentCheck(title, id) {
    switch (title) {
      case 'Add New Category':
        return <AddCategoryForm  type='Add'  handleClose={handleClose} />
      case 'Add New Brand':
        return <AddBrandForm handleClose={handleClose} />
      default:
        return null
    }
  }
}
