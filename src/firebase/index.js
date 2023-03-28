import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0WUrqYrqtbjgn5JP078U2XLxLxWP9aNo",

  authDomain: "todo-planner-87abf.firebaseapp.com",

  projectId: "todo-planner-87abf",

  storageBucket: "todo-planner-87abf.appspot.com",

  messagingSenderId: "366096843101",

  appId: "1:366096843101:web:dfb267e55cd0332866a8b4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
