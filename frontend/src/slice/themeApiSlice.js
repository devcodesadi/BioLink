import apiSlice from "./apiSlice";


const url='/api'


const getThemeSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchTheme:builder.query({
            query:()=>({
                url:`${url}/theme`,
                method:"GET",

            })
        })
    })
})


export const { useFetchThemeQuery}=getThemeSlice;