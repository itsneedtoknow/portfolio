import { renderPreviewCard } from "../components/single-item.js";
import { LoadJSON } from "../utils/api.js";
import { createElement } from "../utils/dom.js";

export async function renderServices(JSON) {
    
    let servicesContainer = createElement('ul', 'services__list');
    let serviceData = await LoadJSON('./data/services.json');

    for(let item of serviceData){
       let serviceItem = await renderPreviewCard(item);
        servicesContainer.append(serviceItem)
    }
    return servicesContainer
}