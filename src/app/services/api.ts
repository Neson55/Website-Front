import { fetchBaseQuery, retry, createApi } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { BASE_URL } from "../../constans";

const baseQuery = fetchBaseQuery ({
    baseUrl: `${BASE_URL}/api`, 
    prepareHeaders:(headers ,{getState})=>{
        const token = (getState() as RootState).auth.token||localStorage.getItem('token')
    
    if(token) {
        headers.set('authorization',`Bearer ${token}`)
    }
return headers;
    }
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3})

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints:()=>({})
})
