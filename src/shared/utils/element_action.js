// Очистка содержимого контейнера перед добавлением нового (альтернатива innerHTML = '')
function clear_container(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// Функция для создания элементов DOM из Объекта со свойствами
function createElement(tag, props, ...children) {
  const element = document.createElement(tag);
  for (const key in props) {
    if (key === 'class') {
      element.classList.add(`${props[key]}`)
    } else {
      element[key] = props[key];
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      element.textContent = child;
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

// Экспортируем функции по их именам в конце файла
export {
  clear_container,
  createElement
};