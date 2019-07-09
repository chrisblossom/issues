import fs from 'fs';
import path from 'path';
import { readDummyFile } from './example';

const readDummyFileDynamic = () => require('./example').readDummyFile();

function actuallyReadDummyFile() {
	const pathname = path.resolve(__dirname, 'dummy-file.js');
	const contents = fs.readFileSync(pathname, 'utf8');

	return contents.trim();
}

jest.mock('fs', () => {
	return {
		readFileSync: () => 'mocked',
	};
});

describe('jest.mock', () => {
	test('static require', () => {
		const contents = readDummyFile();
		expect(contents).toEqual('mocked');

		const actualContents = actuallyReadDummyFile();
		expect(actualContents).toEqual('// dummy-file.js');
	});

	// cannot get jest.mock to work because of hoisting
	test('dynamic require', () => {
		const contents = readDummyFileDynamic();
		expect(contents).toEqual('mocked');

		const actualContents = actuallyReadDummyFile();
		expect(actualContents).toEqual('// dummy-file.js');
	});
});
