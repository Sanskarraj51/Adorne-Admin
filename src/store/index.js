// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import others from 'src/store/apps/others'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
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
