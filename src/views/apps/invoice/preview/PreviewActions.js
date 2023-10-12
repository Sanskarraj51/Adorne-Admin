

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'


const PreviewActions = () => {
  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          color='secondary'
          variant='outlined'
        >
          Print
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
