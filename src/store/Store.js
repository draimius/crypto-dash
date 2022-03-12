import { configureStore } from '@reduxjs/toolkit';

import { cryptoApiReq } from '../services/cryptoApi';
import { cryptoNewsApiReq } from '../services/cyptoNewsApi';

export default configureStore({
  reducer: {
    [cryptoApiReq.reducerPath]: cryptoApiReq.reducer,
    [cryptoNewsApiReq.reducerPath]: cryptoNewsApiReq.reducer,
  },
});
