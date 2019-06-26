import fs from 'fs';
import os from 'os';
import path from 'path';
import { sync as makeDirSync } from 'make-dir';
import { sync as delSync } from 'del';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { waitForMs } from './wait-for-ms';
import { renameFilesToTypescript as renameFilesToTypescriptActual } from './jest-issue-8611';

const osTempDir = os.tmpdir();

// eslint-disable-next-line @typescript-eslint/promise-function-async
const renameFilesToTypescript: typeof renameFilesToTypescriptActual = (
    ...params
) => require('./jest-issue-8611').renameFilesToTypescript(...params);

/**
 * NOTE: all checks, setup, and teardown is sync
 */

const processCwd = process.cwd();
const fakeCwd = path.resolve(osTempDir, '_jest-issue-');
beforeEach(() => {
    makeDirSync(fakeCwd);

    process.chdir(fakeCwd);

    delSync(['**/*'], {
        cwd: fakeCwd,
        dot: true,
    });

    fs.writeFileSync('base1.js', 'module.exports = "base1.js"');
    fs.writeFileSync('already-exists.js', 'module.exports = "was javascript"');
    fs.writeFileSync('already-exists.ts', 'module.exports = "typescript"');
});

afterEach(() => {
    process.chdir(processCwd);
});

afterAll(() => {
    // delSync(['**/*'], {
    //     cwd: fakeCwd,
    //     dot: true,
    // });
});

test('should throw', async () => {
    await expect(renameFilesToTypescript({ overwrite: false })).rejects.toThrow(
        'already-exists.js -> already-exists.ts: file already exists',
    );

    // artificial wait here will solve the issue
    // await waitForMs(1000);

    const files = fs.readdirSync(process.cwd());
    expect(files).toEqual([
        'already-exists.js',
        'already-exists.ts',
        'base1.js', // should actually be .ts
    ]);

    // should actually be .ts
    const base1FilePath = path.resolve('base1.js');
    expect(require(base1FilePath)).toEqual('base1.js');

    const alreadyExistsJsFilePath = path.resolve('already-exists.js');
    expect(require(alreadyExistsJsFilePath)).toEqual('was javascript');

    const alreadyExistsTsFilePath = path.resolve('already-exists.ts');
    expect(require(alreadyExistsTsFilePath)).toEqual('typescript');
});

test('should copy', async () => {
    const result = await renameFilesToTypescript({ overwrite: true });

    expect(result).toEqual({
        'base1.js': 'base1.ts',
        'already-exists.js': 'already-exists.ts',
        'already-exists.ts': 'already-exists.ts',
    });

    const files = fs.readdirSync(process.cwd());
    expect(files).toEqual(['already-exists.ts', 'base1.ts']);

    const base1FilePath = path.resolve('base1.ts');
    expect(require(base1FilePath)).toEqual('base1.js');

    const alreadyExistsTsFilePath = path.resolve('already-exists.ts');
    expect(require(alreadyExistsTsFilePath)).toEqual('was javascript');
});
