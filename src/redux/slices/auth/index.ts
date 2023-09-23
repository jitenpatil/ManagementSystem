import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        userAuthInfo:{
            email: "",
            phoneNumber: "",
            customerName: "",
            isAdmin: false,
            isLoggedIn: false
        }

    } as any,
    reducers:{
        setUserAuthInfo: (state:any, action:any) => {
            state.userAuthInfo = {...action.payload}
        }
    },
});

export const { setUserAuthInfo } = authSlice.actions;
export default authSlice.reducer;