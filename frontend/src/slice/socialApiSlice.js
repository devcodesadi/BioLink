import apiSlice from "./apiSlice";

const apiUrl="/api"


const socialApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchSocial:builder.query({
            query:()=>({
                url:`${apiUrl}/getsocial`,
                method:"GET",
                credentials:"include"
            })
        }),
        

    })
})




export const {useFetchSocialQuery }=socialApiSlice;