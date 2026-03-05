import { renderPreviewCard } from "../components/single-item.js";
import { LoadJSON } from "../utils/api.js";
import { createElement } from "../utils/dom.js";

export async function renderMainNews(){
    let newsContainer = createElement('div', 'news');
    let newsTitle = createElement('h2', '', 'Новости');
    let newsCardsContainer = createElement('ul', 'news__list');

    let newsData = await LoadJSON('./data/news.json');
    console.log(newsData);
    
    for(let item of newsData){
       let card = await renderPreviewCard(item);
       newsCardsContainer.append(card);
    }
    let buttonAllContainer = createElement('div', 'buttons');
    let buttonAllBtn = createElement('a', 'button button--secondary archive');
    buttonAllBtn.href = "novosti-all.html";
    buttonAllBtn.title = "Архив новостей";
    buttonAllBtn.innerHTML = "Архив новостей";
    buttonAllContainer.append(buttonAllBtn);


    newsContainer.append(newsTitle, newsCardsContainer, buttonAllContainer);
    return newsContainer;
}