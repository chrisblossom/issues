'use strict';

module.exports = {
    presets: [['@backtrack/node', { mode: 'app', syntax: 'node' }]],

    files: {
        skip: ['.circleci/config.yml'],
        allowChanges: true,
    },
};
