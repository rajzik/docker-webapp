
const eslintrc = require('../../.eslintrc');

const rules = {
    ...eslintrc.rules, ...{
        'import/no-unresolved': 'error',
        'import/extensions': 'error',
        'no-plusplus': 'warn',
        'no-console': 'error',
    }
};

// We don't need extra rules right now
module.exports = Object.assign({}, eslintrc, {
    rules,
});
