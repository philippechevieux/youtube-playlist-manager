import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userDefaultData} from './state';

export const userSlice = createSlice({
    name: 'user',
    initialState: userDefaultData,
    reducers: {
        setUserLogin: (state: any, action: PayloadAction<{googleLoginResponse: any}>) => {
            if (!state.isUserLogin) {
                state.accessToken = action.payload.googleLoginResponse.accessToken;
                state.googleId = action.payload.googleLoginResponse.googleId;
                state.email = action.payload.googleLoginResponse.email;
                state.avatar = action.payload.googleLoginResponse.avatar;
                state.firstName = action.payload.googleLoginResponse.firstName;
                state.lastName = action.payload.googleLoginResponse.lastName;
                state.fullName = action.payload.googleLoginResponse.fullName;
                state.isUserLogin = true;
            }
        },
        setUserLogout: (state: any) => {
            state.accessToken = userDefaultData.accessToken;
            state.googleId = userDefaultData.googleId;
            state.email = userDefaultData.email;
            state.avatar = userDefaultData.avatar;
            state.firstName = userDefaultData.firstName;
            state.lastName = userDefaultData.lastName;
            state.fullName = userDefaultData.fullName;
            state.isUserLogin = userDefaultData.isUserLogin;
        },
        setUserLanguage: (state: any, action: PayloadAction<{language: string}>) => {
            state.language = action.payload.language;
        }
    }
});

export const {setUserLogin, setUserLogout, setUserLanguage} = userSlice.actions;

export default userSlice.reducer;
