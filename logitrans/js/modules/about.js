import { LoadJSON } from "../utils/api.js";
import { renderPreviewCard } from "../utils/dom.js";
import { renderSlider } from "../components/slider.js";
import { createElement } from "../utils/dom.js";
import { renderBtn } from "../components/button.js";

export async function renderAbout(){
    const aboutWrapper = createElement('div', 'about__wrapper single-item f-row g-32');
    const sliderContainer = createElement('div', 'single-item__image slider');
    const aboutDescriptionWrapper = createElement('div', 'single-item__content content');

    // слайдер
    let sliderData = await LoadJSON('./data/slider.json');
        let slider = renderSlider(sliderData);
        
        if (sliderContainer) {
            sliderContainer.innerHTML = '';
            sliderContainer.append(...slider);
        }
   
        // описание компании
        let aboutInformation = await LoadJSON('./data/about.json');
        aboutDescriptionWrapper.innerHTML=`<div class="content__text">
                            <h2 class="about__title single-item__title">${aboutInformation.title}</h2>
                            <div class="content__description">
                                <p>${aboutInformation.description}</p>
                                    <!-- Контакты -->
                                    <ul class="contacts about__contacts">
                                        <li><a class="contacts__link contacts__link--address" href="https://yandex.by/maps/-/CDS4qKi-">${aboutInformation.address}</a></li>
                                        <li><a class="contacts__link contacts__link--phone" href="tel:${aboutInformation.phone.replace(/\D/g, '')}">${aboutInformation.phone}</a></li>
                                        <li><a class="contacts__link contacts__link--email" href="${aboutInformation.email}">${aboutInformation.email}</a></li>
                                    </ul>
                                    <div class="content__buttons buttons">
                                    
                                    </div>
                                   </div>
                            </div>
        `
        let calendarBtn = renderBtn({
            tagName: 'button',
            className: 'button button--primary button--open-modal',
            icon: '',
            text: 'Запрос ставки'
        })

        aboutDescriptionWrapper.querySelector('.content__buttons').append(calendarBtn);
        aboutWrapper.append(sliderContainer);
        aboutWrapper.append(aboutDescriptionWrapper)
        return aboutWrapper;
}