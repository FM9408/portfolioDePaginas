import axios from "axios"

// Generamos los 60 productos dinámicamente
async function generarProductos(){
  try {
    const productos = await axios.get('https://fakestoreapi.com/products')
  return productos.data
  } catch (error) {
    throw new Error(error)
  }
};


export const productosMock = generarProductos();



async function generarUsuarios() {
    try {
        const usuarios = await axios.get("https://fakestoreapi.com/users")
        return usuarios.data
    } catch (error) {
        throw new Error(error)
    }
}

export const usuariosMock = generarUsuarios()