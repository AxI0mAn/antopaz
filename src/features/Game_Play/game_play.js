// основная логика игры
// принимает массив для обработки и родительский элемент в который встраивается поле игры

import { randomInteger } from '@shared/utils/helpers';
import { make_cover } from '@features/Make_Cover/make_cover';
import { make_answersBlock } from '@features/Answers_Block/make_answersBlock.js';
import { level_setup } from '../../features/Level_Setup/level_setup';
import { clear_game } from '../../features/Clear_Game/clear_game';
import { tooltip } from '../../features/Tooltip/tooltip';
import { timer } from '../Timer/timer';

function game_play(arr, parent) {
  console.log('function game_play')
  // номер уровня. меняется через function level_setup() и хранится в localStorage.getItem('level')
  let level = level_setup();
  clear_game();

  // получить случайный фон
  const all_img = arr.length - 1;
  const bg_num = randomInteger(1, all_img); // убираем первый элемент - это обложка
  const bg_obj = arr[bg_num];
  const bg_name_true = bg_obj.name;

  // создать поле со случайным фоном
  const game_board = document.createElement('div');
  game_board.setAttribute('id', 'game_board');
  game_board.style.backgroundImage = `url('${bg_obj.file}')`;
  game_board.dataset.bg_img = bg_name_true;
  // подключить подсказку
  tooltip(bg_obj.tooltip, game_board);

  parent.appendChild(game_board);

  // объект неправильных ответов 
  const name_arr = [];
  for (const i of arr) {
    for (const key in i) {
      if (key === 'name' && i[key] !== bg_name_true) {
        name_arr.push(i[key])
      }
    }
  };

  // закрыть поле не прозрачными квадратами (случайного цвета), которые станут прозрачными после клика по ним 
  make_cover(level, game_board);
  // 4 кнопки с вариантами ответов 
  make_answersBlock(bg_name_true, name_arr, game_board);
  // подключили таймер
  const timerDisplay = document.querySelector('#timer');
  if (timerDisplay) {
    timer(timerDisplay);
  }
};

export { game_play };