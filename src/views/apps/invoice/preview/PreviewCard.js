import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import InvoicePrint from '../print/PrintPage'

const PreviewCard = ({ data }) => {
  if (data) {
    return (
      <Card>
        <InvoicePrint data={data} />
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
