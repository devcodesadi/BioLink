import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery=fetchBaseQuery({baseUrl:import.meta.env.VITE_API_BASE_URL,
    credentials:"include"
})
console.log("backedn env",import.meta.env.VITE_API_BASE_URL)

const apiSlice=createApi({
    baseQuery,
    credentials:"include",
    tagTypes:["BioLink"],
    endpoints:(builder)=>({})
})



export default apiSlice;