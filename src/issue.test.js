'use strict';

const fs = require('fs');
const path = require('path');
const readFile = require('./issue');

/**
 * remove any blank space after running jest --watch and test will fail
 */

let readFileSpy = jest.spyOn(fs, 'readFileSync');
beforeEach(() => {
	jest.restoreAllMocks();

	readFileSpy = jest.spyOn(fs, 'readFileSync');
});

afterEach(() => {
	// uncommenting will fix issue
	// jest.restoreAllMocks();
});

function getReadFileCalls() {
	const normalizedCalls = readFileSpy.mock.calls.map(
		([absolutePath, string]) => {
			const relativePath = path.relative(__dirname, absolutePath);
			return [relativePath, string];
		},
	);

	return normalizedCalls;
}

describe.each`
	file
	${'files/one.js'}
	${'files/two.js'}
	${'files/three.js'}
`('$file', ({ file }) => {
	test('first run', async () => {
		const resolvedFile = path.resolve(__dirname, file);
		readFile(resolvedFile);

		const readFileCalls = getReadFileCalls();
		expect(readFileCalls).toEqual([[file, 'utf8']]);
	});

	test('second run', () => {
		const resolvedFile = path.resolve(__dirname, file);
		readFile(resolvedFile);

		const readFileCalls = getReadFileCalls();
		expect(readFileCalls).toEqual([[file, 'utf8']]);
	});
});
