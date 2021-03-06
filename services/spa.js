import mapInfoService from "./mapInfo.js";
import mapService from "./map.js";
import scrollService from "./nav.js"
import loaderService from "./loader.js"
import fetchService from "./fetch.js"
import stageCircles from "./../components/stageCircles.js"
import authService from "./authService.js"
import {
  map
} from "./../main.js";
import addSubpages from "./addSubpages.js";

class SpaService {
  constructor() {
    this.defaultPage = "home";
    this.counter = 0;
    this.navCounter = 0;
    this.visitedPages = [];
  }

  init() {
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".tabbar a");
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    this.pageChange();
  }

  // hide all pages
  hideAllPages() {
    for (let page of this.pages) {
      page.style.display = "none";
    }
  }

  // show page or tab
  showPage(pageId) {
    // if (pageId === 'admin' || pageId === 'login') {
    // this.hideAllPages();
    // let page = document.querySelector(`#${pageId}`);
    // if (page != undefined)
    //   page.style.display = "block";
    // } else {
    // if (window.innerWidth <= 1024) {
    // this.hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    // this.setActiveTab(pageId);
    // }
    // }
  }

  // sets active tabbar/ menu item
  setActiveTab(pageId) {
    console.log(pageId)
    for (let navItem of this.navItems) {
      if (`#${pageId}` === navItem.getAttribute("href")) {
        navItem.classList.add("active");
      } else {
        navItem.classList.remove("active");
      }
    }
  }

  // navigate to a new view/page by changing href
  navigateTo(pageId) {
    window.location.href = `#${pageId}`;
  }

  // set default page or given page by the hash url
  // function is called 'onhashchange'
  // ---------------  Maja ---------------
  pageChange() {
    // let navigationEtape = document.querySelector('.navigationEtape');
    let tabbar = document.querySelector('.tabbar'); // mobilmenu
    let aside = document.querySelector('aside'); // aside
    let navbar = document.querySelector('#navbar'); // topmenu
    let maparea = document.querySelector('.maparea'); //maparea 
    let content = document.querySelector('#content');

    aside.style.display = 'block';
    tabbar.style.display = 'block';
    navbar.style.display = 'block';
    content.style.width = '100vw';
    maparea.style.display = 'block';



    // let maparea = document.querySelector('.maparea');

    let page = this.defaultPage // = 
    console.log("pppppaage", page);
    if (window.location.hash) {
      page = window.location.hash.slice(1);
      console.log("PAGE!!!", page);
    }
    loaderService.show(true) // turn off the loader
    this.hideAllPages();
    this.showPage(page);


    if (page === 'admin' || page === 'login') {

      // navigationEtape.style.display = 'none'; // remove aside
      // maparea.style.display = 'none'; // remove content
      aside.style.display = 'none'; // remove aside
      tabbar.style.display = 'none'; // remove aside
      maparea.style.display = 'none';

      this.showPage(page);
      loaderService.show(false) // turn off the loader
    } else {
      document.querySelector('.logout').style.display = 'none'; // remove aside
      // document.querySelector('#login').style.display = 'none'; // remove aside
    }


    // Only show loader the first time on each page
    if (this.visitedPages.indexOf(page) === -1) {
      loaderService.show(true)
    }
    this.visitedPages.push(page)



    // if (window.innerWidth > 1024) { // if desktop navigate to frontpage
    if (page === 'about' || page === 'merchendice' || page === 'info') {
      aside.style.display = "none"
      maparea.style.display = "none"

      if(page == 'info'){
      addSubpages.appendInfo();
      } else if(page == 'merchendice'){
        addSubpages.appendMerchendice();
        addSubpages.appendMerchendiceTopText();
      }else if(page = 'about'){
        addSubpages.appendWpPosts();
      }
    }


    if (window.innerWidth <= 1024) {

      if (page === 'grid-posts') {
        navbar.style.display = 'none';

        scrollService.scrollToStage(scrollService.chosenNumber); // scroll to the chosen number
        if (this.visitedPages[0] !== page) {
          scrollService.createFirstTabUnderline(scrollService.chosenNumber) // Create a underline, if this page wasn´t loaded first
        }

        if (this.navCounter === 0) { // create markers the first time, the map is visited
          stageCircles.template();
          this.navCounter++
        }

      } else if (page === 'home') {
        aside.style.display = 'none'; // remove aside
        maparea.style.display = 'none';



      } else if (page === 'mapid') {
        navbar.style.display = 'none';
        content.style.width = '100vw';
        if (this.visitedPages[0] !== page) { // if map wasn´t the first page
          map._onResize(); // run the map
        }

        if (this.counter === 0) { // create markers the first time, the map is visited
          fetchService.fetchMarkers()
          stageCircles.template();
          this.counter++
        }
      }

    } else if (window.innerWidth > 1024) {
      tabbar.style.display = 'none';
      console.log('stor')
      if (page === 'home' || page === 'grid-posts' || page === 'mapid') {
        this.showPage('home');
        this.showPage('grid-posts');
        this.showPage('mapid');
        content.style.width = '90vw';
      }

    }

    this.showPage(page);
    loaderService.show(false) // turn off the loader

  }

  reloadPage() {
    window.location.reload();
  }
}
const spaService = new SpaService();
export default spaService;