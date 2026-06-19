import { db, auth } from "./config";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { collection, doc, query,  setDoc, getDocs} from "firebase/firestore";
import { v4 } from "uuid";
// import {ref, uploadBytes } from "firebase/storage";
import { productosMock, usuariosMock } from "../hooks/mock.js"; // El mock de 60 productos generado previamente
// import { UseAuth} from "../context/AuthContext.jsx"
// Reemplaza con tus credenciales de Firebase

// Una imagen PNG real de 1x1 píxel en Base64 para simular un archivo físico válido
// const PNG_BASE64_MOCK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// Función auxiliar para convertir el Base64 en un archivo binario (Blob) legible por Storage
// const base64ToBlob = (base64Data) => {
//   const byteString = atob(base64Data.split(',')[1]);
//   const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ab], { type: mimeString });
// };

export const ejecutarInyeccionAutomatica = async () => {
  console.log("Iniciando inyección masiva de 60 productos con imágenes reales...");
  const checkIfIsWittenProducts =  query(collection(db, "productos"))
  const checkIfISWrittebUsers = query(collection(db, "users"))
  const productSnapshot = (await getDocs(checkIfIsWittenProducts))
  const userSnapshot = (await getDocs(checkIfISWrittebUsers))

  try {
    // const imagenBlob = base64ToBlob(PNG_BASE64_MOCK);

    if (productSnapshot.docs.length === 0) {
      for (const producto of await productosMock) {
        producto.id = v4();
        // 1. Subir la imagen simulada con metadatos correctos de tipo de contenido
        //   const storageRef = ref(storage, producto.imagenPath);
        //   await uploadBytes(storageRef, imagenBlob, { contentType: 'image/png' });
        //   console.log(`[Storage] Imagen creada en: ${producto.imagenPath}`);

        // 2. Insertar el documento en Firestore
        const docRef = doc(collection(db, "productos"), producto.id);
        const datosFirestore = {
          ...producto,
        };

        await setDoc(docRef, datosFirestore);
        console.log(`[Firestore] Documento creado con ID: ${producto.id}`);
      }
    }
    if (userSnapshot.docs.length === 0) {
      console.log(userSnapshot.docs.length)
      for (const user of await usuariosMock) {
        setTimeout(async () => {
          const newUser = (await createUserWithEmailAndPassword(auth, user.email, user.password)).user;
          await updateProfile(newUser, { displayName: user.username, photoURL: "" });
          signOut(auth);
        }, 5000);
      }
    }
    console.log("¡Proceso finalizado con éxito! 60 productos e imágenes listos.");

  } catch (error) {
    console.error("Error en la inyección de datos:", error);
  }
};
