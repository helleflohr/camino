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
}
const fetchService = new FetchService();
export default fetchService;