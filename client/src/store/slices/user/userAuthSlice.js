import { createSlice } from "@reduxjs/toolkit";


const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        user: {
            uid: "",
            email: "",
            displayName: "",
            photoURL: "",
            role: "",
            createdAt: "",
        },
    },
    reducers: {
        setUserinStore (state, action) {
            state.user = {...action.payload}
        },
        detRoleinStore (state, action) {
            state.user.role = action.payload;
        },
        cleanUserStore (state) {
            state.user = {
                uid: "",
                email: "",
                displayName: "",
                photoURL: "",
                role: "",
                createdAt: "",
            };
        }
    },
})

export const { setUserinStore, cleanUserStore, setRoleinStore} = userAuthSlice.actions;
export default userAuthSlice.reducer;