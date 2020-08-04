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

  async appendWpPosts() {

    await fetchService.getAboutPost();
    let wpPost = fetchService.aboutPost[0];

    console.log("Jeg logger post" + wpPost);


    console.log("Generel side funktion")
    document.querySelector("#generelt").innerHTML = `
                    <h2>${wpPost.title.rendered}</h2>
                    <p>${wpPost.content.rendered}</p>`
  }
}