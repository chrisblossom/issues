/**
 * This file is managed by backtrack
 *
 * source: @backtrack/preset-git-hooks
 * namespace: husky
 *
 * DO NOT MODIFY
 */
'use strict';

module.exports = {
    hooks: {
        'pre-commit': 'npm run git-pre-commit',
        'pre-push': 'npm run git-pre-push',
    },
};
