import { configureStore } from '@reduxjs/toolkit';
// import { postApi } from '../services/postApi.ts';
// import { authApi } from '../services/authApi.ts';
// import { categoryApi } from '../services/categoryApi';

const store = configureStore({
    reducer: {
        // [postApi.reducerPath]: postApi.reducer,
        // [authApi.reducerPath]: authApi.reducer,
        // [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // postApi.middleware,
            // authApi.middleware,
            // categoryApi.middleware
        ),        
});

console.log('Redux Store State:', store.getState()); // Додай цей лог


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


// import { configureStore } from '@reduxjs/toolkit';
// import { authApi } from './services/authApi';

// const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
