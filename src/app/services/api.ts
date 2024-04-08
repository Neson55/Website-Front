import { fetchBaseQuery, retry, createApi } from "@reduxjs/toolkit/query/react";
import  type { RootState } from "../store";
import { BASE_URL } from "../../constans";

const baseQuery = fetchBaseQuery ({
    baseUrl: `${BASE_URL}/api`, 
    prepareHeaders:(headers ,{getState})=>{
        const token = (getState() as RootState).user.token||localStorage.getItem('token')
    
    if(token) {
        headers.set('authorization',`Bearer ${token}`)
    }
return headers;
    }
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints:()=>({})
})
