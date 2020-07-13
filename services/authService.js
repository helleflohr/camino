import spaService from "./spa.js";
import loaderService from "./loader.js";
import firebaseService from "./firebase.js";
import adminService from "./admin.js";

class AuthService {
    constructor() {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.userRef = firebaseService._db.collection("users");
        this.authUser;
        this.authUserRef;
    }

    init() {
        // Listen on authentication state change
        firebase.auth().onAuthStateChanged(user => {
            if (user) { // if user exists and is authenticated
                this.userAuthenticated(user);
            } else { // if user is not logged in
                this.userNotAuthenticated();
                console.log('not authicated')
            }
        });
    }

    userAuthenticated(user) {
        console.log(user.uid)


        spaService.hideTabbar(false);
        // this.initAuthUserRef();
        adminService.init(); // Bliver først vist når det er authenticated
        spaService.showPage('admin');
        document.querySelector('.logout').style.display = 'block'; // remove aside
        loaderService.show(false);
    }

    userNotAuthenticated() {
        console.log('not authenticated')
        spaService.hideTabbar(true);
        spaService.navigateTo("login");

        // Firebase UI configuration
        const uiConfig = {
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: '#admin'
        };
        this.ui.start('#firebaseui-auth-container', uiConfig);
        loaderService.show(false);
    }

    // initAuthUserRef() {
    //     let authUser = firebase.auth().currentUser;
    //     this.authUserRef = firebaseService._db.collection("users").doc(authUser.uid);

    //     // init user data and favourite movies
    //     this.authUserRef.onSnapshot({
    //         includeMetadataChanges: true
    //     }, userData => {
    //         if (!userData.metadata.hasPendingWrites) {
    //             let user = {
    //                 ...authUser,
    //                 ...userData.data()
    //             }; //concating two objects: authUser object and userData objec from the db
    //             this.authUser = user;
    //             // this.appendAuthUser();
    //             // firebaseService.getPostRef();
    //             loaderService.show(false);
    //         }
    //     });
    // }

    logout() {
        // document.querySelector('#admin').style.display = 'none'; // remove aside
        // document.querySelector('#login').style.display = 'none'; // remove content
        document.querySelector('.logout').style.display = 'none'; // remove aside
        firebase.auth().signOut();
    }

    // appendAuthUser() {
    //     document.querySelector('#name').value = this.authUser.displayName || "";
    //     document.querySelector('#mail').value = this.authUser.email;
    //     document.querySelector('#birthdate').value = this.authUser.birthdate || "";
    //     document.querySelector('#hairColor').value = this.authUser.hairColor || "";
    //     document.querySelector('#imagePreview').src = this.authUser.img || "";
    //     document.querySelector('#phone').value = this.authUser.phone || "";
    // }

    // updateAuthUser(name, img, birthdate, hairColor, phone) {
    //     loaderService.show(true);

    //     let user = firebase.auth().currentUser;

    //     // update auth user
    //     user.updateProfile({
    //         displayName: name
    //     });

    //     // update database user
    //     this.authUserRef.set({
    //         img: img,
    //         birthdate: birthdate,
    //         hairColor: hairColor,
    //         phone: phone
    //     }, {
    //         merge: true
    //     }).then(() => {
    //         loaderService.show(false);
    //     });

    // }
}

const authService = new AuthService();
export default authService;