import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "../slice/apiSlice";
import authReducer from "../slice/authSlice.js"
import userSocialReducer from "../slice/userSocialSlice.js"
import onboardReducer from "../slice/onboardSlice.js"


const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        userSocial:userSocialReducer,
        userOnboard:onboardReducer,
        

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:{
            ignoredPaths:['userApi.util.unsubscribe'],
            ignoredActions:['userApi/executeQuery/pending'],
        }
    }).concat(apiSlice.middleware)
})



export default store;