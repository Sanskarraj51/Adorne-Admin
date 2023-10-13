// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import EcommerceTotalVisits from 'src/views/dashboards/ecommerce/EcommerceTotalVisits'
import EcommerceVisitsByDay from 'src/views/dashboards/ecommerce/EcommerceVisitsByDay'
import EcommerceLiveVisitors from 'src/views/dashboards/ecommerce/EcommerceLiveVisitors'
import EcommerceSalesOverview from 'src/views/dashboards/ecommerce/EcommerceSalesOverview'
import EcommerceWeeklySalesBg from 'src/views/dashboards/ecommerce/EcommerceWeeklySalesBg'
import EcommerceSalesThisMonth from 'src/views/dashboards/ecommerce/EcommerceSalesThisMonth'
import EcommerceActivityTimeline from 'src/views/dashboards/ecommerce/EcommerceActivityTimeline'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import CrmPaymentHistory from 'src/views/dashboards/crm/CrmPaymentHistory'

const EcommerceDashboard = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={8}>
            <AnalyticsCongratulations />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EcommerceLiveVisitors />
          </Grid>
          <Grid item xs={12} md={6}>
            <EcommerceSalesOverview />
          </Grid>
          <Grid item xs={12} md={6}>
            <EcommerceWeeklySalesBg />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <EcommerceTotalVisits />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <EcommerceSalesThisMonth />
          </Grid>
          <Grid item xs={12} md={6}>
            <EcommerceActivityTimeline />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <EcommerceSalesOverviewWithTabs /> */}
            <EcommerceVisitsByDay />
          </Grid>
          <Grid item xs={12} sm={6} >
          <CrmPaymentHistory />
        </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <EcommerceImpressionsOrders />
          </Grid>
          <Grid item xs={12} md={5} sx={{ order: [2, 2, 1] }}>
            <EcommerceMarketingSales />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ order: [1, 1, 2] }}>
          </Grid> */}
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default EcommerceDashboard
