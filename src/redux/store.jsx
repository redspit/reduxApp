import { configureStore } from "@reduxjs/toolkit"
import {NewsSlice} from './News/NewsSlice'

export const store = configureStore({
    reducer: {
        NewsSlice,
    }
})