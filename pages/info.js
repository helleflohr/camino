import fetchService from "../services/fetch.js"
export default class InfoPage {
    constructor() {
        this.template();
    }

    template() {
        document.getElementById('content').innerHTML += /*html*/ `
        <section id="info" class="page">
      
       
        </section>
      `;
    }

    async appendInfo() {

        await fetchService.getInfoPosts();
        let posts = fetchService.infoPosts;
        console.log(posts);
        document.querySelector("#info").innerHTML = '';

        for (let post of posts) {




            document.querySelector("#info").innerHTML += `
                        <div class="infoCard">
                        <h2>${post.title.rendered}</h2>
                        <p class="infoText">${post.content.rendered}</p>
                     </div>`

        };

    }






}