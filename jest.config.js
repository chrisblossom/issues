/**
 * This file is managed by backtrack
 *
 * source: @backtrack/preset-jest
 * namespace: jest
 *
 * DO NOT MODIFY
 */

'use strict';

/**
 * https://jestjs.io/docs/en/configuration
 */
module.exports = {
    testEnvironment: 'node',
    collectCoverage: false,
    coveragePathIgnorePatterns: [
        '<rootDir>/(.*/?)__sandbox__',
        '<rootDir>/jest.*.(js|ts|mjs)',
    ],
    testPathIgnorePatterns: ['<rootDir>/(.*/?)__sandbox__'],
    snapshotSerializers: [],

    /**
     * Automatically reset mock state between every test.
     * Equivalent to calling jest.resetAllMocks() between each test.
     *
     * Sane default with resetModules: true because mocks need to be inside beforeEach
     * for them to work correctly
     *
     * https://jestjs.io/docs/en/configuration#resetmocks-boolean
     */
    resetMocks: true,

    /**
     *  The module registry for every test file will be reset before running each individual test.
     *  This is useful to isolate modules for every test so that local module state doesn't conflict between tests.
     *
     *  https://jestjs.io/docs/en/configuration#resetmodules-boolean
     */
    resetModules: true,

    /**
     * Equivalent to calling jest.restoreAllMocks() between each test.
     *
     * Resets jest.spyOn mocks only
     *
     * https://jestjs.io/docs/en/configuration#restoremocks-boolean
     */
    restoreMocks: true,
};
