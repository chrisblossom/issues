import fs from 'fs';
import path from 'path';

function readDummyFile() {
	const pathname = path.resolve(__dirname, 'dummy-file.js');
	const contents = fs.readFileSync(pathname, 'utf8');

	return contents.trim();
}

const cwd = process.cwd();
function getCwd() {
	return cwd;
}

export { getCwd, readDummyFile };
