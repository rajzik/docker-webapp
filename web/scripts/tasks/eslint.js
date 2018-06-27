
const runESLint = require('../eslint');


console.log('Linting all files...');


if (runESLint()) {
    console.log('Lint passed.');
} else {
    console.log('Lint failed.');
    process.exit(1);
}
