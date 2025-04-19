import apiSlice from "./apiSlice";



const socialApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchSocial:builder.query({
            query:()=>({
                url:`/api/getsocial`,
                method:"GET",
                credentials:"include"
            })
        }),
        

    })
})


export const {useFetchSocialQuery }=socialApiSlice;