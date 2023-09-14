import { alpha } from '@mui/material/styles'
import { IconButton, ListItem, Stack, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ----------------------------------------------------------------------

export default function MultiFilePreview({ thumbnail, files, onRemove, sx }) {
  if (!files?.length) {
    return null
  }

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const fileList = files.map(file => {
    const isNotFormatFile = typeof file === 'string'
    return (
      <ListItem key={file.name}>
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
        <IconButton onClick={() => onRemove(file)}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </ListItem>
    )
  })

  return (
    <Fragment>
      <List>{fileList}</List>
      <div className='buttons'>
        <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
          Remove All
        </Button>
        {/* <Button variant='contained'>Upload Files</Button> */}
      </div>
    </Fragment>
  )
}
