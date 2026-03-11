import { createElement } from "../utils/dom.js";

export async function renderFooter() {
    let footerWrapper = createElement('div', 'container-wrapper')
    footerWrapper.innerHTML=`
    
            <div class="top row">
                <div class="partners">
                    <div class="container-wrapper">
                        <div class="partners-wrapper"></div>
                    </div>
             </div>
            <div class="map">
                    <div id="myMap" style="height: 380px;"></div>
            </div>
        </div>
            <div class="bottom row">
                <div class="footer__block">
                    <p class="copyright">©ЛогиТранс, 2024</p>
                </div>
                <div class="footer__block socials">
                    <a href="#" class="telegram"></a>
                </div>
                <div class="footer__block buttons">
                    <a class="button button--secondary e-message" href="https://xn--80abnmycp7evc.xn--90ais/" >
                        Электронное обращение</a>
                </div>
            </div>
    `
    
    return footerWrapper
    
}