class FirebaseService {
  constructor() {
    this.db;
    this.init();
    // this._posts = [];
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

  // read() {
  //   this._dataRef.onSnapshot(snapshotData => { //each time the contents change, another call updates the document snapshot.
  //     this._posts = []; // this asures that the posts array is empty every time new posts is pushed to is
  //     snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
  //       let post = doc.data(); // save the data in a variable
  //       post.id = doc.id; // add the id to the data variable
  //       this._posts.push(post); // push the data object to the global array _posts
  //     });
  //     console.log(this._posts);
  //   })
  // }
}
const firebaseService = new FirebaseService();
export default firebaseService;