import { createSlice } from "@reduxjs/toolkit";


const storedBio=localStorage.getItem("bio")?JSON.parse(localStorage.getItem("bio")):{name:"",username:"",about:""}
const storedSocial=localStorage.getItem("onboardsocial")?JSON.parse(localStorage.getItem("onboardsocial")):[]

const initialState={
    bio:storedBio,
    onboardSocial:storedSocial

}

const onboardSlice=createSlice({
    name:"onboarding",
    initialState,
    reducers:{
        addBio:(state,action)=>{
            const { name,username,about}=action.payload;
            state.bio={name,username,about}
            localStorage.setItem("bio",JSON.stringify({name,username,about}))
            
        },
        onboardLinks:(state,action)=>{
            state.onboardSocial.push(action.payload)
            localStorage.setItem("onboardsocial",JSON.stringify(state.onboardSocial))
        }
    }

})




export const { addBio ,onboardLinks}=onboardSlice.actions;


export default onboardSlice.reducer