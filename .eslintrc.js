module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: false,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'prettier', // Prettier все равно оставляем, если используем его
    ],
    plugins: [
        // Плагины удалены
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'warn',
        'no-shadow': 'warn',
        'no-undef': 'error',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // Правила, специфичные для удаленных плагинов, также удалены
    },
    settings: {
        // Настройки, специфичные для удаленных плагинов, также удалены
    },
};

