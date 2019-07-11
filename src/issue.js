'use strict';

const fs = require('fs');

function readFile(file) {
	const result = fs.readFileSync(file, 'utf8');

	return result;
}

module.exports = readFile;
