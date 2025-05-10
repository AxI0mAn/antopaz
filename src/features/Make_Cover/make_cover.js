// в соответствии со значением <input type="range" id="level"> закрываем поле количеством квадратов
// если время закончилось, то сделать cover прозрачным через function time_end_and_cover_opacity()

function make_cover(parts, board) {
  // количество закрывающих квадратов должно соответствовать <input type="range" id="level" max="14" 
  const arr = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400];
  const game_board = board;
  let sq_num = arr[parts];
  let gridSize = Math.sqrt(sq_num);
  let sizeTiles = 'auto';
  for (let i = 0; i < sq_num; i++) {
    let sq = document.createElement('div');
    sq.classList.add('sq_cover');
    sq.addEventListener('click', function func() {
      this.classList.add('open');
      this.removeEventListener('click', func);
    })
    game_board.appendChild(sq);
  }
  game_board.style.gridTemplateColumns = `repeat(${gridSize}, ${sizeTiles})`;
  game_board.style.gridTemplateRows = `repeat(${gridSize}, ${sizeTiles})`;
}


// если время закончилось, то сделать cover прозрачным
function time_end_and_cover_opacity() {
  let sq_last = document.querySelectorAll('.sq_cover');
  for (let sq of sq_last) {
    sq.classList.add('opacity0')
  }
}
export {
  make_cover, time_end_and_cover_opacity
}