import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userDetails:{
            token:null,
            name:null,
            id:null
        }
    },
    reducers:{
        addUser:(state,action)=>{
            state.userDetails.token = action.payload.token;
            state.userDetails.name = action.payload.name;
            state.userDetails.id = action.payload.id

        },
        removeUser:(state,action)=>{
            state.userDetails.token = null
            state.userDetails.name = null
            state.userDetails.id = null
        }
    }
})

export const {addUser , removeUser } = userSlice.actions
export default userSlice.reducer