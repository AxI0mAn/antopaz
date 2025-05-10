// с помощью router.js нам нужно подключать разные комплекты массивов (подборов)


// Массив для хранения маршрутов. Объявляем его с помощью let
// в области видимости модуля, чтобы он был доступен всем функциям роутера.
let routes = [];

// Ссылка на элемент контейнера, куда отрисовывается контент
let appContainer = null;

// Ссылка на функцию отрисовки контента
let renderFunction = null;

// Функция, которая определяет текущий маршрут и отрисовывает контент
// --- Модифицируем handleLocation для вызова render функции ---
// handleLocation будет искать маршрут по path и вызывать currentRoute.render()
const handleLocation = () => {
  const fullPath = window.location.pathname;
  const basePublicPath = process.env.PUBLIC_URL || '/';

  // Определяем "чистый" путь маршрута 
  const pathAfterPublicPath = fullPath.startsWith(basePublicPath)
    ? fullPath.substring(basePublicPath.length)
    : fullPath;
  const cleanPath = pathAfterPublicPath === '' ? '/' : '/' + pathAfterPublicPath;

  console.log(`HandleLocation: Current full URL: ${fullPath}, Base Public Path: ${basePublicPath}, Determined clean path: ${cleanPath}`);

  // Ищем маршрут в массиве routes по чистому пути
  const currentRoute = routes.find(route => route.path === cleanPath);
  // Если маршрут найден, проверяем render функцию и вызываем ее 
  if (currentRoute) {
    console.log("HandleLocation: Route found:", currentRoute);

    //  Вызываем функцию отрисовки из объекта маршрута 
    if (currentRoute.render && appContainer) {
      // Вызываем функцию отрисовки, связанную с маршрутом (func2, func3 и т.д.)
      // Предполагаем, что эти функции сами работают с appContainer и не требуют аргументов
      // Или если они ожидают контейнер как аргумент: currentRoute.render(appContainer);
      // Исходя из вашей func1, они сами работают с appContainer.
      // Если funcN ожидают контейнер как аргумент: currentRoute.render(appContainer);
      // Если funcN не ожидают аргументов (как в вашем примере):
      currentRoute.render();


      document.title = currentRoute.title || 'Ваше приложение'; // Устанавливаем заголовок страницы из маршрута
    } else if (appContainer) {
      console.error(`HandleLocation: Маршрут найден (${cleanPath}), но не имеет функции render или контейнер не найден!`);
      // TODO: Обработка ошибки
      console.error(`appContainer.innerHTML = '<h1>Ошибка конфигурации роутера: Нет функции отрисовки для этого маршрута.</h1>'`);
      document.title = 'Router Error';
    }


  } else { // currentRoute === undefined (404)
    // Определяем чистый путь для страницы 404
    const notFoundPath = '/404'; // Указываем путь к маршруту 404 из renderMap

    // Проверяем, что маршрут 404 вообще существует в нашем списке routes
    const notFoundRoute = routes.find(route => route.path === notFoundPath);

    if (notFoundRoute) {
      // >>> Шаг 4.6а (новый): Перенаправляем на маршрут 404 с помощью replaceState <<<

      // Формируем полный URL для маршрута 404 с учетом publicPath
      const fullNotFoundUrl = basePublicPath + (notFoundPath === '/' ? '' : notFoundPath.substring(1));

      console.warn(`HandleLocation: Маршрут не найден: ${cleanPath}. Перенаправляем на 404 маршрут: ${notFoundPath}`);

      // Используем history.replaceState!
      // Это меняет URL в адресной строке на /404 (или /testSPAPWA/404)
      // и НЕ добавляет исходный некорректный URL в историю браузера.
      history.replaceState({}, '', fullNotFoundUrl);

      // >>> Шаг 4.6б (новый): Вызываем handleLocation снова для обработки НОВОГО URL (/404) <<<
      // После replaceState handleLocation не вызывается автоматически.
      // Мы должны вызвать ее явно, чтобы она обработала только что установленный URL /404.
      handleLocation();

      // Важно: Останавливаем текущее выполнение handleLocation для исходного некорректного URL
      return;

    } else {
      // Если даже маршрут 404 не найден в списке (что плохо!)
      console.error(`HandleLocation: Маршрут не найден (${cleanPath}) И маршрут 404 (${notFoundPath}) не найден!`);
      if (appContainer) console.error(`appContainer.innerHTML = <h1>Критическая ошибка: Маршрут "${cleanPath}" не найден И маршрут 404 не настроен!</h1>`);
      document.title = 'Fatal Router Error';
    }
  }
};

