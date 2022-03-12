//to use redux we have to create a store a stoer of our aplications state
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '0e021b9f04msh6bb87ad79e3dd5cp105330jsnad699f1b1a6a',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';
// "method": "GET",
// "headers": {
// 	"x-rapidapi-host": "coinranking1.p.rapidapi.com",
// 	"x-rapidapi-key": "0e021b9f04msh6bb87ad79e3dd5cp105330jsnad699f1b1a6a"
// url: 'https://coinranking1.p.rapidapi.com/coins',
// }

const createRequest = (url) => ({ url: url, headers: cryptoApiHeaders });

export const cryptoApiReq = createApi({
  reducerPath: 'cryptoApiReq',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      // limits the data we get back to the count
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCoinDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`),
      // createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
  }),
});

//naming here is important must match the query in the api just cammel with use infrom and camel case noice
export const {
  useGetCoinsQuery,
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
} = cryptoApiReq;

//created the store in index.js to store our applications state
// like the routes we wrapped the app in our provider component(to store it and have accessd to the store)
//we then created an api using the createApi and fetchbasequery  passing in and reducer path(as rn think just name)
//base to our queries aka base url (makes sense), the our endpoints (believe where all paths will be defined)
// in endpoint call function with builder passed in(just param for arg later) that then obj
// in obj we define ('path/action) : builder.query (building query) = ({with obj passed})
// in obj have our query : = a funciton run() runs our createRequest to (passing in specified path)
//so upon this path will make a request to base ect... (basic understanding here)

//we also after creating the api have to connect it to the store by importing it into the store.js
