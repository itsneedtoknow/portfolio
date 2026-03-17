/**
 * Обновляет список городов в зависимом селекте на основе выбранной страны
 * @param {string} countryValue - Код выбранной страны (PL, DE и т.д.)
 * @param {HTMLSelectElement} citySelect - Элемент селекта городов, который нужно обновить
 * @param {Array} data - Массив данных из JSON
 * @param {string} placeholder - Текст первой дефолтной опции
 */

export async function updateCities(countrySelect, citySelect, data, placeholder) {
    let countryValue = countrySelect.value;
    let cities;
    data.forEach((item)=>{
        if(countryValue.toLowerCase() == item.value.toLowerCase()){
            cities = item.logistics_hubs;
        }
    })
    citySelect.innerHTML = '';
    let defaultCityOption = new Option(placeholder, '', true, false);
    citySelect.appendChild(defaultCityOption);
    cities.forEach((city)=>{
    let cityOption = new Option(city, city, false, false);
    citySelect.appendChild(cityOption);
})

}