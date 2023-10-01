import { database } from "@/firebase/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const firestoreAddData = async (file,uid, data) => {
    console.log(uid);
  // const collectionRef = collection(database, `${file}/${uid}`);

  
  await setDoc(doc(database,file, uid),data)
  // addDoc(collectionRef, data,)
    .then(() => {
      console.log("data added");
    })
    .catch((err) => {
      console.log("error: ", err.message);
    });
};
