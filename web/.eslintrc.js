const path = require('path');

module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'plugin:flowtype/recommended',
        'plugin:jest/recommended'
    ],
    plugins: [
        'jest',
        'flowtype'
    ],
    env: {
        'amd': true,
        'node': true,
        'jest': true,
        'es6': true,
        'worker': true,
        browser: true,
        serviceworker: true,
    },
    settings: {
        'import/resolver': {
            "babel-module": {}
        },
    },
    'rules': {
        'indent': [
            2,
            4
        ],
        'react/jsx-indent-props': [
            2,
            4
        ],
        'react/jsx-indent': [
            2,
            4
        ],
        'import/no-unresolved': 'warn',
        'import/extensions': 'warn',
        'no-plusplus': 'warn',
        'no-console': 'warn',
        'valid-jsdoc': 'error',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                'components': [
                    'Link'
                ],
                'specialLink': [
                    'hrefLeft',
                    'hrefRight',
                    'to'
                ],
                'aspects': [
                    'noHref',
                    'invalidHref',
                    'preferButton'
                ]
            }
        ]
    }
};
