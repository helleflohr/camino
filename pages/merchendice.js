import fetchService from "../services/fetch.js"
export default class MerchendicePage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
        <section id="merchendice" class="page">
      <section id="merchendiceText"></section>
        <section id="merchendiceDiv"></section>
       
        </section>
      `;
  }

 
}