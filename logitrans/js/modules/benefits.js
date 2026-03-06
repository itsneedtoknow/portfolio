import { renderPreviewCard } from "../components/single-item.js";
import { createElement } from "../utils/dom.js";
import { LoadJSON } from "../utils/api.js";

export async function renderBenefits(){
    let benefitsContainer = createElement('ul', 'benefits column');

    let data = await LoadJSON('./data/benefits.json')

    for(let item of data){
        let benefitItem = await renderPreviewCard(item);
        benefitItem.classList.add('benefit-item')
        benefitsContainer.append(benefitItem);
         if (!isNaN(parseFloat(item.title)) && isFinite(item.title)) {
            benefitItem.classList.add('count');
        }
    }
return benefitsContainer;

}