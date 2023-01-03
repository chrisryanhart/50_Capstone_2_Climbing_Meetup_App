import React from "react";
import { getStorage, uploadBytes, ref, getDownloadURL, getBytes } from "firebase/storage";
import { firebaseApp, storage } from "./Firebase";


function MeetupList(){
  // use const storage = getStorage() or const storage = getStorage(app);

  // need to create a ref to upload/download data
  const storageRef = ref(storage, 'image.jpg');

  // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });

  // const url = 'sean-benesh-VnmbcgAfL3Q-unsplash.jpg';
  
 
  // Get the download URL
  // async function getImage(){
  //   export declare function getBytes(ref: StorageReference, maxDownloadSizeBytes?: number): Promise<ArrayBuffer>;
  // }

    
  // save the users url in their profile 

  return (
        <div>
            <p>My Meetups:</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/climbing-meetup-app.appspot.com/o/sean-benesh-VnmbcgAfL3Q-unsplash.jpg?alt=media&token=9f5685b0-3529-40c3-98d2-5b54b1b09825"/>

        </div>
    );

}

export default MeetupList;
