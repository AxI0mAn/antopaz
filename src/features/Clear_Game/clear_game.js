// очистить поле до начала новой игры если нажата  <button id="start"> или правильный ответ
function clear_game() {
  const last_game = document.querySelector('#game_board')
  if (last_game) {
    last_game.remove();
  }
  const last_answers = document.querySelector('#answers')
  if (last_answers) last_answers.remove();
}

export { clear_game }