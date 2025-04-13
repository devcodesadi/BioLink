import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const baseQuery=fetchBaseQuery({baseUrl:"http://localhost:3000"})

const apiSlice=createApi({
    baseQuery,
    credentials:"include",
    tagTypes:["BioLink"],
    endpoints:(builder)=>({})
})



export default apiSlice;