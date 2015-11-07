/// <reference path="../../typings/node/node" />
/// <reference path="StringReader" />

var fs = require("fs");

module Magic.IO {
	export class FileReader extends StringReader {
		constructor(path: string) {
			super(fs.readFileSync(path, "utf-8"), path)
		}
	}
}
