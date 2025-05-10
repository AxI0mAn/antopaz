// Импортируем стили
import '@shared/styles/base/_reset.scss';
import './index.scss';

// Импортируем иконки
import icon_edit from '@shared/assets/icons/icon_edit.svg';
import icon_home from '@shared/assets/icons/icon_home.svg';
import icon_menu from '@shared/assets/icons/icon_menu.svg';

// Импортируем нужные функции 
import { game_scene } from '@features/Game_Scene/game_scene';
import { game_play } from '@features/Game_Play/game_play';
import { score_start } from '@features/Score/score';

// импортируем наборы и получаем массив обложек
import { test_arr } from '../Sets/test';
import { anim_arr } from '../Sets/animals';
// массив обложек
const show_covers = [test_arr, anim_arr];
// массив который будет открыт для игры 
let img_arr = anim_arr;

// ==========================================
// ==========================================

//     start    СЛУЖЕБНАЯ НЕ ИЗМЕННАЯ ЧАСТЬ 1 из 2

// Импортируем функции инициализации и навигации
import { initRouter, navigate } from '@app/router';
// Убедитесь, что ваш файл src/pages/GamePage/index.html содержит <div id="app"></div> - это точка входа в приложение
// и статическую верстку (шапка, подвал, ссылки), которая должна быть видна по умолчанию.
const appContainer = document.getElementById('app');
// Проверим, найден ли контейнер сразу при загрузке скрипта
if (!appContainer) {
  console.error("Критическая ошибка: Элемент с ID 'app' не найден в DOM при загрузке скрипта.");
  // Здесь можно остановить выполнение или показать аварийное сообщение.
  // Для примера просто логируем ошибку.
}

// ==========================================

// Определяем функцию add_link для динамического создания ссылок  
// Использует process.env.PUBLIC_URL (доступно благодаря DefinePlugin)
function add_link(alink) {
  // Убедимся, что контейнер и alink валидны
  if (!appContainer || !alink || typeof alink !== 'string') {
    console.error("add_link: Некорректные аргументы или контейнер не найден.");
    return;
  }

  const link = document.createElement('a');
  // Формируем полный URL для атрибута href с учетом publicPath
  let linkHref = process.env.PUBLIC_URL + alink; // Например, '/testSPAPWA/' + 'func2' -> '/testSPAPWA/func2'
  link.setAttribute('href', linkHref);
  link.textContent = `open ${alink}`;

  // Добавляем ссылку в контейнер
  appContainer.appendChild(link);
}

// ==========================================

// код регистрации Service Worker'а тут, т.к. эта странци игры и есть PWA

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Используем PUBLIC_URL для формирования правильного пути к Service Worker'у
    // Добавляем слеш, если PUBLIC_URL не пустая строка (т.е. в Production)
    const swUrl = process.env.PUBLIC_URL + 'service-worker.js'; //'/service-worker.js';//
    console.log('Attempting to register Service Worker with URL:', swUrl); // Логируем для проверки

    navigator.serviceWorker.register(swUrl) // (swUrl, { scope: process.env.PUBLIC_URL })
      .then(registration => {
        // Регистрация Service Worker прошла успешно
        console.log('Service Worker зарегистрирован с областью видимости:', registration.scope);
      })
      .catch(error => {
        // Ошибка регистрации Service Worker
        console.error('Ошибка регистрации Service Worker:', error);
      });
  });
}





//      end   СЛУЖЕБНАЯ НЕ ИЗМЕННАЯ ЧАСТЬ 1 из 2

// ==========================================
// ==========================================



