import { createElement } from "../utils/dom.js";

export function renderBtn(
    { 
    tagName = 'a', 
    className = '', 
    href = '', 
    title = '', 
    text = '', 
    icon = '', 
    dataModal = '' 
}
){
    let btn = document.createElement(tagName.toLowerCase());

     const classes = Array.isArray(className) 
        ? className 
        : className.trim().split(/\s+/).filter(Boolean);

        if (classes.length > 0) {
        btn.classList.add(...classes);
    }
    if(btn.tagName === 'A' && href){
        btn.href = href;
    }
    if (dataModal){
        btn.dataset.modal = dataModal;
    } 
    if(icon || text){
        btn.innerHTML=`<img src=${icon}>${text}`
    }
    return btn;
}