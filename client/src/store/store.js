import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./slices/user/userAuthSlice.js"
import productReducer from "./slices/productos/index.js"


const store = configureStore({
    reducer: {
        userAuth: userreducer,
        productos: productReducer
    },
});

export default store;