import path from 'path';
import { getCwd } from './example';

const getCwdDynamic = () => require('./example').getCwd();

const realCwd = process.cwd();
const fakeCwd = path.resolve('src');

beforeEach(() => {
	process.chdir(fakeCwd);
});

afterEach(() => {
	process.chdir(realCwd);
});

describe('require reset', () => {
	test('static require', () => {
		const cwd = getCwd();
		expect(cwd).toEqual(fakeCwd);
	})

	// works as expected
	test('dynamic require', () => {
		const cwd = getCwdDynamic();
		expect(cwd).toEqual(fakeCwd);
	});
});
