// функция принимает:  правильный ответ, как имя картинки bg_name_true=trueBG, массив из 4х вариантов ответов name_arr=arr, элемент в котором находится картинка game_board=prevNode, 
// функция создаёт 4 кнопки с вариантами ответов и размещает их под игровым полем 
// содержит логику поведения при нажатии на правильный и неправильные варианты ответов 

import { randomInteger, shuffle } from '@shared/utils/helpers';
import { func_start } from '@pages/GamePage';
import { score_add, score_subtract } from '../Score/score';

function make_answersBlock(trueBG, arr, prevNode) {
  const answers_arr = [trueBG,]; // массив в котором уже есть правильный ответ
  // добавляем ещё три не правильных, сравниваем их с теми что есть в массиве ответов. Если такой уже есть, но ответов меньше 4х, то продолжаем набирать

  while (answers_arr.length < 4) {
    let rand = randomInteger(0, arr.length - 1);
    if (answers_arr.indexOf(arr[rand]) === -1) {
      answers_arr.push(arr[rand]);
    }
  };
  shuffle(answers_arr); // перемешали объект

  // создать блок с кнопками ответов
  let answers = document.createElement('div');
  answers.setAttribute('id', 'answers');
  for (let i = 0; i < answers_arr.length; i++) {
    let btn_answ = document.createElement('button');
    btn_answ.textContent = answers_arr[i];
    if (answers_arr[i] === trueBG) {
      btn_answ.classList.add('true'); // кнопка с правильным ответом
      btn_answ.addEventListener('click', function func() {
        let timer_view = document.querySelector('#timer');
        if (timer_view.textContent > 0) { // если время не вышло
          score_add();// запускаем подсчёт и сохранение score
          answers.remove(); // удалить кнопки с ответами
          prevNode.remove(); // удалить поле
          func_start(); // запускаем игру
        };
      })
    } else {// действия при неправильном ответе
      btn_answ.addEventListener('click', function func() {
        score_subtract(-100); // отнять очки за неправильный ответ
        btn_answ.remove();
        let sq_open = document.querySelector('.sq_cover.open');
        if (sq_open) {
          sq_open.classList.remove('open');
        }
      })
    }
    answers.append(btn_answ);
  }
  prevNode.insertAdjacentElement('afterend', answers);
};

// если закончилось время
function time_end_and_btn() {
  let btn_true = document.querySelector('button.true');
  btn_true.classList.add('right');
}

export {
  make_answersBlock, time_end_and_btn
}