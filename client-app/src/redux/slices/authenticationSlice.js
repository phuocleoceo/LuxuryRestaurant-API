import { SET_USER, GET_USER, REMOVE_USER } from '../../extension/UserLS';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOGIN } from '../../api/apiAuthentication';

export const LoginAction = createAsyncThunk(
    "authentication/LoginAction",
    async (body) =>
    {
        try
        {
            const response = await LOGIN(body);
            return {
                Accepted: response.status === 200,
                ResponseData: response.data
            };
        }
        catch { return { Accepted: false }; }
    }
);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {},
    reducers: {
        CheckLoggedIn: (state, action) =>
        {
            const user = GET_USER();
            if (user) return user.user;
            return {};
        },
        Logout: (state, action) =>
        {
            REMOVE_USER();
            return {};
        }
    },
    extraReducers: {
        [LoginAction.fulfilled]: (state, action) =>
        {
            if (action.payload.Accepted)
            {
                // Save UserInfor and Token to LocalDB if Login Succes
                SET_USER(action.payload.ResponseData);
                return action.payload.ResponseData.user;
            }
            return {};
        }
    }
})

export const { CheckLoggedIn, Logout } = authenticationSlice.actions

export default authenticationSlice.reducer