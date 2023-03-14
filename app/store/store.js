import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../components/counter/counterSlice'


export default configureStore({
  reducer: {
    counter: counterSlice
  }
})