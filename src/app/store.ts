import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from '../utils/arms/user/reducer';
// import dialogReducer from '../utils/arms/dialog/reducer';

const combinedReducer = combineReducers({
    user: userReducer,
    // dialog: dialogReducer,
});

const store = configureStore({
    reducer: combinedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;