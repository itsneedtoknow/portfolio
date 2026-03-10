import { createElement } from "../utils/dom.js";

export async function renderPreviewCard(item) {
//    return JSON.map(item => {
        let cardItem = createElement('div', 'single-item');
// img
        if(item.img){
            let cardImgWrapper = createElement('div', 'single-item__image');
            let cardImg = createElement('img', '');
            let cardImgLink=createElement('a');

            cardImg.src = item.img;
            cardImg.alt = item.title;

            if(item.link){
                cardImgLink.href = item.link;
                cardImgLink.append(cardImg);
                cardImgWrapper.append(cardImgLink)
                
            }else{
            
            cardImgWrapper.append(cardImg);
            
            }
            // cardImgWrapper.append(cardImg);
            cardItem.append(cardImgWrapper);

        }
// content
            if(item.title || item.intro || item.link){

            let cardContentWrapper = createElement('div', 'single-item__content content');
// title
            if(item.title){
                let cardTitle = createElement('h3', 'content__title');

                let cardTitleLink;
                let cardTitleDate

                if(item.link){
                cardTitleLink = createElement('a');
                cardTitleLink.href = item.link;
                cardTitleLink.textContent = item.title;
                cardTitle.append(cardTitleLink)
                }else{
                    cardTitle.textContent = item.title;
                }

                if(item.date){
                cardTitleDate = createElement('span', 'date');
                cardTitleDate.textContent = item.date;
                cardTitle.append(cardTitleDate);
                }
                cardContentWrapper.append(cardTitle)
            }
// intro-text
            if(item.intro){
                let cardIntro = createElement('div', 'content__description');

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
    // });


}