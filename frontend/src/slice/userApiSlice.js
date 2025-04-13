import apiSlice from "./apiSlice";

const USER_URL = "/api/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    checkAuth: builder.query({
      query: () => ({
        url: `${USER_URL}/isvalid`,
        method: "GET",
        credentials: "include",
      }),
    }),
    onboard: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/onboard`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updateUserSocial: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updatesocial`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["BioLink"],
    }),
    removeSocial: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/remove`,
        method: "POST",
        body: data,
        credentials:"include"
      }),
      invalidatesTags:["BioLink"]
    }),
    editBioLinks:builder.mutation({
      query:(data)=>({
        url:`${USER_URL}/editlinks`,
        method:"POST",
        body:data,
        credentials:"include"
      }),
      invalidatesTags:["BioLink"]
    }),
    getBioLink: builder.query({
      query: () => ({
        url: `${USER_URL}/getbiolink`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["BioLink"],
    }),
    getPublicBio:builder.query({
      query:(username)=>({
        url:`/${username}`,
        method:"GET",
      }),
      providesTags:["BioLink"]
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useCheckAuthQuery,
  useOnboardMutation,
  useUpdateUserSocialMutation,
  useEditBioLinksMutation,
  useRemoveSocialMutation,
  useGetBioLinkQuery,
  useGetPublicBioQuery,
} = userApiSlice;
