/* eslint strict:off, global-require:off */

'use strict';

module.exports = (wallaby) => {
	return {
		files: [
			{
				pattern: 'src/**/__sandbox__/**/*',
				instrument: false,
			},
			'src/**/*.js',
			'jest.config.js',
			'.env',
			'src/**/*.snap',
			'!src/**/*.test.js',
		],

		tests: ['src/**/*.test.js'],

		env: {
			type: 'node',
			runner: 'node',
		},

		testFramework: 'jest',

		setup: (w) => {
			/**
			 * https://github.com/wallabyjs/public/issues/1268#issuecomment-323237993
			 */
			if (w.projectCacheDir !== process.cwd()) {
				process.chdir(w.projectCacheDir);
			}

			process.env.NODE_ENV = 'test';
			const jestConfig = require('./jest.config');
			w.testFramework.configure(jestConfig);
		},
	};
};
