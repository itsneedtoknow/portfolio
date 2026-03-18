import { createElement } from "./dom.js";
import { LoadJSON } from "./api.js";
import { renderPreviewCard } from "../components/single-item.js";

export async function createSection(arr){
    // for(let arrItem of arr){
        // let container = createElement(arrItem.tagname, arrItem.className);
        // let data = await LoadJSON(arrItem.dataURL);
        // let wrapper = document.querySelector(arrItem.wrapperClass);
  let container = createElement(arr.tagname, arr.className);
        let data = await LoadJSON(arr.dataURL);
        let wrapper = document.querySelector(arr.wrapperClass);
        let limit = wrapper.getAttribute('data-limit');
        let displayData = limit ? data.slice(0, parseInt(limit)) : data;
    for(let dataItem of displayData){
        let sectionElement = await renderPreviewCard(dataItem);
        container.append(sectionElement);
    }
    wrapper.append(container);
    // }
}