import firebaseService from '../services/firebase.js'
import loaderService from "../services/loader.js"

class AdminService {
    constructor() { }

    init() {
        this.template();
        this._dataRef = firebaseService.getPostRef() // Global variable of collection "posts" in firebase
        this._posts = []; // global array
        this.read() // runs the function
    }

    template() {
        document.getElementById('content').innerHTML += /*html*/ `
        <section id="admin" class="page">
            <h2>Godkend</h2>
         <p>På denne side kan du godkende eller slette opslag fra fanerne "Hvad siger andre". Opslagene vises ikke på selve hjemmesiden før de er blevet godkendt her.</p>
            <h3 class="leftH3">Godkend følgende nye opslag:</h3>
            <div id="unApprovedPosts"></div>

            <h3 class="leftH3">Følgende opslag er allerede godkendt:</h3>
            <div id="approvedPosts"></div>
        </section>
      `;
    }

    read() {
        this._dataRef.onSnapshot(snapshotData => { //each time the contents change, another call updates the document snapshot.
            this._posts = []; // this asures that the posts array is empty every time new posts is pushed to is
            snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
                let post = doc.data(); // save the data in a variable
                post.id = doc.id; // add the id to the data variable
                this._posts.push(post); // push the data object to the global array _posts
            });
            this.appendAllPosts(this._posts);
        })
    }

    appendAllPosts(posts) {
        let approvedPosts = document.querySelector("#approvedPosts");
        approvedPosts.innerHTML = '';
        let unApprovedPosts = document.querySelector("#unApprovedPosts");
        unApprovedPosts.innerHTML = '';


        for (let post of posts) {
            if (post.approved === true) {
                approvedPosts.innerHTML += `
                <section class="postSection">
                <h3 class="centerH3">Etape '${post.etape}'</h3>
                <div class="approvedImage">
                <img src="${post.image}">
                </div>
                <div class="sayText">
                <p>"${post.text}"</p>
                <p>-${post.name}</p>
                </div>
                <button class="approveBtn" onclick="deletePost('${post.id}')">Slet</button>
                </section>
            `
            } else {
                unApprovedPosts.innerHTML += `
                <section class="postSection">
                <h3 class="centerH3">Etape '${post.etape}'</h3>
                <div class="approvedImage">
                <img src="${post.image}">
                </div>
                <div class="sayText">
                <p>"${post.text}"</p>
                <p>-${post.name}</p>
                </div>
                <button class="approveBtn" onclick="approvePost('${post.id}')">Godkend</button>
                <button class="approveBtn" onclick="deletePost('${post.id}')">Slet</button>
                </section>
            `
            }
        }
        loaderService.show(false);
    };

    deletePost(id) {
        let result = confirm("Er du sikker på at du vil slette?");
        if (result) {
            this._dataRef.doc(id).delete();
        }
    };

    approvePost(id) {
        this._dataRef.doc(id).update({
            approved: true
        })
    };

}
const adminService = new AdminService();
export default adminService;