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

  async appendMerchendice() {

    await fetchService.getMerchendicePosts();
    let posts = fetchService.merchendicePosts;
    document.querySelector("#merchendiceDiv").innerHTML = '';

    for (let post of posts) {
      if (post.id === 964) {} else {

        document.querySelector("#merchendiceDiv").innerHTML += `
                        <div class="card">
                        <img src="${post.acf.image}">
                        <h2>${post.title.rendered}</h2>
                        <h3 class="price">${post.acf.price} kr.</h3>
                        <p class="merchendiceText">${post.content.rendered}</p>
                     </div>`
      }

    };
    appendMerchendiceTopText()
  }

  async appendMerchendiceTopText() {

    let posts = fetchService.merchendicePosts;

    document.querySelector("#merchendiceText").innerHTML = '';

    for (let post of posts) {
      if (post.id === 964) {
        document.querySelector("#merchendiceText").innerHTML += `
      <h1>${post.title.rendered}</h1>
      <p>${post.content.rendered}</p>
      `
      }
    };

  }
  as





}