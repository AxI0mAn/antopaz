module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 2,
      browsers: 'since 2012',
      autoprefixer: { flexbox: 'no-2009' },
      features: {
        'nesting-rules': true,
      },
    }),
    // Включаем cssnano только для production сборки
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')({ preset: 'default' })] : []),
  ],
};