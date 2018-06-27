const runFlow = require('../flow/runFlow');

process.on('unhandledRejection', (err) => {
    throw err;
});


runFlow(['status']);
