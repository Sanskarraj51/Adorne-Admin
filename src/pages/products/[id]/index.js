// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'

import FallbackSpinner from 'src/@core/components/spinner'
import { CardContent } from '@mui/material'

// import { fetchProductDetails } from 'src/store/apps/product'
import { useDispatch, useSelector } from 'react-redux'
import ProductInfo from 'src/views/pages/products/ProductInfo'
import BasicInfoTab from 'src/views/pages/products/BasicInfoTab'
import ProductImagesTab from 'src/views/pages/products/ProductImagesTab'
import AttributeTab from 'src/views/pages/products/AttributeTab'
import Pricestab from 'src/views/pages/products/Pricestab'
import { fetchBrandData, fetchCategoryData, fetchColorData, fetchProductDetailData, fetchSizeData } from 'src/store/apps/product'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const ProductDetail = () => {
  // ** State
  const [value, setValue] = useState('basic')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const { productDetail } = useSelector(state => state.product)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getProductDetailData = async () => {
    setLoading(true)
    await dispatch(fetchProductDetailData(id))
    setLoading(false)
  }

  const refreshProductDetailData = async () => {
    await dispatch(fetchProductDetailData(id))
  }

  useEffect(() => {
    if (id) {
      getProductDetailData()
    }
  }, [id])

  useEffect(() => {
    dispatch(fetchColorData())
    dispatch(fetchSizeData())
    dispatch(fetchCategoryData())
    dispatch(fetchBrandData())
  }, [dispatch])



  if (loading) {
    return <FallbackSpinner />
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <ProductInfo productData={productDetail?.products} mediaUrl={productDetail?.mediaUrl} />

        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='basic'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Shopping sx={{ fontSize: '1.125rem' }} /> */}
                  <Icon icon='mdi:shopping' fontSize={20} />

                  <TabName>Basic Info</TabName>
                </Box>
              }
            />
            <Tab
              value='images'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Image  sx={{ fontSize: '1.125rem' }} /> */}
                  <Icon icon='mdi:image' fontSize={20} />

                  <TabName>Product Images</TabName>
                </Box>
              }
            />
            <Tab
              value='attributes'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon='mdi:flag-outline' fontSize={20} />

                  <TabName>Attributes</TabName>
                </Box>
              }
            />
            <Tab
              value='pricing'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon='mdi:currency-usd' fontSize={20} />

                  <TabName>Variants</TabName>
                </Box>
              }
            />
          </TabList>{' '}
          <TabPanel sx={{ p: 0 }} value='basic'>
            <BasicInfoTab
              productInfo={productDetail?.products}
              id={id}
              getProductDetailData={refreshProductDetailData}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='images'>
            <ProductImagesTab productDetail={productDetail?.products} getProductDetails={refreshProductDetailData} mediaUrl={productDetail?.mediaUrl} />
          </TabPanel>
          
          <TabPanel sx={{ p: 0 }} value='attributes'>
            <AttributeTab  productAttribute={productDetail?.productAttribute} productData={productDetail?.products} getProductDetails={refreshProductDetailData} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='pricing'>
            <Pricestab productAttribute={productDetail?.productAttribute} detailData={productDetail?.products} getProductDetails={refreshProductDetailData} />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

ProductDetail.acl = {
  action: 'read',
  subject: 'Product'
}

export default ProductDetail
