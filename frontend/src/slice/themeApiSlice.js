import apiSlice from "./apiSlice";





const getThemeSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchTheme:builder.query({
            query:()=>({
                url:`/api/theme`,
                method:"GET",

            })
        })
    }),
    overrideExisting:false,
})


export const { useFetchThemeQuery}=getThemeSlice;