import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleGetAPI } from 'src/@core/api-handler'
import authConfig from 'src/configs/auth'

// ** Fetch ProductData
export const fetchProductData = createAsyncThunk('appProduct/fetchProductData', async params => {
  // const { name, status, supplier, category } = params

  let response = await handleGetAPI(authConfig.product)

  return response
})

// ** Fetch CategoryData
export const fetchCategoryData = createAsyncThunk('appProduct/fetchCategoryData', async () => {
  let response = await handleGetAPI(authConfig.category)

  return response
})

// ** Fetch Brand Data
export const fetchBrandData = createAsyncThunk('appProduct/fetchBrandData', async () => {
  let response = await handleGetAPI(authConfig.brand)

  return response
})

// ** Fetch Color Data
export const fetchColorData = createAsyncThunk('appProduct/fetchColorData', async () => {
  let response = await handleGetAPI(authConfig.colors)

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
    brandData: [],
    colors: []
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
      state.data = action.payload.respData
    })
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.categoryData = action.payload.data
    })
    builder.addCase(fetchBrandData.fulfilled, (state, action) => {
      state.brandData = action.payload.data
    })
    builder.addCase(fetchColorData.fulfilled, (state, action) => {
      state.colors = action.payload.data
    })
  }
})

export const { setProductData, setCategoryDetailDataData } = appProductSlice.actions

export default appProductSlice.reducer
