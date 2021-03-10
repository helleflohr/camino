import fetchService from "../services/fetch.js"
export default class AboutPage {
  constructor() {
    this.template();
  }

  template() {
    console.log("Start generelt side")
    document.getElementById('content').innerHTML += /*html*/ `
        <section id="about" class="page">
        <section id="generelt"></section>
       
        </section>
      `;
  }


}