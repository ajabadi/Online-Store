import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
  reducer: {
    main: reducer,
  },
});

export default store;

