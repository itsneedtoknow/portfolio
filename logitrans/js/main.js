import { renderHeader } from "./components/header.js";
import { renderSlider } from "./components/slider.js"; 
import { LoadJSON } from "./utils/api.js";
import { removeBtn } from "./utils/removebtn.js";
import { renderAbout } from "./modules/about.js";
import { renderMainNews } from "./modules/news.js";
import { createElement } from "./utils/dom.js";
import { renderPreviewCard } from "./components/single-item.js";
import { createSection } from "./utils/section.js";

let sections = [
    {
        "tagname": "ul",
        "className": "news__list",
        "dataURL": "./data/news.json",
        "wrapperClass": ".news-wrapper"
    },
    {
        "tagname": "ul",
        "className": "benefits__list column",
        "dataURL": "./data/benefits.json",
        "wrapperClass": ".benefits-wrapper"
    },
    {
        "tagname": "ul",
        "className": "banners__list",
        "dataURL": "./data/products.json",
        "wrapperClass": ".banners-wrapper"
    },
    {
        "tagname": "ul",
        "className": "auto__list",
        "dataURL": "./data/auto.json",
        "wrapperClass": ".auto-wrapper"
    },
    {
        "tagname": "ul",
        "className": "services__list",
        "dataURL": "./data/services.json",
        "wrapperClass": ".services-wrapper"
    },
    {
        "tagname": "ul",
        "className": "routes__list f-row",
        "dataURL": "./data/routes.json",
        "wrapperClass": ".routes-wrapper"
    },
    {
        "tagname": "ul",
        "className": "departments__list",
        "dataURL": "./data/departments.json",
        "wrapperClass": ".departments-wrapper"
    },
]

async function init() {
    try {
        createSection(sections);
        let menuItems = await LoadJSON('./data/menu.json');
        let header = renderHeader(menuItems);
        document.body.prepend(header);
        
        let aboutSectionContainer = document.querySelector('#about');
        let aboutSection = await renderAbout();
        aboutSectionContainer.append(aboutSection);


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
        
        setTimeout(() => {
            let benefits = Array.from(document.querySelectorAll('.benefits .single-item')) ;
            benefits.forEach(item=>{
                
                if(!isNaN(parseFloat(item.querySelector('.content__title').innerHTML)) && isFinite(item.querySelector('.content__title').innerHTML)){
                    item.classList.add('count')
                }
            })

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
        let animatedBenefits = document.querySelectorAll('.benefits .single-item');

        animatedBenefits.forEach((item) => {
            observer.observe(item);
        });

         let allProducts = document.querySelectorAll('.banners__list .single-item');
         let allRoutes = document.querySelectorAll('.routes__list .single-item');
            removeBtn(allProducts);
            removeBtn(allRoutes);
    }, 1000);
  
    

    
    // Инициализация слайдера (Slick)
    setTimeout(()=>{
        // AUTOPARK
        $('.auto__list').slick({
                    vertical: true,
                    verticalSwiping: true,
                    slidesToShow: 2,
                    autoplay: false,
                    arrows: false,
                    draggable: true,
                    swipeToSlide: true
                });

        // SERVICES
         $('.services .services__list').slick({
            infinite: true,
            slidesToShow: 3,
            autoplay: true,
            slidesToScroll: 1,
            easing: 'ease',
            arrows: true,
            responsive:[
                {
                    breakpoint: 992,
                    settings:{
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    }
                },
                {
                breakpoint: 620,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });

       
    }, 1000)
    } catch (e) {
        console.error("Ошибка в init:", e);
    }
}

init();
