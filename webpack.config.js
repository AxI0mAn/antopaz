const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const { DefinePlugin } = require('webpack');
const { GenerateSW } = require('workbox-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDev = !isProduction;
  const shouldAnalyze = env && env.analyze;
  const repoName = 'axiopazz'; // Убедитесь, что имя репозитория здесь актуально

  // console.log(`Webpack is running in ${isProduction ? 'production' : 'development'} mode`);

  //   НАЧАЛО: Определяем массив плагинов в отдельной переменной  
  const allPlugins = [
    // Плагин для управления файлами/папками
    new FileManagerPlugin({ // Плагин для управления файлами/папками, используем его для очистки папки dist
      events: {
        onStart: { // Событие до начала сборки
          delete: [ // Удаляем содержимое папки dist
            path.join(__dirname, 'dist'),
          ]
        },
        onEnd: { // Если нужно копировать файлы после сборки (например, статические ресурсы из /public)
          // В ДАННОЙ СБОРКЕ ОТКЛЮЧЕНО - БЫЛО ДУБЛИРОВАНИЕ ИКОНОК МАНИФЕСТА ИЗ рublic 
          // copy: [
          //   {
          //     source: path.join(__dirname, 'public'),
          //     destination: path.join(__dirname, 'dist'),
          //     // Исключаем папку с исходными иконками из копирования FileManagerPlugin  
          //     globOptions: {
          //       ignore: [
          //         path.join(__dirname, 'public', 'assets', 'icons', '**/*'), // Игнорируем все файлы в этой папке и подпапках
          //       ],
          //     },
          //   }
          // ]
        },
      },
    }),

    // Плагины для генерации HTML файлов
    new HtmlWebpackPlugin({ // Плагин для генерации HTML файла для Home Page
      filename: 'index.html',
      template: './src/pages/HomePage/index.html',
      chunks: ['homePage'],
      title: 'Home Page',
      favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
      minify: isProduction,
    }),
    new HtmlWebpackPlugin({ // Плагин для генерации HTML файла для Game Page (SPA/PWA)
      filename: 'game.html',
      template: './src/pages/GamePage/index.html',
      chunks: ['gamePage'],
      title: 'Game Page',
      favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
      minify: isProduction,
    }),

    // Плагины, активные ТОЛЬКО в Production
    ...(isProduction ? [
      new MiniCssExtractPlugin({ // В режиме production извлекаем CSS в отдельные файлы
        filename: '[name].[contenthash].css', // Имя выходного CSS файла с хешем
      }),

      // Workbox GenerateSW плагин для PWA Service Worker 
      new GenerateSW({
        clientsClaim: true, // Принуждает новый Service Worker активироваться немедленно после установки, пропуская фазу "ожидания". Это означает, что пользователю не нужно закрывать и снова открывать вкладки. 
        skipWaiting: true, // Позволяет новому Service Worker'у взять под контроль все открытые страницы сразу после активации и новые версии service worker вступят в силу быстрее
        // Убедитесь, что здесь НЕТ опции scope!  Удалите ее, если она там осталась!
        // Убедитесь, что favicon.svg не попадет в список precache дважды, если он уже скопирован
        // exclude: [/\.map$/, /manifest\.json$/, /favicon\.svg$/],
        navigationPreload: true, // позволяет браузеру одновременно с запуском Service Worker'а начать сетевой запрос для навигации. Это значительно уменьшает задержку, делая навигацию по вашему PWA более быстрой и отзывчивой.
        swDest: 'service-worker.js',// swDest: 'antopaz/service-worker.js', // swDest: 'sw.js', // <<< Файл sw.js будет создан в dist/antopaz/

        runtimeCaching: [
          {
            urlPattern: /\.(?:woff2?|ttf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-resources-cache' },
          },
        ],
      }),

      new WebpackPwaManifest({
        // Обязательные поля вашего манифеста
        name: 'Моя Потрясающая PWA Игра', // Полное название приложения
        short_name: 'PWA Игра', // Короткое название (для ярлыка)
        description: 'Описание вашей онлайн PWA игры.', // Описание  1-2 предложения или примерно до 70-80 символов для краткого представления

        start_url: isProduction ? '/' + repoName + '/' + 'game.html' : '/', // Проверьте этот URL на соответствие вашим нуждам. Это URL, который откроется при запуске с ярлыка (используем repoName извне scope return)
        scope: isProduction ? '/' + repoName + '/' : '/', // Опционально: область действия SW (часто совпадает с publicPath). Для https://axi0man.github.io/antopaz/game.html вид scope: /antopaz/ - правильно!
        // для gitHub pages рукомендуется start_url: ".", scope: ".",

        id: '/' + repoName + '/', // Это установит id, например, в "/antopaz/". publicPath (/antopaz/) является корневым каталогом, контролируемым вашим Service Worker'ом, и часто используется как стабильный идентификатор приложения. start_url же указывает на конкретную страницу для запуска.
        display: 'fullscreen', // Режим отображения ('fullscreen', 'standalone', 'minimal-ui', 'browser')
        background_color: '#212529', // Цвет фона splash screen'а
        theme_color: '#007bff', // Цвет темы (для адресной строки)
        orientation: 'portrait', // Опционально: ориентация экрана        
        destination: '.', // Путь к генерируемому файлу manifest.json относительно output.path (т.е. папки dist) // '.' означает корень папки dist т.е. manifest.json в корне dist
        filename: 'manifest.json',// Имя генерируемого файла

        // --- Иконки ---
        // Плагин прочитает исходные файлы иконок по указанным здесь src путям,
        // сгенерирует нужные размеры, обработает их и включит в сборку с правильными путями.
        icons: [
          {
            src: path.resolve(__dirname, 'public', 'assets', 'icons', 'logo48.png'), // Путь к ИСХОДНОМУ файлу иконки
            sizes: [48, 72, 96, 144, 192, 512, 180], // Какие размеры сгенерировать из исходника
            destination: 'assets/icons/', // Опционально: куда поместить сгенерированные иконки в dist (относительно output.path/destination)
            // publicPath: isProduction ? '/' + repoName + '/' : '/', // Этот publicPath применяется К путям иконок ВНУТРИ manifest.json файла.
            // Если не указан, плагин автоматически возьмет publicPath из output.
            // Явное указание может быть полезно для уточнения, но часто он берет из output сам.
            // Проверим, сработает ли автоматически без явного указания publicPath здесь.
            purpose: 'any', // или 'maskable' для адаптивных иконок
            apple: true, // явно указываем сгенерировать иконку для apple - её размер 180х180
          },
          {
            src: path.resolve(__dirname, 'public', 'assets', 'icons', 'maskable-icon.png'), // Путь к Maskable-иконке 196х196
            sizes: [196],
            destination: path.join('icons'),
            purpose: 'maskable', // <<< Вот это свойство указывает на маскируемый значок
          },
        ],
        //   publicPath для манифеста
        // publicPath: isProduction ? '/' + repoName + '/' : '/', // < --Эту строку нужно удалить или закомментировать на верхнем уровне плагина. Если оставить, то он должен точно совпадать с output.publicPath
        // Другие опции манифеста...
        // theme_color_in_head: false, // Если вы не хотите, чтобы theme-color дублировался в <head> HTML
        // background_color_in_head: false, // Аналогично для background-color
        // fingerprint: true, // Добавить фингерпринты к имени манифеста для кэширования
        // description: null, // Можно установить в null, если поле не нужно
      }),

      // new ImageMinimizerPlugin({ // ЖЕЛАТЕЛЬНО ИСПОЛЬЗОВАТЬ УЖЕ ОПТИМИЗИРОВАННЫЕ РЕСУРСЫ
      //   minimizer: { // ОЧЕНЬ ДОЛГО РАБОТАЕТ И ПРАКТИЧЕСКИ ЗАВИСАЕТ С ФАЙЛАМИ БОЛЕЕ 3 Мбайт
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['jpegtran', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //         ['svgo', { name: 'preset-default' }],
      //       ],
      //     },
      //   },
      // }),

    ] : []), // Этот массив пустой для Dev

    // DefinePlugin - ДОЛЖЕН быть здесь или выше, вне условных блоков Production-only
    // Используем стандартную конфигурацию process.env
    // Создаем глобальную константу PUBLIC_URL, доступную в клиентском JS
    new DefinePlugin({
      'process.env': {
        PUBLIC_URL: JSON.stringify(isProduction ? '/' + repoName + '/' : '/'), // Путь для Production: /antopaz/, для Dev: /
        NODE_ENV: JSON.stringify(argv.mode || 'development'),
      }
    }),

    // Условный BundleAnalyzerPlugin
    ...(shouldAnalyze ? [new BundleAnalyzerPlugin()] : []),

    // Если у вас есть другие плагины, которые должны быть активны в Dev или в обоих режимах, добавьте их здесь.
    // Например, HotModuleReplacementPlugin в Webpack 4 добавлялся бы сюда, в Webpack 5 HMR включается через devServer.hot: true

  ].filter(Boolean); // Фильтруем все значения false из массива

  //   КОНЕЦ: Определения массива плагинов  

  //   Добавляем console.log после определения массива плагинов  
  // console.log('Final Webpack Plugins List:', allPlugins);


  //   НАЧАЛО: Возвращаемый объект конфигурации  
  return {
    mode: isProduction ? 'production' : 'development', // Режим сборки (development или production)
    entry: {
      homePage: './src/pages/HomePage/index.js', // Статическая страница
      gamePage: './src/pages/GamePage/index.js', // SPA/PWA игра
    },
    output: {
      filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js', // Добавляем хеш для production
      path: path.resolve(__dirname, 'dist'), // Путь к папке сборки
      clean: false, // Очисткой занимается FileManagerPlugin
      assetModuleFilename: 'assets/[name][ext][query]', // Настройка именования asset модулей (картинки, шрифты и т.д.). Пример: dist/assets/my-image.png
      publicPath: isProduction ? `/${repoName}/` : 'auto', // Добавляем publicPath для GitHub Pages в Production
    },
    // Правила обработки файлов (Loaders)
    module: {
      rules: [
        // JavaScript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // Дополнительные настройки Babel (например, плагины) могут понадобиться
            },
          },
        },
        // SCSS, CSS
        {
          test: /\.scss$/,
          use: [
            // В Production используем MiniCssExtractPlugin для извлечения CSS в отдельный файл
            // В Development используем style-loader для встраивания CSS в DOM (нужен для HMR)
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader', // Обрабатывает url() и @import
            'sass-loader', // Компилирует SCSS в CSS
          ],
        },
        // Изображения (JPG, PNG, GIF), SVG, Шрифты
        {
          test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|webp|mp4|webm)$/i,
          type: 'asset/resource',
          exclude: [
            /\.svg$/, // Исключаем SVG
            // Исключаем исходный файл PWA иконки из обработки этим лоадером 
            path.resolve(__dirname, 'public', 'assets', 'icons', 'logo48.png'), // 
          ],
          generator: {
            filename: 'assets/[name][ext][query]'
          }
        },
        {
          test: /\.svg$/,
          use: ['raw-loader'],
        },
      ],
    },
    plugins: allPlugins, //  Используем переменную с плагинами здесь 
    optimization: {
      minimize: isProduction, // Включаем минификацию только в production
      minimizer: isProduction ? [
        new TerserPlugin({// Минификатор JavaScript (TerserPlugin используется по умолчанию в W5 prod, но тут явные настройки)
          terserOptions: {
            compress: {
              drop_console: true, // Раскомментируйте, если нужно удалить console.log в production
            },
            format: {
              comments: false, // Удалить все комментарии из JS
            },
          },
          extractComments: false, // Не извлекать комментарии в отдельные файлы
        }),
        // Минификатор CSS (CssMinimizerPlugin с cssnano)
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', {
              discardComments: { removeAll: true }, // Удалить все комментарии из CSS
            }],
          },
        }),
        // Можно добавить другие минификаторы (например, для SVG, если нужно)
      ] : [],
      splitChunks: { chunks: 'all' }, // Настройки разделения кода
    },

    // Настройки для webpack-dev-server (для 'npm run serv')
    devServer: {
      static: path.resolve(__dirname, 'dist'), // Папка для отдачи статики (может быть и '.' если не хотите собирать dev версию в dist)
      compress: true, // Включить сжатие gzip
      port: 9080, // Порт сервера
      open: true, // Открывать браузер при запуске
      hot: true, // Включить Hot Module Replacement (совпадает с плагином)
      historyApiFallback: { index: '/game.html' }, // Настройка для SPA (gamePage): перенаправляет 404 на game.html или index.html
      // Если SPA загружается по другому пути, может понадобиться более сложная конфигурация historyApiFallback
      // liveReload: false // Отключите liveReload, если полагаетесь только на HMR
      headers: { // помогает избежать проблем с кэшированием в браузере. Это может помочь решить проблемы, связанные с тем, что вы видите старую версию страницы после изменений, даже при работающем HMR.
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      watchFiles: !isProduction ? [ // гарантирует, что изменения в важных "не-JS" файлах (как HTML) вызывают обновление. Требует дополнительно следить за изменениями в указанных файлах или папках
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'src', 'pages', 'GamePage', 'index.html'),
        path.resolve(__dirname, 'src', 'pages', 'HomePage', 'index.html'),
      ] : undefined,
      client: { progress: true }, // дает полезную визуальную обратную связь о процессе сборки
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@app': path.resolve(__dirname, 'src', 'app'),
        '@pages': path.resolve(__dirname, 'src', 'pages'),
        '@widgets': path.resolve(__dirname, 'src', 'widgets'),
        '@features': path.resolve(__dirname, 'src', 'features'),
        '@entities': path.resolve(__dirname, 'src', 'entities'),
        '@shared': path.resolve(__dirname, 'src', 'shared'),
      },
    },
    devtool: !isProduction ? 'eval-cheap-source-map' : false,// Настройки Source Maps
    // если нужна более точная карта, то 'eval-source-map' или более медленную но более точную 'source-map'
    performance: {
      // Устанавливаем лимиты в байтах
      maxAssetSize: 500 * 1024, // Пример: увеличить лимит для любого отдельного актива до 500 КБ
      maxEntrypointSize: 1024 * 1024, // Пример: увеличить лимит для точки входа до 1 МБ (1024 * 1024 байт)
      hints: isProduction ? 'warning' : false, // В Production показываем предупреждения, если превышены лимиты; в Dev отключаем
      // hints: false, // Если вы хотите полностью отключить предупреждения, используйте это вместо установки лимитов
      // hints: 'warning', // Оставьте 'warning', чтобы видеть предупреждения только при превышении новых лимитов
    },
  };
};