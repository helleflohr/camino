class FirebaseService {
  constructor() {
    this.db;
    this.init();
  }

  // ========== GLOBAL FIREBASE CONFIG ========== //
  //Johanne
  // Your web app's Firebase configuration
  init() {
    const _firebaseConfig = {
      apiKey: "AIzaSyDekBcVlEX7Txg1nT1YFMQx1QI6z1-m0lk",
      authDomain: "caminofh.firebaseapp.com",
      databaseURL: "https://caminofh.firebaseio.com",
      projectId: "caminofh",
      storageBucket: "caminofh.appspot.com",
      messagingSenderId: "741677566222",
      appId: "1:741677566222:web:1d3cc8c3a0421ee2a0ef5f"
    };
    // Initialize Firebase
    firebase.initializeApp(_firebaseConfig);
    this.db = firebase.firestore();

  }
  getPostRef() {
    return this.db.collection("posts");
  }
}
const firebaseService = new FirebaseService();
export default firebaseService;