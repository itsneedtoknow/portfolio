import { renderHeader } from "./components/header.js";
import { renderSlider } from "./components/slider.js"; 
import { LoadJSON } from "./utils/api.js";
import { removeBtn } from "./utils/removebtn.js";
import { renderAbout } from "./modules/about.js";
import { renderMainNews } from "./modules/news.js";
import { createElement } from "./utils/dom.js";
import { renderPreviewCard } from "./components/single-item.js";
import { createSection } from "./utils/section.js";
import { renderFooter } from "./components/footer.js";
import { initSliders } from "./utils/dom.js";

let sections = [
    {
        "tagname": "ul",
        "className": "slider",
        "dataURL": "./data/slider.json",
        "wrapperClass": ".about__list"
    },
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
    {
        "tagname": "ul",
        "className": "partners__list",
        "dataURL": "./data/partners.json",
        "wrapperClass": ".partners-wrapper"
    },
]

async function init() {
    try {
        let footer = document.querySelector('footer');
            let footerContent = await renderFooter();
            footer.append(footerContent);
            
        const renderSections = async ()=>{
           const promises = sections
            .filter(item => document.querySelector(item.wrapperClass))
            .map(item => createSection(item))

            await Promise.all(promises);

            initSliders();

            

            let allProducts = document.querySelectorAll('.banners__list .single-item');
            let allRoutes = document.querySelectorAll('.routes__list .single-item');
            let allPartners = document.querySelectorAll('.partners__list .single-item');
            let allSliders = document.querySelectorAll('.about__list .single-item');
            if(allProducts || allRoutes || allPartners||allSliders){
                removeBtn(allProducts);
                removeBtn(allRoutes);
                removeBtn(allPartners);
                removeBtn(allSliders);
            }
        }
        renderSections()
        
        let menuItems = await LoadJSON('./data/menu.json');
        let header = renderHeader(menuItems);
        document.body.prepend(header);
       
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

         

    }, 1000);
  

    
    } catch (e) {
        console.error("Ошибка в init:", e);
    }
}

init();
