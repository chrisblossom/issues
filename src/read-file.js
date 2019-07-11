import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const fsReadFileAsync = promisify(fs.readFile);

const pathname = path.resolve(__dirname, 'dummy-file.js');

async function readFileManual() {
	let content = await new Promise((resolve, reject) => {
		fs.readFile(pathname, 'utf8', (error, result) => {
			if (error) {
				reject(error);

				return;
			}

			resolve(result);
		});
	});

	content = content.trim();

	if (content !== '// dummy-file.js') {
		throw new Error(`bad content, ${content}`)
	}

	return content;
}

async function readFilePromisify() {
	let content = await fsReadFileAsync(pathname, 'utf8');

	content = content.trim();

	if (content !== '// dummy-file.js') {
		throw new Error(`bad content, ${content}`)
	}

	return content;
}

export { readFilePromisify, readFileManual };
