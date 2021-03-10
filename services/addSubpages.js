import fetchService from "./fetch.js"
class AddSubpages {
    constructor() {
     
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
    
        console.log("I am appending Info now throug subpages");
    
      }
      async appendMerchendice() {

        await fetchService.getMerchendicePosts();
        let posts = fetchService.merchendicePosts;
        document.querySelector("#merchendiceDiv").innerHTML = '';
    
        for (let post of posts) {
          if (post.id === 964) {} else {
    
            document.querySelector("#merchendiceDiv").innerHTML += `
                            <div class="card">
                            ${post.acf.image}
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

      async appendWpPosts() {

        await fetchService.getAboutPost();
        let wpPost = fetchService.aboutPost[0];
    
    
        console.log("Generel side funktion")
        document.querySelector("#generelt").innerHTML = `
                        <h2>${wpPost.title.rendered}</h2>
                        <p>${wpPost.content.rendered}</p>`
      }
    
}
const addSubpages = new AddSubpages();
export default addSubpages;