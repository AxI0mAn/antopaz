// если нажимают на кнопку подсказка, то выдаем подсказку для этой фоновой картинки - смотрим имя класса у #game_board (cover_now) и получаем текст из массива img_arr элемент с file = cover_now в поле tooltip

let prevTooltip;
// модалка с текстом и кнопкой для закрытия. Касание модалки = закрытие
function tooltip(tooltip, parent) {
  prevTooltip = tooltip;
  const btn_tooltip = document.querySelector('#tooltip');

  function func() {
    if (prevTooltip === tooltip) {
      show_tooltip(tooltip, parent, btn_tooltip, func);
      btn_tooltip.removeEventListener('click', func);
    }
    else {
      btn_tooltip.removeEventListener('click', func);
    }
  }
  if (btn_tooltip) {
    btn_tooltip.addEventListener('click', func)
  }
};

function show_tooltip(str, parent, btn_tooltip, func) {
  const blank = document.createElement('div');
  blank.classList.add('blank_tooltip');
  const message = document.createElement('p');
  message.textContent = str;
  const btn_close = document.createElement('button');
  btn_close.textContent = 'X';

  blank.append(message);
  blank.append(btn_close);
  parent.append(blank);
  blank.addEventListener('click', () => {
    blank.remove();
    btn_tooltip.addEventListener('click', func);
  })
}

export { tooltip }