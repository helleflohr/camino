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
                <div class="mySlides fade">
                    <div class="merchendiceImage">
                    <img src="${post.acf.images}">
                    </div>
          
                    <a class="prev" onclick="plusSlides(-1, )">&#10094;</a>
                    <a class="next" onclick="plusSlides(1, )">&#10095;</a>
                </div>
                    <h2>${post.title.rendered}</h2>
                    <p class="price">${post.acf.price} kr.</p>
                    <p>${post.content.rendered}</p>
               
            </div>
      `;

        }






    }
}