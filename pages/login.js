export default class LoginPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="login" class="page">
        
          
      
        <!-- firebase auth container  -->
        <section id="firebaseui-auth-container"><h2>Login</h2></section>
      </section>
    `;
  }
}