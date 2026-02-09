/**
 * Универсальная функция для создания элементов
 * @param {string} tag - Тег (div, li, a...)
 * @param {string} className - Класс или строка с классами
 * @param {string} content - Текстовое содержимое или HTML
 * @returns {HTMLElement}
 */
export function createElement(tag, className, content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.innerHTML = content;
    return element;
}