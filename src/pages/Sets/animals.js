// набор для игры animals


// подключаем картинки
import giraffe from '@shared/assets/images/animals/more1-d.webp';
import elephant from '@shared/assets/images/animals/more2-d.webp';
import lion from '@shared/assets/images/animals/more3-d.webp';
import bedouin from '@shared/assets/images/animals/more4-d.webp';
import tiger from '@shared/assets/images/animals/more5-d.webp';
import leopard from '@shared/assets/images/animals/more6-d.webp';
import zebra from '@shared/assets/images/animals/more7-d.webp';


// массив с используемыми именами картинок и соответствующие названия для кнопок
const anim_arr = [
  {
    'link': 'anim', // текст для ссылки для SPA роутера 
    'title': 'набор о животных Африки', // текст для обложки на стартовой странице *** Добавить все языки
    'screen': bedouin, // фото для обложки на стартовой странице
  },
  {
    'name': 'zebra',
    'file': zebra,
    'tooltip': 'на картинке zebra',
  },
  {
    'name': 'leopard',
    'file': leopard,
    'tooltip': 'на картинке leopard',
  },
  {
    'name': 'tiger',
    'file': tiger,
    'tooltip': 'на картинке tiger',
  },
  {
    'name': 'lion',
    'file': lion,
    'tooltip': 'на картинке lion',
  },
  {
    'name': 'elephant',
    'file': elephant,
    'tooltip': 'на картинке elephant ',
  },
  {
    'name': 'giraffe',
    'file': giraffe,
    'tooltip': 'на картинке giraffe',
  },
];


export { anim_arr }