/* cтарые функции !!!!!!!!!!!!!
// ==================== cтарые функции
// коррекция внешнего вида страницы GamePage
function correct_GamePage() {
  const icon_settings = document.querySelector('#icon_settings');
  if (icon_settings) {
    icon_settings.textContent = '';
    icon_settings.insertAdjacentHTML('afterbegin', icon_edit);
  }
  const icon_homeP = document.querySelector('#icon_home');
  if (icon_homeP) {
    icon_homeP.textContent = '';
    icon_homeP.insertAdjacentHTML('afterbegin', icon_home);
  }
  const icon_menuP = document.querySelector('#icon_menu');
  if (icon_menuP) {
    icon_menuP.textContent = '';
    icon_menuP.insertAdjacentHTML('afterbegin', icon_menu);
  }

  // сменяем массив картинок после клика по ссылке на витрине
  function new_img_arr(arr) {
    img_arr = arr;
  }

  // coздать витрину из массива обложек - ссылки на наборы тестов

  const showroom = document.getElementById('showroom');
  if (showroom) {
    for (let show_cover of show_covers) {
      let link = document.createElement('a');
      link.classList.add('show_cover');
      let link_href = process.env.PUBLIC_URL + show_cover[0].link; //'<%= htmlWebpackPlugin.files.publicPath %>' + show_cover[0].link;
      link.setAttribute('href', `${link_href}`)
      link.style.backgroundImage = `url('${show_cover[0].screen}')`;

      let title = document.createElement('span');
      title.classList.add('show_title');
      title.textContent = show_cover[0].title;

      link.addEventListener('click', function func(e) {
        e.preventDefault();
        new_img_arr(show_cover);
        func_start();
      })

      link.appendChild(title);
      showroom.appendChild(link);
    }
  }
}
correct_GamePage();


function func_start() {
  game_scene();
  correct_GamePage();

  score_start(); // показываем текущий счёт из хранилища
  if (appContainer) {
    game_play(img_arr, appContainer); // запускаем игру

    const btn_start = document.querySelector('#start');
    btn_start.addEventListener('click', function func() {
      game_play(img_arr, appContainer); // запускаем игру
    });
  }
}
*/
// =============
/*показать витрину
let new_link_game = document.querySelector('#link_game');
if (new_link_game) {
  new_link_game.addEventListener('click', function func() {
    game_showroom();
    stopTimer();
    correct_GamePage();
  })
}
*/


// ==========================================
// ==========================================

// start ФОРМИРОВАНИЯ ЛОГИКИ РАБОТЫ SPA 
//                    через эти функции:


// ВАЖНОЕ:  
// // Предполагаем, что func1 чистит контейнер, func2 рисует список игр, func3/4 рисуют игры
// func1 - Чистит контейнер (функция, используемая внутри других рендереров перед отрисовкой, а не как самостоятельный маршрут).
// func1 (renderClear) не нужен как отдельный маршрут, т.к. это утилитарная функция.
// Ее можно вызывать внутри render функций (func2, func3 и т.д.) перед отрисовкой.
// Например, в начале func2(), func3() и т.д. вызвать func1().
// Или роутер (handleLocation) может сам вызывать очистку перед вызовом currentRoute.render().
// Давайте предположим, что функции render (func2, func3 и т.д.) сами вызывают очистку.
// Тогда в начале func2() будет: func1(); /* остальная логика func2 */

// Создаём функции, которые будут отрисовывать страницы SPA

function func1() { //отвечает за показ изначальной верстки (или ее очистку)
  console.log("Вызвана функция func1()");
  if (!appContainer) return; // Проверка
  appContainer.style.cssText = `
  min-width: 320px;
  min-height: 320px;
  border: 1px solid green;
  color: black;
  background: transparent;
  font-size: 32px;`;

  // Очищаем предыдущие ссылки (если они были добавлены ранее)
  // Это нужно, если функции отрисовки добавляют ссылки внутрь appContainer
  // appContainer.querySelectorAll('a').forEach(link => link.remove()); // Или очистка через innerHTML = ''

  appContainer.textContent = 'function func1() - очистка контейнера appContainer';
  add_link('func2');
  add_link('func3');
  add_link('func4');
}

function func2() {
  console.log("Вызвана функция func2()");
  if (!appContainer) return; // Проверка
  appContainer.style.cssText = `
  min-width: 320px;
  min-height: 320px;
  border: 2px solid #777;
  color: #777;
  background: blue;
  font-size: 24px;`;
  appContainer.textContent = 'function func2()';
  appContainer.querySelectorAll('a').forEach(link => link.remove()); // Очищаем предыдущие ссылки
  add_link(''); // Ссылка на корень '/'
  add_link('func1');
}

function func3() {
  console.log("Вызвана функция func3()");
  if (!appContainer) return; // Проверка
  appContainer.style.cssText = `
  min-width: 320px;
  min-height: 320px;
  border: 2px solid green;
  color: green;
  background: black;
  font-size: 24px;`;
  appContainer.textContent = 'function func3()';
  appContainer.querySelectorAll('a').forEach(link => link.remove()); // Очищаем предыдущие ссылки
  add_link(''); // Ссылка на корень '/'
  add_link('func1');
}

function func4() {
  console.log("Вызвана функция func4()");
  if (!appContainer) return; // Проверка
  appContainer.style.cssText = `
  min-width: 320px;
  min-height: 320px;
  border: 2px solid #fff;
  color: #fff;
  background: #AAA;
  font-size: 24px;`;
  appContainer.textContent = 'function func4()';
  appContainer.querySelectorAll('a').forEach(link => link.remove()); // Очищаем предыдущие ссылки
  add_link(''); // Ссылка на корень '/'
  add_link('func1');
}

