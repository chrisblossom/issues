'use strict';

module.exports = {
    presets: [['@backtrack/node', { mode: 'module', syntax: 'typescript' }]],

    packageJson: {
        private: true,
    },

    'git-pre-push': [false, () => {}],

    files: { allowChanges: true },
};
