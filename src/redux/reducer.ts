import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IState } from '../types'
import api from '../api'
import jwtDecode from 'jwt-decode'
export const getUsers = createAsyncThunk("getUsers", async () => {
    const res = await api.getUsers()
    return res.data
})
export const register = createAsyncThunk('register', async (user: any) => {
    try {
        const res = await api.registration(user)
        return res.data

    } catch (error) {
        return error
    }
})
export const login = createAsyncThunk('login', async (credentilas: any) => {
    const res = await api.login(credentilas)
    return res.data
})
export const deleteUser = createAsyncThunk("deleteUser", async (username: string) => {
    const { data } = await api.deleteUser(username)
    return { data, username }
})
export const updateStatus = createAsyncThunk('updateStatus', async (credentilas: any) => {
    const res = await api.setStatus(credentilas.stat, credentilas.username)
    return res.data
})
const initialState: IState = {
    authState: {
        user: {
            email: "",
            password: "",
            status: "Not-blocked",
            username: "", _id: "", lastEnterance: "", registred: ""
        },
        isAuth: false,
        error: false,
        loader: false,
        token: "",
        message: ""
    }, usersState: {
        users: [],
        loader: false,
        error: false
    }
}
const slice = createSlice({
    name: "userSlice", initialState, reducers: {
        setUser(state, action) {
            state.authState.isAuth = true
            state.authState.user = action.payload

        }, setError(state) {
            state.authState.error = false
        }, logOut(state) {
            state.authState.isAuth = false
        }
    }, extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.usersState.loader = true
        }).addCase(getUsers.rejected, (state) => {
            state.usersState.loader = false
            state.usersState.error = true
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.usersState.loader = false
            state.usersState.users = action.payload
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.authState.isAuth = true
            state.authState.loader = false
            state.authState.user = jwtDecode(action.payload.token)
        }).addCase(register.rejected, (state, action) => {
            state.authState.loader = false
            state.authState.error = true
            state.authState.message = 'Походу нету такой учетной записи или вы ввели не правильно'
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.authState.isAuth = true;
            state.authState.user = jwtDecode(action.payload.token)

        }).addCase(login.rejected, (state) => {
            state.authState.error = true
            state.authState.message = 'Походу нету такой учетной записи или вы ввели не правильно'

        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.usersState.users = state.usersState.users.filter(e => e.username !== action.payload.username)
        })
        builder.addCase(updateStatus.fulfilled, (state, action) => {

        })
    }
})

export const { setUser, setError, logOut } = slice.actions
export default slice.reducer