function func404() {
  console.log("Вызвана функция func404()");
  if (!appContainer) return; // Проверка
  appContainer.style.cssText = `
  min-width: 320px;
  min-height: 320px;
  border: 2px solid red;
  color: #fff;
  background: red;
  font-size: 24px;`;
  appContainer.textContent = 'function func4()';
  appContainer.querySelectorAll('a').forEach(link => link.remove()); // Очищаем предыдущие ссылки
  add_link(''); // Сюда можно добавить ссылку обратно на главную
}


// end         ЛОГИКА РАБОТЫ SPA СФОРМИРОВАНА
// ==========================================
// ==========================================



// Определяем карту маршрутов (renderMap)
const renderMap = {
  renderGame: {  //func1 -  Отрисовывает список игр (это  главная "начальная" страница SPA)
    path: '/', // Корень SPA
    title: 'Game Menu',
    render: func1,
  },
  renderFunc1: {
    path: '/func1',
    title: 'Game Menu',
    render: func1,
  },
  renderGameFile: {
    path: '/game.html',
    title: 'Game Menu',
    render: func1,
  },
  renderGameFileSlash: {
    path: '/game.html/',
    title: 'Game Menu',
    render: func1,
  },
  renderFunc2: {  // Отрисовывает конкретную игру Game=func2
    path: '/func2',
    title: 'Game=func2',
    render: func2,
  },
  renderFunc3: {  // Отрисовывает конкретную игру Game=func3
    path: '/func3',
    title: 'Game=func3',
    render: func3,
  },
  renderFunc4: {  // Отрисовывает конкретную игру Game=func4
    path: '/func4',
    title: 'Game=func4',
    render: func4,
  },
  render404: {
    path: '/404',
    title: 'Page 404',
    render: func404,
  },
  // в любой момент можем добавить renderFunc5: func5, или renderSettings: settings,
}




// =================
// router

// --- Инициализация роутера ---
// Убедимся, что DOM полностью загружен перед инициализацией роутера
window.addEventListener('DOMContentLoaded', () => {
  // Проверим еще раз, что контейнер найден (на всякий случай)
  const appContainer = document.getElementById('app'); // Можно получить здесь локально

  if (appContainer) {
    console.log("DOM загружен, инициализируем роутер  и добавляем обработчик кликов.");

    // Инициализируем роутер, передавая ему контейнер, и функции отрисовки
    initRouter(appContainer, renderMap);

    // --- Добавление обработчиков кликов к ссылкам ---
    // Добавляем глобальный обработчик кликов на document.body  
    // Этот обработчик перехватывает клики по всем ссылкам на странице.
    document.body.addEventListener('click', (e) => {
      // Находим ближайшую ссылку от места клика
      const target = e.target.closest('a');

      // Проверяем, что клик был по ссылке, у ссылки есть href,
      // она ведет на тот же домен (внутренняя ссылка SPA),
      // и это не ссылка для скачивания или открытия в новой вкладке.
      if (target && target.href && target.origin === window.location.origin && !target.hasAttribute('download') && target.target !== '_blank') {

        // Получаем URL из href ссылки
        const url = target.href.replace(window.location.origin, '');
        // Если href просто '/', replace может дать пустую строку.
        // Убедимся, что для корня получаем '/'
        const cleanUrl = url === '' ? '/' : url;


        // Вызываем navigate для обработки перехода SPA
        const isSpaNavigation = navigate(cleanUrl); // navigate вернет true, если это маршрут SPA

        // Если navigate обработал этот URL как маршрут SPA
        if (isSpaNavigation) {
          e.preventDefault(); // Отменяем стандартное действие браузера (переход по ссылке)
          console.log(`Клик по внутренней ссылке ${cleanUrl} обработан роутером.`);
        } else {
          // Если navigate вернул false (это не маршрут SPA), позволяем браузеру сделать стандартный переход
          console.log(`Клик по ссылке ${target.href} не является SPA маршрутом. Позволяем браузеру сделать переход.`);
        }
      }
      // Если клик был не по ссылке или ссылка внешняя/для скачивания/новой вкладки,
      // стандартное действие браузера не отменяется.
    });


  } else {
    console.error("Элемент с ID 'app' не найден при загрузке DOMContentLoaded!");
    // TODO: Показать сообщение об ошибке пользователю
  }
});

function func_start() { };
function correct_GamePage() { };

export {
  func_start, // запуск игры из make_answersBlock(), если нажата кнопка с правильным ответом
  correct_GamePage // перерисовываем GamePage в game_scene по нажатию на кнопку new_link_game
}


