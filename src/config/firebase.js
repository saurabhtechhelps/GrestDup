import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRs6Y5qyHvZT9HEEBbDJRWeLM2cTpiSWY",
  authDomain: "otpmsg-780cd.firebaseapp.com",
  projectId: "otpmsg-780cd",
  storageBucket: "otpmsg-780cd.appspot.com",
  messagingSenderId: "590087856593",
  appId: "1:590087856593:web:50e2aa18aa18dcfcb040f0",
  measurementId: "G-J2T71FW3KW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
