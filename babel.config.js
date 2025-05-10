module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            '>= 0.5%', // процент охвата браузера
            'since 2012', // поддержка для старых браузеров 
            'not dead', // которые ещё используются
          ],
        },
        useBuiltIns: 'usage', // Включаем интеллектуальные полифилы
        corejs: 3, // Указываем версию core-js
        modules: false, // Важно для tree shaking с Webpack
      },
    ],
  ],
  plugins: [
    // Дополнительные плагины могут быть здесь
  ],
};