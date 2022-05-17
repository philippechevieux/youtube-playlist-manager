import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../utils/arms/user/reducer'
import globalReducer from '../utils/arms/global/reducer'

const combinedReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
})

const store = configureStore({
    reducer: combinedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
