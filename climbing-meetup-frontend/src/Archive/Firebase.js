// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsxF_MnSMafsVMgkGntTVC8G8ntrivoUg",
  authDomain: "climbing-meetup-app.firebaseapp.com",
  projectId: "climbing-meetup-app",
  storageBucket: "climbing-meetup-app.appspot.com",
  messagingSenderId: "760383874499",
  appId: "1:760383874499:web:f99dcbd321e9d5f1708976",
  measurementId: "G-JV2WVT51XZ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {firebaseApp, storage};

// Authenticated private
// https://firebase.google.com/docs/storage/security/rules-conditions#authenticated_private
// // Require authentication on all internal image reads
// match /internal/{imageId} {
//   allow read: if request.auth != null;
// }

// User private
// https://firebase.google.com/docs/storage/security/rules-conditions#user_private
// Only a user can upload their profile picture, but anyone can view it
// match /users/{userId}/profilePicture.png {
//   allow read;
//   allow write: if request.auth.uid == userId;
// }



// service firebase.storage {
//   match /b/image-view-b1cf5.appspot.com/o {
//     match /{allPaths=**} {
//         allow read;
//         allow write: if request.auth != null;
//     }
//   }
// } 


  // use const storage = getStorage() or const storage = getStorage(app);

  // need to create a ref to upload/download data
  // const storageRef = ref(storage, 'image.jpg');

  // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });

  // const url = 'sean-benesh-VnmbcgAfL3Q-unsplash.jpg';
  
 
  // Get the download URL
  // async function getImage(){
  //   export declare function getBytes(ref: StorageReference, maxDownloadSizeBytes?: number): Promise<ArrayBuffer>;
  // }
