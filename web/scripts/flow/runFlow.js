
const chalk = require('chalk');
const spawn = require('child_process').spawn;


async function runFlow(args) {
    return new Promise((resolve) => {
        console.log('Running Flow...');
        let cmd = `${__dirname}/../../node_modules/.bin/flow`;
        if (process.platform === 'win32') {
            cmd = `${cmd.replace(/\//g, '\\')}.cmd`;
        }
        spawn(cmd, args, {
            // Allow colors to pass through:
            stdio: 'inherit',
        }).on('close', (code) => {
            if (code !== 0) {
                console.error('Flow failed');
                process.exit(code);
            } else {
                console.log('Flow passed');
                resolve();
            }
        });
    });
}

module.exports = runFlow;
