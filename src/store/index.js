// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

import user from 'src/store/apps/user'
import others from 'src/store/apps/others'
import product from 'src/store/apps/product'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    user,
    product,
    others
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { useSelector, useDispatch }
