import fetchService from "../services/fetch.js"
export default class InfoPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
        <section id="info" class="page">
      <section id="infoDiv"></section>
       
        </section>
      `;
  }



}