import { createSlice } from "@reduxjs/toolkit"


const initialState={
    socialList:[]
}



const userSocialSlice=createSlice({
    name:"userSocial",
    initialState,
    reducers:{
        Setsocial:(state,action)=>{
            state.socialList.push(action.payload)
        },
        updateSocial:(state,action)=>{
            const { key ,newUrl}=action.payload;
            const index=state.socialList.findIndex(social=>social.key===key);

            if(index!==-1){
                state.socialList[index].url=newUrl
            }
        },
        removeSocial:(state,action)=>{
            const { key }=action.payload;
            const index=state.socialList.findIndex(social=>social.key===key)
            if(index!==-1){
                state.socialList.splice(index,1)
            }
        }
    }

})


export const { Setsocial ,updateSocial,removeSocial}=userSocialSlice.actions

export  default userSocialSlice.reducer