import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  producto: {
    id: "",
    title: "",
    description: "",
    rating: {
      rate: 0,
      count: 0,
    },
    price: 0,
    image: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
        state.producto = action.payload
    },
  },
});



export const {setProduct} = productSlice.actions


export default productSlice
