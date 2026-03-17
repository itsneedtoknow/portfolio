import { createElement } from "../utils/dom.js";
import { LoadJSON } from "../utils/api.js"

export async function renderRequestForm(){
    let requestForm = createElement('form', 'form form--request');
    requestForm.name = "requestForm";
    //requestForm.setAttribute('novalidate', '');
    let inputData = await LoadJSON('./data/request-form.json');
    let departureData = await LoadJSON('./data/routes.json');
    let countriesData = await LoadJSON('./data/countries.json');
    let servicesData = await LoadJSON('./data/services.json');

    requestForm.innerHTML = `
    <div class="form-container f-column g-16">
    <h4>Запрос ставки</h4>
    <div class="form-wrapper f-column g-16">
    
    
    </div>
    <button type="submit" class="button button--primary">Отправить</button>
    </div>
    
    `
    let formWrapper = requestForm.querySelector('.form-wrapper');
    let departureBlock = createElement('div', 'form-block form--departure-block f-row g-16');
    let deliveryBlock = createElement('div', 'form-block form--delivery-block f-row g-16');
    for(let inputItem of inputData){
        let input = createElement(inputItem.tagName, '');
        
      if(inputItem.tagName =="select"){
        let defaultOption = new Option(inputItem.placeholder, '', true, false);
        input.appendChild(defaultOption);
       

        if(inputItem.name == "DEPARTMENT_COUNTRY" || inputItem.name == "DELIVERY_COUNTRY"){
             for(let countryOption of countriesData){
                let option = new Option( countryOption.title, countryOption.value, false, false);
                input.appendChild(option);
            }
        }
        if(inputItem.name == "DEPARTMENT_CITY" || inputItem.name == "DELIVERY_CITY"){
             for(let countryOption of countriesData){
                let city = countryOption.logistics_hubs;
                
                city.forEach(element => {
                    let option = new Option(element, element, false, false);
                    input.appendChild(option);
                });
            }
        }
        
        if(inputItem.name == "SERVICE"){

            for(let serviceOption of servicesData){
                let option = new Option(serviceOption.title, serviceOption.value, false, false);
                input.appendChild(option);
            }
        }
        
      }
        
        if(inputItem.placeholder){
        input.placeholder = inputItem.placeholder;
        }
        if(inputItem.tagName !=='select' && inputItem.title){
        input.value = inputItem.title;
        }
        if(inputItem.pattern){
        input.pattern = inputItem.pattern;
        }
        if(inputItem.type){
        input.type = inputItem.type;
        }
        if(inputItem.name){
        input.name = inputItem.name;
        }
        if(inputItem.required && inputItem.required == "true"){
            input.required = true;
        }
        if (inputItem.name.includes('DEPARTMENT')) {
    departureBlock.appendChild(input);
} else if (inputItem.name.includes('DELIVERY')) {
    deliveryBlock.appendChild(input);
} else {
    formWrapper.appendChild(input); // Остальные (например, SERVICE)
}
        formWrapper.prepend(deliveryBlock);
        // formWrapper.appendChild(input);
        formWrapper.prepend(departureBlock);

    }
    return requestForm

}