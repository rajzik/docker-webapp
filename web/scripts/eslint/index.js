
const CLIEngine = require('eslint').CLIEngine;

const allPaths = ['**/*.js', '**/*.jsx'];


function runESLintOnFilesWithOptions(filePatterns, options) {
    const cli = new CLIEngine(options);
    const formatter = cli.getFormatter();


    const report = cli.executeOnFiles(allPaths);

    // When using `ignorePattern`, eslint will show `File ignored...` warnings for any ignores.
    // We don't care because we *expect* some passed files will be ignores if `ignorePattern` is used.
    const messages = report.results.filter((item) => {
        const ignoreMessage =
      'File ignored because of a matching ignore pattern. Use "--no-ignore" to override.';
        return !(item.messages[0] && item.messages[0].message === ignoreMessage);
    });

    const ignoredMessageCount = report.results.length - messages.length;
    return {
        output: formatter(messages),
        errorCount: report.errorCount,
        warningCount: report.warningCount - ignoredMessageCount,
    };
}


function runESLint() {
    let errorCount = 0;
    let warningCount = 0;
    let output = '';
    [
        runESLintOnFilesWithOptions(allPaths, {
            configFile: `${__dirname}/eslintrc.default.js`,
        })
    ].forEach((result) => {
        errorCount += result.errorCount;
        warningCount += result.warningCount;
        output += result.output;
    });
    console.log(output);
    return errorCount === 0 && warningCount === 0;
}

module.exports = runESLint;
