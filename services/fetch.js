// ---------------  Maja ---------------

import mapInfoService from "./mapInfo.js"
import aboutPage from "./../pages/about.js"
import loaderService from "./loader.js"
class FetchService {
    constructor() {
        this.descriptions = [];
        this.startMarkers = [];
        this.pagesFromWP = [];
        this.aboutPost = [];
        this.merchendicePosts = [];
        this.infoPosts = [];
        this.frontpageText = [];
        this.fetchStartMarkers();
        // this.fetchAboutCFH();
    }

    //.......................... Fetch the descriptions from wordpress api .................................
    async fetchDescription() {
        // let response = await fetch("https://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=17")
        let response = await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=10&per_page=17")
        this.descriptions = await response.json();
    }

    // Get the descriptions
    async getDescriptions() {
        if (this.descriptions.length === 0) { // if the description array is empty ...
            await this.fetchDescription(); // fetch the descriptions
        }
        return this.descriptions // and return the descriptions
    }


    //.......................... Fetch the markers .................................
    async fetchMarkers() {
        loaderService.show(true) // show the loader
        // await fetch("https://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=500")

        await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=8&per_page=500")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                mapInfoService.mapAndMarkers(json);
            });
        loaderService.show(false) // turn off the loader
    }

    //.......................... Fetch which markers should be on map from start .................................
    async fetchStartMarkers() {
        // https://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=9
        await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=11")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.startMarkers = json[0].acf.onMapFromStart; // an arr with kategories

            });
    }

    //.......................... Fetch category About CFH from WP .................................
    async getAboutPost() {


        await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=13")
            .then(function (response) {

                return response.json();

            })
            .then((json) => {
                console.log(json);
                this.aboutPost = json;
                console.log(this.aboutPost);
            });
        loaderService.show(false) // turn off the loader

    }

    //.......................... Fetch category Merchendice from WP .................................
    async getMerchendicePosts() {


        await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=15")
            .then(function (response) {

                return response.json();

            })
            .then((json) => {
                this.merchendicePosts = json;
            });
        loaderService.show(false) // turn off the loader

    }

    //.......................... Fetch category Info from WP .................................
    async getInfoPosts() {


        await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=14")
            .then(function (response) {

                return response.json();

            })
            .then((json) => {
                this.infoPosts = json;
            });
        loaderService.show(false) // turn off the loader

    }

    //.......................... Fetch the frontpage text from wordpress api .................................
    async fetchFrontpageText() {
        let response = await fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=16")
        this.frontpageText = await response.json();
        console.log('fetcher', this.frontpageText)
        this.appendFrontpageInfo()
    }

    // Get the descriptions
    async getFrontpageText() {
        console.log(this.frontpageText.length)
        if (this.frontpageText.length === 0) { // if the description array is empty ...
            await this.fetchFrontpageText(); // fetch the descriptions
        }
        console.log('getter', this.frontpageText)
        return this.frontpageText // and return the descriptions

    }

    //.......................... APPEND FRONTPAGE INFO .................................
    appendFrontpageInfo() {


        document.querySelector('#frontpageTextDiv').innerHTML = /*html*/ ` 
    <h1>${this.frontpageText[0].acf.headline}</h1>
    <h2>${this.frontpageText[0].acf.catchphrase}</h2>
  `


        let fpSection = document.querySelector('#frontpageSection');
        let h2 = fpSection.querySelectorAll('div h2');
        let p = fpSection.querySelectorAll('div p');
        console.log(h2, p)


        for (let i = 0; i < h2.length; i++) {
            if (i === 0) {
                h2[i].innerHTML = /*html*/ `
              ${fetchService.frontpageText[0].acf.info1.title}
            `
                p[i].innerHTML = /*html*/ `
              ${fetchService.frontpageText[0].acf.info1.text}
            `
            } else if (i === 1) {
                h2[i].innerHTML = /*html*/ `
              ${fetchService.frontpageText[0].acf.info2.title}
            `
                p[i].innerHTML = /*html*/ `
              ${fetchService.frontpageText[0].acf.info2.text}
            `
            } else if (i === 2) {
                h2[i].innerHTML = /*html*/ `
              ${fetchService.frontpageText[0].acf.info3.title}
            `
                p[i].innerHTML = /*html*/ `
              ${fetchService.frontpageText[0].acf.info3.text}
            `
            }


        }
        loaderService.show(false) // turn off the loader
    }


}
const fetchService = new FetchService();
export default fetchService;