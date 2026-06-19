import { storage } from "./config";
import { ref, getDownloadURL, listAll } from "firebase/storage";



export async function getUserImage (uid) {
    const userRef = ref(storage, 'users/' + uid + '/profilePhotos');
    try {
       const elements = await listAll(userRef);
       if(elements.items.length > 0) {
          const url = await getDownloadURL(elements.items[0]);
          console.info(url)
         return url;
       }else {
        return null;
       }
       
    } catch (err) {
        console.error(err);
   }

}



