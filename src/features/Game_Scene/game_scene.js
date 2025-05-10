import { clear_container, createElement } from "@shared/utils/element_action.js"
import { score_now } from '@features/Score/score';

// подготовка страницы к игре
// удалить не нужные элементы
// добавить инфраструктуру для игры

function make_link_game() {
  const icon_menu_props = {
    'id': "icon_menu",
  };
  const icon_menu = createElement('span', icon_menu_props, 'Menu');

  const link_game_props = {
    'id': "link_game",
    'class': "icon",
    'href': process.env.PUBLIC_URL + 'game.html',
  }
  const link_game = createElement('a', link_game_props, icon_menu);
  // link_game.setAttribute('href', process.env.PUBLIC_URL);
  return link_game;
}

function make_link_home() { // for showroom
  const icon_home_props = {
    'id': "icon_home",
  };
  const icon_home = createElement('span', icon_home_props, 'Home');

  const link_home_props = {
    'id': "link_home",
    'class': "icon",
    'href': process.env.PUBLIC_URL + 'home.html',
  }
  const link_home = createElement('a', link_home_props, icon_home);
  return link_home;
}

function make_counters() {
  const score_current_props = {
    'id': "score",
  };
  let scor = score_now();
  const score_current = createElement('span', score_current_props, `${scor}`);

  const score_props = {
    'class': 'score',
    'textContent': 'SCORE: '
  };
  const score = createElement('p', score_props, score_current);


  const timer_current_props = {
    'id': "timer",
    'textContent': '30'
  };
  const timer_current = createElement('span', timer_current_props, '');

  const timer_props = {
    'class': 'time',
    'textContent': 'TIMER: '
  };
  const timer = createElement('p', timer_props, timer_current);

  const counters_props = {
    'id': 'counters',
  };
  const counters = createElement('div', counters_props, score, timer);

  return counters;
}

function make_slogan() { // for showroom
  const slogan_props = {
    'class': "slogan",
  };

  const slogan = createElement('h1', slogan_props, `be smart with antiPazz`);

  return slogan;
}

function make_btn_settings() { // use in scene and showroom
  const icon_settings_props = {
    'id': "icon_settings",
  };
  const icon_settings = createElement('span', icon_settings_props, '&#9776;');

  const btn_settings_props = {
    'id': 'btn_settings',
    'class': 'icon',
  };
  const btn_settings = createElement('button', btn_settings_props, icon_settings);

  return btn_settings;
}

function make_btn_start() {
  const btn_start_props = {
    'id': 'start',
  };
  const btn_start = createElement('button', btn_start_props, 'New Game');

  return btn_start;
}
function make_input_level() {
  const inp_level_props = {
    'type': "range",
    'id': "level",
    'name': "level",
    'min': "0",
    'max': "18",
    'value': `${+localStorage.getItem('level')}`,
    'step': "1",
  };
  const inp_level = createElement('input', inp_level_props);

  return inp_level;
}
function make_btn_tooltip() {
  const btn_tooltip_props = {
    'id': 'tooltip',
  };
  const btn_tooltip = createElement('button', btn_tooltip_props, 'Get tooltip');

  return btn_tooltip;
}

function make_btn_antiPazz() { // for showroom
  const btn_mode_antiPazz_props = {
    'id': 'mode_antiPazz',
  };
  const btn_mode_antiPazz = createElement('button', btn_mode_antiPazz_props, 'mode_antiPazz');

  return btn_mode_antiPazz;
}
function make_btn_quiz() { // for showroom
  const btn_mode_quiz_props = {
    'id': 'mode_quiz',
  };
  const btn_mode_quiz = createElement('button', btn_mode_quiz_props, 'mode_quiz');

  return btn_mode_quiz;
}
function make_btn_polyglot() { // for showroom
  const btn_mode_polyglot_props = {
    'id': 'mode_polyglot',
  };
  const btn_mode_polyglot = createElement('button', btn_mode_polyglot_props, 'mode_polyglot');

  return btn_mode_polyglot;
}

function game_scene() {
  let header = document.getElementById('header');
  clear_container(header);
  header.insertAdjacentElement('afterbegin', make_btn_settings());
  header.insertAdjacentElement('afterbegin', make_counters());
  header.insertAdjacentElement('afterbegin', make_link_game());

  let control = document.getElementById('control');
  clear_container(control);
  control.insertAdjacentElement('afterbegin', make_btn_tooltip());
  control.insertAdjacentElement('afterbegin', make_input_level());
  control.insertAdjacentElement('afterbegin', make_btn_start());

  let showroom = document.getElementById('showroom');
  if (showroom) showroom.remove();

}

function game_showroom() {
  let header = document.getElementById('header');
  clear_container(header);
  header.insertAdjacentElement('afterbegin', make_btn_settings());
  header.insertAdjacentElement('afterbegin', make_slogan());
  header.insertAdjacentElement('afterbegin', make_link_home());

  let control = document.getElementById('control');
  clear_container(control);
  control.insertAdjacentElement('afterbegin', make_btn_antiPazz());
  control.insertAdjacentElement('afterbegin', make_btn_quiz());
  control.insertAdjacentElement('afterbegin', make_btn_polyglot());

  let app = document.getElementById('app');
  if (app) app.remove();
}

export {
  game_scene,
  game_showroom
}