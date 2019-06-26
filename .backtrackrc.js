'use strict';

module.exports = {
    presets: [['@backtrack/node', { mode: 'module', syntax: 'typescript' }]],

    packageJson: {
        private: true,
    },

    'git-pre-push': [false, () => {}],

    files: { allowChanges: true },

    config: {
        eslint: () => {
            return {
                parser: '@typescript-eslint/parser',
                parserOptions: {
                    ecmaVersion: 2019,
                    sourceType: 'module',
                    ecmaFeatures: {
                        jsx: false,
                    },
                },
            };
        },
    },
};
