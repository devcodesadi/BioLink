import { createSlice } from "@reduxjs/toolkit";

let userInfoFromStorage=null;

try {
    const userInfo=localStorage.getItem("userInfo");
    
    userInfoFromStorage=userInfo?JSON.parse(userInfo):null;
} catch (error) {
    
    localStorage.removeItem("userInfo")
}


const initialState={
     userInfo:userInfoFromStorage
}



const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload;
            
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },

        logoutClear:(state,action)=>{
            state.userInfo=null
            localStorage.removeItem("userInfo")
        }
    }

    
})





export const { setCredentials ,logoutClear}=authSlice.actions



export default authSlice.reducer