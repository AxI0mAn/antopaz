import '@shared/styles/base/_reset.scss';
import './index.scss';
import home_webp from '../../shared/assets/images/home.webp';
import home_jpeg from '../../shared/assets/images/home.jpeg';
import forest_jpg from '@shared/assets/images/forest.jpg';
import myVid from '@shared/assets/video/video.mp4';
import svg_scroll from '@shared/assets/icons/scroll.svg';


document.body.insertAdjacentHTML('afterbegin', `
<header>
  <h1>Домашняя страница</h1>
  <p>Эта страница полностью статическая и доступна как отдельный html-файл</p>
</header>
`);


const h3 = document.querySelector('h3');
h3.insertAdjacentHTML('afterend', svg_scroll);
