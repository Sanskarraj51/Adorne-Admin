// ** React Imports
import { Fragment, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderMultiple = ({ onHandleDrop }) => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 20000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      let newFiles = acceptedFiles.map(file => Object.assign(file))
      setFiles([...files, ...newFiles])
      onHandleDrop([...files, ...newFiles])
    },
    onDropRejected: () => {
      toast.error('You can only upload 5 files & maximum size of 20 MB.', {
        duration: 5000
      })
    }
  })

  const renderFilePreview = file => {
    return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem
      key={file.name}
      secondaryAction={
        <IconButton color='error' onClick={() => handleRemoveFile(file)}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      }
    >
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Drop files here or click{' '}
              <Link href='/' onClick={e => e.preventDefault()}>
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List sx={{ width: '100%' }}>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            {/* <Button variant='contained'>Upload Files</Button> */}
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
