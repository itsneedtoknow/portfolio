import { renderHeader } from "./components/header.js";
import { renderSlider } from "./components/slider.js"; 
import { LoadJSON } from "./utils/api.js";
import { renderAbout } from "./modules/about.js";




async function init() {
    try{
        let aboutSectionContainer = document.querySelector('#about');
        let aboutSection = await renderAbout();
        aboutSectionContainer.append(aboutSection);

        let menuItems = await LoadJSON('./data/menu.json');
        renderHeader(menuItems);
        
        $('.about .slider').slick({
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1,
            speed: 5000,
            easing: 'ease',
            arrows: true,
        });
        }catch(e){
            console.log(e)
        }
}
init();
