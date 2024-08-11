import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: 'api',  // name of the slice just like we do in createSlice
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'user/login',
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export default api;
export const {
    useLoginUserMutation,
} = api;