import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { handleGetAPI } from 'src/@core/api-handler'
import authConfig from 'src/configs/auth'

// ** Fetch ProductData
export const fetchProductData = createAsyncThunk('appProduct/fetchProductData', async params => {
  const { name, status, supplier, category } = params

  let response = await handleGetAPI('/products')
  return response

  //     let importType = params?.isImported === 'both' ? '' : `isImport=${params?.isImported || false}`
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_ENDPOINT}/supplier/products?name=${name || ''}&status=${status || ''}&supplierId=${
  //         supplier || ''
  //       }&${importType}&${category?.map((n, index) => `categoryId[${index}]=${n}`).join('&')}
  //       `,
  //       {
  //         headers: { Authorization: `JWT ${localStorageToken()}` }
  //       }
  //     )
  //     return response.data
  //   } catch (err) {
  //     checkLoginError(err)
  //     let arr = []
  //     return arr
  //   }
})

// ** Fetch CategoryData
export const fetchCategoryData = createAsyncThunk('appProduct/fetchCategoryData', async () => {
  let response = await handleGetAPI(authConfig.category)
  return response
})

// export const fetchProductDetails = createAsyncThunk('appProduct/fetchProductDetails', async ({ id }) => {
//   try {
//     const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/supplier/product/${id}/edit`, {
//       headers: { Authorization: `JWT ${localStorageToken()}` }
//     })

//     return res.data
//   } catch (err) {
//     checkLoginError(err)
//     let arr = []
//     return arr
//   }
// })

export const appProductSlice = createSlice({
  name: 'appProduct',
  initialState: {
    data: [],
    categoryData: [],
    categoryDetailData: {},
    brandData: []
  },
  reducers: {
    setProductData: (state, action) => {
      state.data = action.payload
    },
    setCategoryDetailDataData: (state, action) => {
      state.categoryDetailData = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.categoryData = action.payload.data
    })
  }
})

export const { setProductData, setCategoryDetailDataData } = appProductSlice.actions

export default appProductSlice.reducer
