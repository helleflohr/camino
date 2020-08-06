import fetchService from "../services/fetch.js"
export default class MerchendicePage {
    constructor() {
        this.template();
    }

    template() {
        document.getElementById('content').innerHTML += /*html*/ `
        <section id="merchendice" class="page">
      
       
        </section>
      `;
    }

    async appendMerchendice() {

        await fetchService.getMerchendicePosts();
        let posts = fetchService.merchendicePosts;
        console.log(posts);
        document.querySelector("#merchendice").innerHTML = '';

        for (let post of posts) {




            document.querySelector("#merchendice").innerHTML += `
                        <div class="card">
                        <img src="${post.acf.image}">
                        <h2>${post.title.rendered}</h2>
                        <h3 class="price">${post.acf.price} kr.</h3>
                        <p class="merchendiceText">${post.content.rendered}</p>
                     </div>`

        };

    }






}