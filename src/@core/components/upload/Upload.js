import { useDropzone } from 'react-dropzone'

// @mui
import { Box, Stack, Button, IconButton, Typography, StackProps } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

// assets
//
import Icon from 'src/@core/components/icon'
import SingleFilePreview from './preview/SingleFilePreview'
import FileUploaderSingle, {
  HeadingTypography,
  Img
} from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import Link from 'next/link'

// import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// import { UploadIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export const StyledDropZone = styled('div')(({ theme }) => ({
  minHeight: 300,
  display: 'flex',
  flexWrap: 'wrap',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `2px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72
  }
}))

// ----------------------------------------------------------------------

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  file,
  onDelete,
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  onDrop,
  ...other
}) {
  // const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
  //   multiple,
  //   disabled,
  //   ...other
  // })

  const hasFile = !!file && !multiple


  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <DropzoneWrapper
      
        // {...getRootProps()}
        sx={{
          ...(error && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light'
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none'
          }),
          ...(hasFile && {
            padding: '12% 0'
          })
        }}
      >
        {multiple ? <FileUploaderMultiple onHandleDrop={onDrop} /> : <FileUploaderSingle onHandleDrop={onDrop}/>}
      </DropzoneWrapper>
    </Box>
  )
}
