import { createElement } from "../utils/dom.js";

export const menuItems = [
    { name: 'Главная', link: 'index.html' },
    {
         name: 'О компании', 
         submenu: [
            { name: 'Наша история', link: 'history.html' },
            { name: 'Отделы', link: 'departments.html' },
            { name: 'Медиацентр', link: 'mediagallery.html' },
            { name: 'Наши новости', link: 'news.html' },
         ] },
    { name: 'Услуги', link: 'services.html' },
    { name: 'Виды перевозок',
        submenu: [
            {name: 'Сборные', link: 'transportation-detail.html'},
            {name: 'Автомобильные', link: 'transportation-detail.html'},
            {name: 'Контейнерные', link: 'transportation-detail.html'},
            {name: 'Авиаперевозки', link: 'transportation-detail.html'},
            {name: 'Морские', link: 'transportation-detail.html'},
            {name: 'Железнодорожные', link: 'transportation-detail.html'}
        ]
     },
     { name: 'Виды грузов',
        submenu: [
            {name: 'Крупногабаритные', link: 'products-detail.html'},
            {name: 'Промышленные', link: 'products-detail.html'},
            {name: 'Продукты', link: 'products-detail.html'},
            {name: 'Техника', link: 'products-detail.html'},
            {name: 'Товары народного потребления', link: 'products-detail.html'}
        ]
     }
];

export function initNavigation(menuItems){
let finalHTML = '';
let menuItem;

    menuItems.forEach((item, index) => {
        let hasSubMenu = item.submenu && item.submenu.length > 0;
        let submenuBody = '';

            if(hasSubMenu){
            submenuBody =
            `
            <div class="drop-down-menu">
                <ul> 
                ${item.submenu.map(item=>{
                    return `
                    <li>
                        <a href="${item.link}">
                            ${item.name}
                        </a>
                    </li> `
                }).join('')}
                </ul>
                </div>`
        };

        if(index === 0){
            menuItem = `<li class="icon-to-text">
            <a href="${item.link}">${item.name}</a>
            </li>`
        }else{
            menuItem = `<li class="${hasSubMenu ? 'drop-down' : ''}">
                <span>${item.name}</span>${hasSubMenu ? `
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                        <path d="M1.28571 5L9.28571 13L17.2857 5" stroke="#6E6E6E" stroke-width="2"/>
                    </svg>
                ` : ''}${submenuBody}
            </li >`;
        }
        finalHTML += menuItem;
    });
    return finalHTML;
}

