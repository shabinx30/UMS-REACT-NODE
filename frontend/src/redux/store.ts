import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    token: null,
    user: null
}

const user = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token,
            state.user = action.payload.user
        },
        logout: (state) => {
            state.token = null,
            state.user = null
        }
    }
})


const allUser = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addData: (_, action) => {
            return action.payload
        }
    }
})

const handleModal = createSlice({
    name: "modal",
    initialState: { index: null, status: false },
    reducers: {
        modalcontrol: (state, action) => {
            state.index = action.payload.index,
                state.status = action.payload.status
        }
    }
})

const store = configureStore({
    reducer: {
        auth: user.reducer,
        users: allUser.reducer,
        modal: handleModal.reducer
    }
})


export const { login, logout } = user.actions
export const { addData } = allUser.actions
export const { modalcontrol } = handleModal.actions
export default store