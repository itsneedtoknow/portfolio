import { renderHeader } from "./components/header.js";
import { renderSlider } from "./components/slider.js"; 
import { LoadJSON } from "./utils/api.js";




async function init() {
    try{
        let menuItems = await LoadJSON('./data/menu.json');
        renderHeader(menuItems);

        let sliderData = await LoadJSON('./data/slider.json');
        let slider = renderSlider(sliderData);
        const sliderContainer = document.querySelector('.about .slider');
        if (sliderContainer) {
            sliderContainer.innerHTML = '';
            sliderContainer.append(...slider);
        }
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
