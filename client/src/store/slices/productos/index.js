import ProductsSlicer from "./getProducts" 
import productSlice from "./product"
import {combineSlices} from "@reduxjs/toolkit"



const productMainSlicer =  combineSlices({
    getProducts: ProductsSlicer.reducer,
    product: productSlice.reducer
})




export default productMainSlicer