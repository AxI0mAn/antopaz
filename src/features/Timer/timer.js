// получаем элемент для отображения времени и устанавливаем текущее значение
// если начата игра (нажата  <button id="start"> или правильный ответ), то запускаем обратный отсчёт
// если таймер = 0,но правильного ответа нет, то -timer очков (score_subtract), остановить таймер, окрасить кнопку правильного ответа в зелёный (time_end_and_btn), и показать картинку ( time_end_and_cover_opacity)

import { score_subtract } from "../Score/score";
import { time_end_and_cover_opacity } from "../Make_Cover/make_cover";
import { time_end_and_btn } from "../Answers_Block/make_answersBlock";


let timerDisplay;
const time_start = 30;
if (timerDisplay) {
  time_start = timerDisplay.textContent;
}

let countdownInterval;
let timeLeft = time_start;

let isRunning = false;

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
}

function resetTimer() {
  timeLeft = time_start;
  updateTimerDisplay();
  isRunning = false;
}

function stopTimer() {
  clearInterval(countdownInterval);
}

function startCountdown() {
  isRunning = true;

  clearInterval(countdownInterval); // Очищаем предыдущий интервал, если есть

  countdownInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft < 10) {
      timerDisplay.classList.add('timer_soon');
    }
    updateTimerDisplay();

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      isRunning = false;
      timeLeft = 0; // Убедимся, что значение не уходит в минус
      updateTimerDisplay();
      score_subtract(-100); // отнять очки за отсутствие ответа
      time_end_and_cover_opacity(); // сделать cover прозрачным и 
      time_end_and_btn(); // подсветить кнопку с правильным ответом
    }
  }, 1000);
}

function timer(elem) {
  timerDisplay = elem;
  resetTimer();
  if (isRunning) {
    resetTimer();
    startCountdown();
  } else {
    startCountdown();
  }
}

export { timer, stopTimer }