import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
// import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../../firebase/config";

export  const getProductsFromDB = createAsyncThunk("products/getProductsFromDB", async (_, { rejectWithValue }) => {
  try {
    const listaPlana = [];
    const q = query(collection(db, "productos"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // SOLUCIÓN AL ERROR DE REDUX: Convertimos el Timestamp de Firestore a milisegundos (un número plano serializable)
    //   let fechaSerializada = null;
    //   if (data.fechaCreacion && typeof data.fechaCreacion.toMillis === "function") {
    //     fechaSerializada = data.fechaCreacion.toMillis();
    //   } else if (data.fechaCreacion && data.fechaCreacion.seconds) {
    //     fechaSerializada = data.fechaCreacion.seconds * 1000;
    //   }

      listaPlana.push({ 
        id: doc.id, 
        ...data,
        
      });
    });

    // const productosConImagenes = await Promise.all(
//   listaPlana.map(async (producto) => {
    // // Si NO tiene la propiedad o viene vacía, ahí SÍ saltamos al siguiente
    // if (!producto.imagenPath || producto.imagenPath === "") {
    //   return { ...producto, imageUrl: "" };
    // }
    
    // try {
    //   // Si tiene path, entramos aquí obligatoriamente
    //   const imagenRef = ref(storage, producto.imagenPath);
    //   const url = await getDownloadURL(imagenRef);
    //   return { ...producto, imageUrl: url }; 
    // } catch (err) {
    //   console.error(`Error resolviendo imagen para ${producto.id}:`, err);
    //   // Si Firebase da error (por ejemplo, token o permisos), le asignamos una de Unsplash directa para que no se rompa la UI
    //   return { ...producto, imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" }; 
    // }

    //   })
    // );
    return listaPlana
  } catch (error) {
    return rejectWithValue(error.message || "Error al cargar el catálogo");
  }
});

const initialState = {
  productos: [], // Ahora guardaremos un array plano de forma limpia
  loading: true,
  error: null,
};

const getProductSlice = createSlice({
  name: "getProduct",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productos = action.payload;
    },
    queryProductById: (state, action) => {
      
      state.productos.forEach((e) => {
        if (e.id === action.payload.id) {
          return e
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsFromDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsFromDB.fulfilled, (state, action) => {
        state.loading = false;
        // CORRECCIÓN: Los arrays mutados o clonados incorrectamente rompen Redux. Guardamos el payload directo.
        state.productos = action.payload; 
      })
      .addCase(getProductsFromDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, queryProductById } = getProductSlice.actions;
export default getProductSlice;