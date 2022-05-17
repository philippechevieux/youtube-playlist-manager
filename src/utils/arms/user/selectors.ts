import { RootState } from "../../../app/store";

export const selectIsUserLogin = (state: RootState) => {
    return state.user.isUserLogin;
}