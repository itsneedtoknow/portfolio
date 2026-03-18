/**
 * Универсальная функция для создания элементов
 * @param {string} tag - Тег (div, li, a...)
 * @param {string} className - Класс или строка с классами
 * @param {string} content - Текстовое содержимое или HTML
 * @returns {HTMLElement}
 */
export function createElement(tag, className, content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.innerHTML = content;
    return element;
}

export async function renderPreviewCard(JSON) {
   return JSON.map(item => {
        let cardItem = createElement('div', 'single-item');
// img
        if(item.img){
            let cardImgWrapper = createElement('div', 'single-item__image');
            let cardImg = createElement('img');
            let cardImgLink=createElement('a');

            cardImg.src = item.img;
            cardImg.alt = item.title || '';

            if(item.link){
                cardImgLink.href = item.link;
                cardImgLink.append(cardImg);
                cardImgWrapper.append(cardImgLink)
                
            }else{
            
            cardImgWrapper.append(cardImg);
            
            }
            cardItem.append(cardImgWrapper);
            

        }
// content
            if(item.title || item.intro || item.link){

            let cardContentWrapper = createElement('div', 'single-item__content content');
// title
            if(item.title){
                let cardTitle = createElement('h3', 'content__title');

                let cardTitleLink = createElement('a');
                cardTitleLink.href = item.link;
                cardTitleLink.textContent = item.title;

                let cardTitleDate = createElement('span');
                cardTitleDate.textContent = item.date;

                cardTitle.append(cardTitleLink, cardTitleDate);
                cardContentWrapper.append(cardTitle)
            }
// intro-text
            if(item.intro){
                let cardIntro = createElement('div', 'single-item__description');

                cardIntro.textContent = item.intro;

                cardContentWrapper.append(cardIntro)
            }
            cardItem.append(cardContentWrapper);
        }
        // link/btn
            if(item.link){
                let linkWrapper = createElement('div', 'content__buttons');
                let cardLink = createElement('a', 'read-more');
                cardLink.href = item.link;
                cardLink.setAttribute('aria-label', `Читать далее: ${item.title}`);

                linkWrapper.append(cardLink);
                cardItem.append(linkWrapper)
            }
            
               return cardItem;
    });


}
const $ = window.jQuery;
export function initSliders(){
   
        if ($('.auto__list').length){
        // AUTOPARK
        $('.auto__list').slick({
                    vertical: true,
                    verticalSwiping: true,
                    slidesToShow: 2,
                    autoplay: false,
                    arrows: false,
                    draggable: true,
                    swipeToSlide: true,
                    responsive:[
                        {
                            breakpoint: 992,
                            settings:{
                                vertical: false,
                                verticalSwiping: false,
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 640,
                            settings:{
                                vertical: false,
                                verticalSwiping: false,
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 500,
                            settings:{
                                vertical: false,
                                verticalSwiping: false,
                                slidesToShow: 1.5,
                            }
                        }
                    ]
                });
            }

        // SERVICES
       
        if($('.services .services__list').length){
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
    }
    // PRODUCTS
        
        if($('.products .banners__list').length){
    $('.banners__list').slick({
            infinite: true,
            slidesToShow: 2.5,
            autoplay: true,
            speed: 5000,
            easing: 'ease',
            arrows: false,
            responsive:[
                {
                breakpoint: 1350,
                settings:{
                        slidesToShow: 2,
                },
                 breakpoint: 640,
                settings:{
                        slidesToShow: 1,
                }
            }
        ]
        });
    }
    //    PARTNERS
     
        if($('.partners .partners__list').length){
            $('.partners .partners__list').slick({
            infinite: true,
            slidesToShow: 6,
            autoplay: true,
            slidesToScroll: 1,
            easing: 'ease',
            arrows: false,
            dots: true,
            responsive:[
            {
                breakpoint: 1340,
                settings:{
                slidesToShow: 5,
                }
            },
                {
                breakpoint: 1160,
                settings:{
                    slidesToShow: 4,
                }
            },
            {
            breakpoint: 870,
            settings:{
                slidesToShow: 3,
            }
            },
            {
            breakpoint: 640,
            settings:{
                slidesToShow: 1,
            }
            },
        ]
        });
        
        }
        if($('.about .slider').length){
$('.about .slider').slick({
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1,
            speed: 5000,
            easing: 'ease',
            arrows: true,
            responsive:[
                {
                breakpoint: 768,
                settings:{
                        swipeToSlide: true,
                        draggable: true,
                        autoplay: false,
                        speed: 2000
                }
            }
        ]
        });
        }
        
    }

    /**
 * Генерирует хлебные крошки на основе URL
 * @param {string} containerSelector - Куда вставить крошки
 * @param {Object} customLabels - Словарь для замены английских путей на русские названия
 */
export function renderBreadcrumbs(containerSelector, customLabels = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // массив путей из URL
    const pathArray = window.location.pathname.split('/').filter(path => path).slice(1);
    console.log(pathArray)
    
    const nav = document.createElement('nav');
    nav.className = 'breadcrumbs';
    nav.setAttribute('aria-label', 'Хлебные крошки');

    // cсылка на главную
    let breadcrumbsHTML = `<a href="/">Главная</a>`;
    let currentPath = '';

    pathArray.forEach((path, index) => {
        currentPath += `/${path}`;
        
        // название из словаря
        const cleanName = path.replace('.html', '');
        const label = customLabels[cleanName] || cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

        if (index === pathArray.length - 1) {
            
            breadcrumbsHTML += ` <span class="separator">></span> <span aria-current="page">${label}</span>`;
        } else {
           
            breadcrumbsHTML += ` <span class="separator">></span> <a href="${currentPath}.html">${label}</a>`;
        }
    });

    nav.innerHTML = breadcrumbsHTML;
    container.append(nav);
}