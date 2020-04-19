module.exports = {
    root: true,

    env: {
        es6: true,
        node: true,
        commonjs: false,
    },

    parserOptions: {
        ecmaVersion: 9,
        // sourceType: 'module'
    },

    extends: [
        'eslint:recommended',
    ],

    rules: {
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'no-unused-vars': ['error', {
            'vars': 'all',
            'args': 'after-used',
            'argsIgnorePattern': '^_',
            'ignoreRestSiblings': true
        }]
    },
};
