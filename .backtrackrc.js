'use strict';

module.exports = {
    presets: [['@backtrack/node', { mode: 'app', syntax: 'node' }]],

    files: {
        allowChanges: ['wallaby.config.js', '.prettierignore'],
    },
};
