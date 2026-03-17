import { createElement } from "../utils/dom.js";

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
        }
        else if(!hasSubMenu){
           menuItem = ` <li>
                <a href="${item.link}">${item.name}</a>
            </li>`;
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

