import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/invoice/preview/PreviewCard'
import { Button, Card, CardContent } from '@mui/material'

const InvoicePreview = ({ data }) => {
  function printAll(elementId, uniqueIframeId) {
    const content = document.getElementById(elementId)
    let pri
    if (document.getElementById(uniqueIframeId)) {
      pri = document.getElementById(uniqueIframeId).contentWindow
    } else {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('title', uniqueIframeId)
      iframe.setAttribute('id', uniqueIframeId)
      iframe.setAttribute('style', 'height: 0px; width: 0px; position: absolute;')
      document.body.appendChild(iframe)
      pri = iframe.contentWindow
    }
    pri.document.open()
    pri.document.write(content.innerHTML)
    pri.document.close()
    pri.focus()
    pri.print()
  }

  if (data) {
    return (
      <>
        <Grid container justifyContent={'center'} spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard id={'preview_print'} data={data} />
          </Grid>
        </Grid>
      </>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>Something Went Wrong</Alert>
        </Grid>
      </Grid>
    )
  }
}

export default InvoicePreview
