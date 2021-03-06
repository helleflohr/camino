import fetchService from "./../services/fetch.js"
import crudService from "./../services/crud.js"
import slideService from "./../services/slide.js"
import loaderService from "./../services/loader.js"
import aboutPage from "./about.js"
export default class HomePage {
  constructor() {
    this.template();
    this.fetchDescription();
  }

  template() {

    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page ">

          <!-- frontpage image and info bar -->
  <section id="frontpageImage" >
  <div id="frontpageLogoDiv">
    <img id="frontpageLogo" src="images/cfhLogo.png">
  </div>
  <div id="frontpageTextDiv">
    <!--<h1> Camino Frøs Herred</h1>
    <h2>Åbner sig for natur, kultur og fordybelse</h2>-->
  </div>
  <div  class="socialMedia">
    <a target="_blank" href="https://www.instagram.com/caminofroesherred/?hl=da"><img src="images/ikoner/instagram.svg"></a>
    <a target="_blank" href="https://www.facebook.com/groups/204253190209604/"><img src="images/ikoner/facebook.svg"></a>
    <a target="_blank" href="https://ec.europa.eu/info/food-farming-fisheries/key-policies/common-agricultural-policy/rural-development#ruraldevelopmentfundsandprogrammes"><img id="lag" src="images/LAG_logo_2.png"></a>
  </div>
  
  </section>



  <section id="frontpageSection" >
      <div>
     <img src="images/ikoner/generelt.svg" alt="Kompasnål ikon">
    
      <h2></h2>
      <p></p>
        
    </div>
    <img class="arrow generalArrow" src="images/ikoner/nyPilGenerelt.png" alt="pil">
    <img class="arrow mapArrow" src="images/ikoner/nyPilGenerelt.png" alt="pil">
    <div>
    <img onclick="scrollToElement('mapid')" src="images/ikoner/kort.svg" alt="Kort ikon">
   
      <h2 onclick="scrollToElement('mapid')"></h2>
      <p></p>
    </div>
    <img class="arrow descriptionArrow" src="images/ikoner/nyPilGenerelt.png">
    <div>
    <img  onclick="scrollToElement('stage1')" src="images/ikoner/rutebeskrivelser.svg" alt="Rute ikon">
 
      <h2 onclick="scrollToElement('stage1')"></h2>
      <p></p>
    </div>
  </section>

  
        
        
      </section>
      <div class="maparea">
        
          <div id="mapid" class="page"></div>
          <div id="grid-posts" class="grid-container page"></div>
      </div>
    `;
  }

  //.......................... FETCH WORDPRESS .................................
  //Johanne
  fetchDescription() {

    fetch("https://www.xn--caminofrsherred-dub.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=10&per_page=17")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.descriptions = json;
        this.appendPosts(json)

        //Evaluates the expression after 200 milliseconds.
        setTimeout(() => {
          //fjerner spinner efter load. 
          // When fetch is done show() is false and adds hide on #loader
          // loaderService.show(false);
        }, 200);

      });


  }



  //.......................... APPEND POSTS .................................
  //Johanne 
  appendPosts(posts) {

    //sort the posts by acf stagenumber in ascending order
    posts.sort(function (x, y) {
      return x.acf.stageNumber - y.acf.stageNumber;
    });

    for (let post of posts) {

      document.querySelector("#grid-posts").innerHTML += `
    
    <article id="stage${post.acf.stageNumber}" class="grid-item" onmouseover="goTo(${post.acf.stageNumber})" onmouseout="goFrom(${post.acf.stageNumber})">

    <!--------- Etapeimages on the map ------->
      <section class="backgroundimg" style="background-image: url('${this.getFeaturedImageUrl(post)}')" onclick="chosen(${post.acf.stageNumber})" >
        <div id="text-backgroundimg">
          <div class="title-distance">
      
            <h3>${post.title.rendered}</h3>
            <h4> (${post.acf.distance} km)</h4>
           
        
          </div>
          <div class="start-end">
            <h5>${post.acf.startpoint}</h5> 
            -
            <h5>${post.acf.endpoint}</h5>
          </div>
        </div>
      </section>

      <!--------- dropdown with description, images and comments ------->
      <section class="dropdown">
        <ul id="tabs-swipe-demo" class="tabs">
          <li class="tabNav descriptionTab" onclick="tabs('description', ${post.acf.stageNumber})">Beskrivelse</li>
          <li class="tabNav imagesTab" onclick="tabs('images', ${post.acf.stageNumber}); bigImg(${post.acf.stageNumber})">Billeder</li>
          <li class="tabNav commentsTab" onclick="tabs('comments', ${post.acf.stageNumber}); appendPosts(${post.acf.stageNumber}); showSlides(${slideService.slideIndex}, ${post.acf.stageNumber})">Hvad siger andre?</li>
        </ul>
        <hr id="hr${post.acf.stageNumber}" />

        <!--------- description content ------->
        <div id="description${post.acf.stageNumber}">
          <div class="flexcontainer">
            <p class="zoom zoomMap" onclick="zoomToStage(${post.acf.stageNumber})">Zoom til etape</p>
            <p class="zoom zoomMap" onclick="zoomOut()">Zoom ud til hele ruten</p>
          </div>
          <div class="descriptionDiv">
         </div>
          <a class="gpx" href="geojson/Camino-Fros-Herred-${post.acf.stageNumber}.gpx" download>Download GPX-fil (${post.acf.stageNumber})</a>
        </div>

        <!--------- images content ------->
        <div class="none" id="images${post.acf.stageNumber}"><div class="tabImages"></div></div>
  
        <!--------- comments content ------->
        <div class="none" id="comments${post.acf.stageNumber}">
          <article class="slideshow-container">
            <section>
              <section id="content${post.acf.stageNumber}"></section>
            </section>
            <a class="prev" onclick="plusSlides(-1, ${post.acf.stageNumber})">&#10094;</a>
            <a class="next" onclick="plusSlides(1, ${post.acf.stageNumber})">&#10095;</a>
          </article>

          <div>
          <p id="btnSay" class="zoom" onclick="modalOpen(${post.acf.stageNumber})">Hvad siger du?</p>
          </div>

        
        </div>
        
      </section>
    </article> `

      document.querySelector("#modalContent").innerHTML += `
    <section id="commentsModal${post.acf.stageNumber}" class="modal">
        <div class="modal-content">
        <span class="close" onclick="modalClose(this)">&times;</span>
        
        <form class="postForm stage-${post.acf.stageNumber}" name="postForm">
        <h2 class="h2-etape" title="${post.acf.stageNumber}">Opret et opslag for etape: ${post.acf.stageNumber}</h2>
        <input type="text" class="formName" name="fname" placeholder="Dit navn" required>
        <textarea rows="10" cols="50" name="comment" form="usrform" class="formText" onkeyup="textCountDown(this, ${post.acf.stageNumber})" placeholder="Skriv din beretning" minlenght="1" maxlength="150" required></textarea>
        <p value="0" class="demo-text"> Antal tegn: 0/150 </p>
        <input type="file" class="none imgChoose " accept="image/*" onchange="previewImage(this.files[0], ${post.acf.stageNumber})"> <!-- skjult via styling -->
        <button class="secondary" type="button" name="button" onclick="triggerChooseImg(${post.acf.stageNumber})">Vælg dit billede</button>
        <div class="div-image-preview">
        <img src="" class="image-preview imagePreview">
      </div>
        <p class="btnCreate" onclick="createPost(${post.acf.stageNumber})">Opret opslag*</p>
        <input type="checkbox" id="agrement${post.acf.stageNumber}" name="agrement${post.acf.stageNumber}" value="agreed">
        <label class="small" for="agrement${post.acf.stageNumber}">*Ved oprettelse af opslag accepterer du samtidig at dit navn, samt det indhold du har indført, kan blive vist på vores hjemmeside.</label><br>
       
      </form>
      </div>
          </section>`
    }


  };


  //Johanne
  // gets the featured image url
  getFeaturedImageUrl(post) {
    let imageUrl = "";
    if (post._embedded['wp:featuredmedia']) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    return imageUrl;
  }

}