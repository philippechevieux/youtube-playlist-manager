import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../utils/arms/user/reducer'
import playlistsReducer from '../utils/arms/playlists/reducer'

const combinedReducer = combineReducers({
    user: userReducer,
    playlists: playlistsReducer,
})

const store = configureStore({
    reducer: combinedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
