import firebaseService from './../services/firebase.js'
import loaderService from "./../services/loader.js"

export default class ApprovePage {
    constructor() {
        this.template();
        this._dataRef = firebaseService.getPostRef() // Global variable of collection "posts" in firebase
        this._posts = []; // global array
        this.read() // runs the function
    }

    template() {
        document.getElementById('content').innerHTML += /*html*/ `
        <section id="approve" class="page">
            <h2>Godkend</h2>
         
            <h3>Godkend følgende nye opslag:</h3>
            <div id="unApprovedPosts"></div>

            <h3>Følgende opslag er allerede godkendt:</h3>
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
        //sort the posts by acf stagenumber in ascending order
        // posts.sort(function (x, y) {
        //     return x.acf.stageNumber - y.acf.stageNumber;
        // });

        for (let post of posts) {
            if (post.state === true) {
                document.querySelector("#approvedPosts").innerHTML += `
                <section class="approvedPostSection">
                <div class="sayImage">
                <img src="${post.image}">
                </div>
                <div class="sayText">
                <p>"${post.text}"</p>
                <p>-${post.name}</p>
                </div>
                <button>Slet</button>
                </section>
            `
            } else {
                document.querySelector("#unApprovedPosts").innerHTML += `
            <section class="approvedPostSection">
            <div class="sayImage">
            <img src="${post.image}">
            </div>
            <div class="sayText">
            <p>"${post.text}"</p>
            <p>-${post.name}</p>
            </div>
            <button>Godkend</button>
            <button>Slet</button>
            </section>
        `
            }

        }

        loaderService.show(false);
    };


}