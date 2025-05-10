module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'indentation': 2,
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
      {
        message: 'Имена классов должны соответствовать BEM (lower-case латиница, цифры, "-", "__элемент", "--модификатор")',
      },
    ],
    'selector-id-pattern': '^[a-z]([a-z0-9-]+)?$',
    'selector-max-id': 0,
    'selector-max-type': [2, { ignore: ['/^[a-z]+$/'] }], // Ограничиваем количество type-селекторов (можно настроить)
    'selector-no-qualifying-type': [true, { ignore: ['attribute', 'class'] }],
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-empty-line-before': 'never',
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/dollar-variable-pattern': '^[_a-z][\\w-]*$',
    'scss/at-rule-no-unknown': null, // Разрешаем специфичные SCSS директивы (@mixin, @include и т.д.)
    'scss/selector-no-redundant-nesting': true,
  },
  ignoreFiles: ['node_modules/**', 'build/**'],
};