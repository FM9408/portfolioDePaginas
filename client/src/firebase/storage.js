import { storage } from "./config";
import { ref, getDownloadURL, listAll } from "firebase/storage";



export async function getUserImage (uid) {
    const userRef = ref(storage, 'users/' + uid + '/profilePhotos');
    try {
       const elements = await listAll(userRef);
       const url = await getDownloadURL(elements.items[0]);
       console.info(url)
       return url;
    } catch (err) {
        console.error(err);
   }

}



