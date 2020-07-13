import mapService from "../services/map.js"
import fetchService from "../services/fetch.js"
class StageCircles {
    constructor() {
        this.descriptions;

    }

    async template() {

        this.descriptions = await fetchService.getDescriptions();
        let numberOfStages = this.descriptions.length // Get save the number of stages
        console.log(this.descriptions.length)

        let circles = "";
        for (let i = 1; i < (numberOfStages + 1); i++) { // for each stage...

            circles += /*html*/ `
            <div>
            <input type="button" class="navbtn btn" value="${i}" onmouseover="goTo(this.value)" onmouseout="goFrom(this.value)"
            onclick="chosen(this.value); scrollToStage(this.value)">
          <span></span>
          <span></span>
          <span></span>
          </div>
            `

        }
        let theCircleDiv = document.querySelector('.navigationEtape div');

        theCircleDiv.style.height = `75%`

        theCircleDiv.innerHTML = circles;

        let height = 90 / numberOfStages
        console.log(height, numberOfStages)
        let eachCircle = theCircleDiv.querySelectorAll('div');
        for (const circle of eachCircle) {
            circle.style.height = `${height}%`;
            // circle.style.padding = '5% 0 0';

            circle.querySelector('.navbtn').style.height = '80%';
            let circleHeight = circle.querySelector('.navbtn').clientHeight;
            circle.querySelector('.navbtn').style.width = `${circleHeight}px`;
            circle.querySelector('span').style.marginTop = '5%'
            let spans = circle.querySelectorAll('span')
            for (const span of spans) {
                span.style.height = '4%';
                span.style.width = '2%';
                span.style.margin = '.5% auto'
            }


        }

        //Remove the spans after the last circle
        let numberOfSpans = theCircleDiv.querySelectorAll('span').length
        for (let i = 1; i < numberOfSpans + 1; i++) {
            if (i === numberOfSpans || i === numberOfSpans - 1 || i === numberOfSpans - 2) {
                theCircleDiv.querySelectorAll('span')[i - 1].style.display = 'none'
            }
        }
    }

}
const stageCircles = new StageCircles();
export default stageCircles;