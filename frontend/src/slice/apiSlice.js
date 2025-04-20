import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery=fetchBaseQuery({baseUrl:"https://biolink-v7u6.onrender.com",
    credentials:"include"
})

const apiSlice=createApi({
    baseQuery,
    credentials:"include",
    tagTypes:["BioLink"],
    endpoints:(builder)=>({})
})



export default apiSlice;