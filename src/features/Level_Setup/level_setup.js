// смотрим за ползунком <input type="range" id="level"> 
// возвращаем значение ползунка


function level_setup() {
  const range = document.querySelector('#level');
  if (range) {
    let level = +range.value; // Получаем начальное значение

    range.addEventListener('change', function func() {
      level = +range.value;
      localStorage.setItem('level', `${level}`);
    });

    return level; // Возвращаем начальное значение
  }
}

export { level_setup } 