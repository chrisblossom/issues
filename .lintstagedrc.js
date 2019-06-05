/**
 * This file is managed by backtrack
 *
 * source: @backtrack/preset-style
 * namespace: lintStaged
 *
 * DO NOT MODIFY
 */

'use strict';

module.exports = {
    '*.{js,jsx,ts,tsx,mjs,json,scss,less,css,md,yml,yaml}': [
        'prettier --write',
        'git add',
    ],
};
