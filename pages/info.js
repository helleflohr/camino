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

  async appendInfo() {

    await fetchService.getInfoPosts();
    let posts = fetchService.infoPosts;
    console.log(posts);
    document.querySelector("#infoDiv").innerHTML = '';

    for (let post of posts) {
        let date = `${post.date}`
        let sliceDate = date.substring(0, 10)
        document.querySelector("#infoDiv").innerHTML += `
                        <div class="infoCard">
                        <p>Oprettet den: ${sliceDate}</p>
                        <h2>${post.title.rendered}</h2>
                        <p class="infoText">${post.content.rendered}</p>
                     </div>`
    };

  }






}