import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXPvGl3y_IWGpU7GvixTL9uEuF0WAyNCk",
  authDomain: "realtime-cnn.firebaseapp.com",
  databaseURL: "https://realtime-cnn-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-cnn",
  storageBucket: "realtime-cnn.appspot.com",
  messagingSenderId: "856972582342",
  appId: "1:856972582342:web:d4f6747a958fe848b7e6c7",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getData = (path: string) => {
  const dataRef = ref(db, path);
  let res = "";
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    res = JSON.stringify(data);
  });

  return res;
};

export { app, db, getData };
