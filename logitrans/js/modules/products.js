import { renderPreviewCard } from "../components/single-item.js";
import { LoadJSON } from "../utils/api.js";
import { createElement } from "../utils/dom.js";

// export async function renderProducts(JSON) {
//     let productsWrapper = createElement('div', 'banners__wrapper');
//     let productsContainer = createElement('div', 'banners__list');

//     let productsData = await LoadJSON('./data/products.json');

//     for(let product of productsData){
//         let productItem = await renderPreviewCard(product);
//         let readMoreBtn = productItem.querySelector('.content__buttons')
//         if (readMoreBtn) {
//             readMoreBtn.remove(); 
//         }
//         productsContainer.append(productItem);
//         productsWrapper.append(productsContainer);
//     }
//     return productsWrapper
// }
export async function renderProducts(JSON) {
    let productsWrapper = createElement('div', 'banners__wrapper');
    let productsContainer = createElement('div', 'banners__list');

    let productsData = await LoadJSON('./data/products.json');

    // 1. Сначала создаем все элементы и сохраняем их в массив
    let items = [];
    for(let product of productsData){
        let productItem = await renderPreviewCard(product);
        let readMoreBtn = productItem.querySelector('.content__buttons');
        if (readMoreBtn) {
            readMoreBtn.remove(); 
        }
        items.push(productItem);
    }

    // 2. Функция для клонирования и добавления
    const addItems = (elements) => {
        elements.forEach(el => {
            productsContainer.append(el.cloneNode(true));
        });
    };

    // 3. Добавляем элементы дважды (оригиналы и копии)
    addItems(items);
    addItems(items);

    productsWrapper.append(productsContainer);
    return productsWrapper;
}
