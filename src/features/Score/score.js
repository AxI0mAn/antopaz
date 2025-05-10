// обработка очков игрока
// если это не первое посещение, то с помощью score_start() получаем значение из localStorage  
// если выигрыш, то через score_add() - добавляем к счёту количество закрытых квадратов
// score_store - отнять очки за неправильный ответ или если закончилось время
// score_store(sq) - обработка и запись очков в localStorage 


const elem = document.querySelector('#score');


function score_now() {
  const store = localStorage.getItem('score');
  if (store) {
    return localStorage.getItem('score');
  }
}

function score_start() {
  if (elem) {
    const store = localStorage.getItem('score');
    if (store) {
      elem.textContent = `${store}`
    } else {
      localStorage.setItem('score', '0')
    };
  }
}

function score_add() {
  let sq = document.querySelectorAll('.sq_cover');
  let sq_open = document.querySelectorAll('.sq_cover.open');

  if (sq.length !== sq_open.length) {
    let count = sq.length - sq_open.length;
    score_store(count);
  }
}

function score_subtract(sub) {
  score_store(sub);
}

function score_store(sq) {
  const elem = document.querySelector('#score');
  if (elem) {
    let store = localStorage.getItem('score');
    let to_store = +store + sq;
    if (to_store < 0) { to_store = 0; }
    localStorage.setItem('score', `${to_store}`)
    elem.textContent = `${to_store}`
  }
}

export { score_now, score_start, score_add, score_subtract }