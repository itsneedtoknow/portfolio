import { renderPreviewCard } from "../components/single-item.js";
import { LoadJSON } from "../utils/api.js";
import { createElement } from "../utils/dom.js";

export async function renderAuto(JSON) {
    let autoContainer = createElement('ul', 'auto__list');
    let autoData = await LoadJSON("./data/auto.json");
    
    for(let item of autoData){
        let autoItem = await renderPreviewCard(item);
        autoContainer.append(autoItem)
    }
    return autoContainer
}