import { createElement } from "../utils/dom.js";
import { initNavigation } from "./navigation.js";

export function renderHeader(menuItems) {
    let header = createElement('header');
     header.innerHTML = `
        <div class="_container">
        <div class="row header__top">
                    <!-- Логотип -->
                    <div class="logo">
                        <a href="index.html">
                            <img src="./images/img/logo_horizontal.png" alt="main logo">
                        </a>
                    </div>
                    <div class="options">
                        <!-- Социальные сети -->
                        <div class="social">
                            <a href="#" class="telegram"></a>
                        </div>
                        <!-- Поиск -->
                        <div class="search">
                            <div class="btn-search"></div>
                            <form class="search-form" action="/search/">
                            <input type="text" name="q" placeholder="введите запрос">
                            <button type="submit">
                            </button>
                            </form>
                        </div>
                        <!-- Языковые версии -->
                        <div class="langs">
                            <a href="/">РУС</a>
                            <a href="/be/">БЕЛ</a>
                            <a href="/eng/">ENG</a>
                        </div>
                        <!-- Версия для слабовидящих -->
                        <div class="oko">
                            <a id="specialButton">
                            <img src="./images/icons/eye.svg" alt="oko" title="Версия для слабовидящих">
                            </a>
                        </div>
                    </div>
                    
                </div>
                <nav class="row navbar">
                    <div class="menu">
                        <div class="hamburger-menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H23C23.5523 7 24 6.55228 24 6C24 5.44772 23.5523 5 23 5H1ZM0 12C0 11.4477 0.447715 11 1 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H1C0.447715 13 0 12.5523 0 12ZM0 18C0 17.4477 0.447715 17 1 17H23C23.5523 17 24 17.4477 24 18C24 18.5523 23.5523 19 23 19H1C0.447715 19 0 18.5523 0 18Z" fill="#1B1B1B"/>
                                </svg>
                            </div>
                            <div class="mobile-home">
                                <div class="icon-to-text">
                                    <a href="index.html">Главная</a>
                                </div>
                            </div>
                            <div class="mobile-search">
                            </div>
                            <ul class="nav-menu">${initNavigation(menuItems)}</ul></div>
            </nav>
        </div>
    `;
    document.body.prepend(header);
}