import { createElement } from "../utils/dom.js"
export function renderSlider(jsonData){
   return jsonData.map(item=>{
       let slideItem = createElement('a', 'slider__slide-item');
       slideItem.href = item.link;

       let sliderImg = createElement('img', 'slide-item__img');
       sliderImg.src = item.img;
       sliderImg.alt = item.title;

       let sliderSlogan = createElement('div','slide-item__slogan', `<p>${item.title}</p>`);

       slideItem.append(sliderImg);
       slideItem.append(sliderSlogan);

       return slideItem
    })
}