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
                cardLink.href = item.link

                linkWrapper.append(cardLink);
                cardItem.append(linkWrapper)
            }
            
               return cardItem;
    });


}