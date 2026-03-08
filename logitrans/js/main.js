import { renderHeader } from "./components/header.js";
import { renderSlider } from "./components/slider.js"; 
import { LoadJSON } from "./utils/api.js";
import { renderAbout } from "./modules/about.js";
import { renderMainNews } from "./modules/news.js";
import { renderBenefits } from "./modules/benefits.js";
import { renderProducts } from "./modules/products.js";
import { renderAuto } from "./modules/auto.js";

async function init() {
    try {
        let menuItems = await LoadJSON('./data/menu.json');
        let header = renderHeader(menuItems);
        document.body.prepend(header);
        
        let aboutSectionContainer = document.querySelector('#about');
        let aboutSection = await renderAbout();
        aboutSectionContainer.append(aboutSection);

        let newsContainer = document.querySelector('.news-block');
        let newsSection = await renderMainNews();
        newsContainer.append(newsSection);

        // Инициализация слайдера (Slick)
        $('.about .slider').slick({
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1,
            speed: 5000,
            easing: 'ease',
            arrows: true,
        });

        // Наши преимущества
        let benefitsContainer = document.querySelector('.benefits-block');
        let benefits = await renderBenefits();
        benefitsContainer.append(benefits);

        // --- Intersection Observer (Анимация при скролле) ---
        //         let carsCount = document.querySelector('.benefit-item.accent .single-item__title')
        // let serviceCount = document.querySelector('.benefit-item.dark .single-item__title')
    setTimeout(() => {
        function count(el){
            let num = parseInt(el.innerHTML.replace(/\D/g, ''));
            let current = 0;
            const step = Math.ceil(num / 100)
            let timer = setInterval(()=>{
            
            current += step;
            if(current >= num){
            el.innerHTML = `${num}+`
            clearInterval(timer);
            }else {
                el.innerHTML = `${current}+`;
            }
            }, 20)
            
        }

        const options = {
            root: null,
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.1,
        };

        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                const rect = entry.boundingClientRect;

                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                   if (entry.target.classList.contains('count')) {
                entry.target.classList.remove('count');
                const title = entry.target.querySelector('.content__title');
                if (title) count(title);
            }
                }else{
                    if (rect.top > 0) {
                    entry.target.classList.remove('is-visible');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

       
        let animatedBenefits = document.querySelectorAll('.benefit-item');

        animatedBenefits.forEach((item) => {
            observer.observe(item);
        });

    }, 100);
  
    // PRODUCTS BANNERS
    let productsTitle = document.querySelector('.products-block h2');
    let products = await renderProducts();
    productsTitle.after(products)

    // AUTOPARK
    let autoparkContainer = document.querySelector('.auto-block');
    let auto = await renderAuto();
    autoparkContainer.append(auto)
    // Инициализация слайдера (Slick)
        $('.auto__list').slick({
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 2,
            autoplay: false,
            arrows: false,
            draggable: true,
            swipeToSlide: true
        });
        let autoItems = Array.from(document.querySelectorAll('.auto-block .single-item'));


       
    } catch (e) {
        console.error("Ошибка в init:", e);
    }
}

init();