// Функция для навигации (остается как есть, принимает полный путь из href, например '/test', '/game.html', '/')
const navigate = (fullUrlFromHref) => {
  const basePublicPath = process.env.PUBLIC_URL || '/'; // В Dev: '/', В Prod: '/testSPAPWA/'

  // Извлекаем "чистый" путь маршрута из полного URL
  const pathAfterPublicPath = fullUrlFromHref.startsWith(basePublicPath)
    ? fullUrlFromHref.substring(basePublicPath.length)
    : fullPath; // Используем fullPath если префикса нет
  const cleanPath = pathAfterPublicPath === '' ? '/' : '/' + pathAfterPublicPath;

  // Проверяем, является ли ЧИСТЫЙ путь известным маршрутом SPA (включая '/', '/game.html')
  const isSpaRoute = routes.some(route => route.path === cleanPath);

  if (isSpaRoute) {
    // Формируем URL для history.pushState
    // Если cleanPath = '/', pushState URL должен быть только basePublicPath
    // Если cleanPath = '/game.html', pushState URL должен быть basePublicPath + 'game.html'
    // Если cleanPath = '/test', pushState URL должен быть basePublicPath + 'test'
    const finalPushStateUrl = basePublicPath + (cleanPath === '/' ? '' : cleanPath.substring(1));

    console.log(`Maps: Попытка навигации по SPA. Путь из href: ${fullUrlFromHref}, Чистый путь: ${cleanPath}, Для pushState: ${finalPushStateUrl}`);

    // Используем history.pushState для изменения URL
    history.pushState({}, '', finalPushStateUrl);

    // Вызываем обработчик для нового URL
    handleLocation();
    console.log(`Maps: SPA Навигация выполнена.`);
    return true; // Указываем, что это была навигация SPA
  } else {
    console.log(`Maps: Не является маршрутом SPA: ${fullUrlFromHref}. Разрешаем стандартный переход.`);
    return false; // Указываем, что это НЕ навигация SPA
  }
};

window.onpopstate = handleLocation; // Обработчик кнопок назад/вперед


// Функция инициализации роутера
const initRouter = (containerElement, routesDefinitionMap) => {
  appContainer = containerElement;

  // Инициализируем или очищаем массив маршрутов
  routes = []; // Очищаем массив routes перед заполнением

  // Автоматически заполняем массив маршрутов из routesDefinitionMap (renderMap) 

  // Итерируем по ЗНАЧЕНИЯМ объекта renderMap
  Object.values(routesDefinitionMap).forEach(routeDefinition => {
    // Каждое значение (routeDefinition) должно быть объектом { path: '...', title: '...', render: function }

    // Проверяем, что это корректное определение маршрута: есть path, render и render - функция
    if (routeDefinition && routeDefinition.path && routeDefinition.render && typeof routeDefinition.render === 'function') {

      // Убедимся, что path начинается со слэша, если он не просто '/'
      const path = routeDefinition.path.startsWith('/') ? routeDefinition.path : '/' + routeDefinition.path;
      const title = routeDefinition.title || 'GamePage'; // Используем title из определения или дефолтный 'GamePage'

      // Добавляем объект маршрута в массив routes
      routes.push({
        path: path,       // Путь маршрута (например, '/', '/func3')
        title: title,     // Заголовок страницы
        render: routeDefinition.render // Ссылка на функцию отрисовки (func2, func3 и т.д.)
      });
    } else {
      console.warn("Router Init Warning: Invalid route definition found in map:", routeDefinition, ". Skipping.");
      // Логируем некорректные записи в renderMap
    }
  });

  // >>> Логируем конечный список маршрутов для проверки <<<
  console.log("Final SPA Routes List:", routes);
  console.log("Router initialized.");


  // Вызов handleLocation 
  handleLocation();
};


// Экспортируем функции
export {
  initRouter,
  navigate
};