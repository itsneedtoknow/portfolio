import { renderHeader } from "./components/header.js";
import { renderSlider } from "./components/slider.js"; 
import { LoadJSON } from "./utils/api.js";
import { removeBtn } from "./utils/removebtn.js";
import { createElement } from "./utils/dom.js";
import { renderPreviewCard } from "./components/single-item.js";
import { createSection } from "./utils/section.js";
import { renderFooter } from "./components/footer.js";
import { initSliders } from "./utils/dom.js";
import { renderRequestForm } from "./components/request-form.js";
import { updateCities } from "./utils/requestFormHandler.js";
import { openMobMenu } from "./utils/mobile-nav.js";
import { closeMobMenu } from "./utils/mobile-nav.js";
import { openMobSubMenu } from "./utils/mobile-nav.js";
import { renderBreadcrumbs } from "./utils/dom.js";

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

            const allItemsForRemoveBtn = document.querySelectorAll(
                '.banners__list .single-item, .routes__list .single-item, .partners__list .single-item, .about__list .single-item'
            );
            removeBtn(allItemsForRemoveBtn);

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

        }
        renderSections()
        
        let menuItems = await LoadJSON('./data/menu.json');
        let header = renderHeader(menuItems);
        document.body.prepend(header);
        

        let mobileMenuBtn = document.querySelector('.hamburger-menu');
        

        mobileMenuBtn.addEventListener('click', openMobMenu);
        let navMenuBtns = Array.from(document.querySelectorAll('.nav-menu svg'));
        
        if(window.innerWidth < 992){
            navMenuBtns.forEach((btn)=>{
                btn.addEventListener('click', openMobSubMenu)
            })
        }
       
        document.addEventListener('click', closeMobMenu);
    } catch (e) {
        console.error("Ошибка в init:", e);
    }
}

init();


let form = await renderRequestForm();
if(document.querySelector('#requestPrice')){
document.querySelector('#requestPrice').append(form)
}

let reqform = document.forms.requestForm;

let countriesData = await LoadJSON('./data/countries.json');
if (reqform) {
    let departureCountryInput = reqform.elements.DEPARTMENT_COUNTRY;
    let departureCityInput = reqform.elements.DEPARTMENT_CITY;
    let deliveryCountryInput = reqform.elements.DELIVERY_COUNTRY;
    let deliveryCityInput = reqform.elements.DELIVERY_CITY;

    departureCountryInput.addEventListener('change', () =>{updateCities(departureCountryInput, departureCityInput, countriesData, 'Выберите город загрузки')})
    deliveryCountryInput.addEventListener('change', () =>{updateCities(deliveryCountryInput, deliveryCityInput, countriesData, 'Выберите город разгрузки')})
reqform.addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(form);
    const dataInfo = Object.fromEntries(data.entries());
    console.log(dataInfo)
    let formBtn = reqform.querySelector(".button--primary");
    let reqModal = reqform.closest('.modal');
    let successMsg = createElement('div');
    successMsg.innerHTML = `<div>
<h3>Благодарим за Ваше обращение!</h3>
<p>Наш менеджер свяжется с Вами в ближайшее время!</p></div>`
    console.log(reqModal)
    formBtn.disabled = "true";
    formBtn.textContent = 'Отправка...';

    setTimeout(() => {
        form.reset();
        reqform.style.display = 'none';
        reqModal.classList.add('success');
        reqModal.prepend(successMsg)
        formBtn.disabled = false;
        formBtn.textContent = 'Отправить';
        
    }, 2000)
    reqModal.querySelector('.close-modal').addEventListener('click',function(){
         reqModal.classList.remove('success');
         successMsg.remove();
         setTimeout(() => {
         reqform.style.display = 'block';
         }, 500)
    })
})
}

// Словарь соответствий URL -> Заголовок
const pageNames = {
    'news-all': 'Новости',
    'news-details': 'Новость',
    'product-details': 'Виды грузов',
    'transportation-details': 'Перевозки',
    'department-details': 'Подразделение',
    'services-all': 'Услуги',
    'about': 'О компании',
    'contacts': 'Контакты'
};

// Вставляем, например, в контейнер .hero или специальный div
renderBreadcrumbs('.breadcrumbs-menu', pageNames);
