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
            }
        });
    }

    userAuthenticated(user) {
        if (user.uid === 'A3qotTZ8O2SvkBro8MdN6fcMnn82' /*cfh@mail.dk*/ || user.uid === 'jXl7mEtqUrgGhkNxNaFoguKFqQp1' /*caminofrosherred@mail.dk*/ ) {
            // spaService.hideTabbar(false);
            adminService.init(); // Bliver først vist når det er authenticated
            spaService.showPage('admin');
            document.querySelector('.logout').style.display = 'block'; // remove aside
            loaderService.show(false);
            document.querySelector('#firebaseui-auth-container').style.display = 'none';
        }
    }

    userNotAuthenticated() {
        // spaService.hideTabbar(true);
        spaService.navigateTo("home");

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

    logout() {
        document.querySelector('.logout').style.display = 'none'; // remove aside
        if (document.querySelector('#admin') === false) {} else {
            document.querySelector('#admin').style.display = 'none';
        }

        firebase.auth().signOut();
        spaService.navigateTo("home");
        spaService.reloadPage()
    }
}

const authService = new AuthService();
export default authService;