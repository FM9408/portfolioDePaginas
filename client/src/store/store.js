import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./slices/user/userAuthSlice.js"


const store = configureStore({
    reducer: {
        userAuth: userreducer,
    },
});

export default store;