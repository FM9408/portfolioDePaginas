import ProductsSlicer from "./getProducts" 
import {combineSlices} from "@reduxjs/toolkit"



const productMainSlicer =  combineSlices({
    getProducts: ProductsSlicer.reducer
})




export default productMainSlicer