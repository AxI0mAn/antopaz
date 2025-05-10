// тестовый набор для игры


// подключаем картинки
import barbecue from '@shared/assets/images/barbecue.webp';
import circus from '@shared/assets/images/circus.webp';
import forest from '@shared/assets/images/forest.webp';
import home from '@shared/assets/images/home.webp';
import river from '@shared/assets/images/river.webp';
import scuirrel from '@shared/assets/images/scuirrel.webp';
import shark from '@shared/assets/images/shark.webp';
import tomato from '@shared/assets/images/tomato.webp';
import winter from '@shared/assets/images/winter.webp';

// массив с используемыми именами картинок и соответствующие названия для кнопок
const test_arr = [
  {
    'link': 'test', // текст для ссылки для SPA роутера 
    'title': 'тестовый набор', // текст для обложки на стартовой странице *** Добавить все языки
    'screen': home, // фото для обложки на стартовой странице
  },
  {
    'name': 'мангал', // надпись на кнопке *** Добавить все языки
    'file': barbecue, // используется для отрисовки фона
    'tooltip': 'на картинке мангал', // показывается при нажатии на кнопку tooltip *** Добавить все языки
    'answer': 'устройство для приготовления пищи на углях', // показывается если вышло время *** Добавить все языки
  },
  {
    'name': 'цирк',
    'file': circus,
    'tooltip': 'на картинке цирк',
  },
  {
    'name': 'лес',
    'file': forest,
    'tooltip': 'на картинке лес ',
  },
  {
    'name': 'абстракция',
    'file': home,
    'tooltip': 'на картинке абстракция',
  },
  {
    'name': 'река',
    'file': river,
    'tooltip': 'на картинке река',
  },
  {
    'name': 'белка',
    'file': scuirrel,
    'tooltip': 'на картинке белка',
  },
  {
    'name': 'акула',
    'file': shark,
    'tooltip': 'на картинке акула',
  },
  {
    'name': 'помидор',
    'file': tomato,
    'tooltip': 'на картинке помидор',
  },
  {
    'name': 'зима',
    'file': winter,
    'tooltip': 'на картинке зима',
  },
];


export { test_arr }