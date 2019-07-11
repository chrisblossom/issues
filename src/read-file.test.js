import path from 'path';
import fs from 'fs';
import { readFileManual, readFilePromisify } from './read-file';

const readFileManualDynamic = () => require('./read-file').readFileManual();
const readFilePromisifyDynamic = () =>
	require('./read-file').readFilePromisify();

let readFileSpy;
beforeEach(() => {
	readFileSpy = jest.spyOn(fs, 'readFile');
});

afterEach(() => {
	// FYI: needing this reset is a bug
	// jest.config.js has restoreMocks: true
	// https://github.com/facebook/jest/issues/6059
	jest.restoreAllMocks();
});

function getReadFileCalls() {
	const normalizedCalls = readFileSpy.mock.calls.map(([absolutePath, string]) => {
		const relativePath = path.relative(process.cwd(), absolutePath);
		return [relativePath, string];
	});

	return normalizedCalls;
}

describe.each`
	readFileFn
	${readFileManual}
	${readFileManualDynamic}
	${readFilePromisify}
	${readFilePromisifyDynamic}
`('$readFileFn.name', ({ readFileFn }) => {
	test('first run', async () => {
		await readFileFn();

		const readFileCalls = getReadFileCalls();
		expect(readFileCalls).toEqual([['src/dummy-file.js', 'utf8']]);
	});

	test('second run', async () => {
		await readFileFn();

		const readFileCalls = getReadFileCalls();
		expect(readFileCalls).toEqual([['src/dummy-file.js', 'utf8']]);
	});
});
