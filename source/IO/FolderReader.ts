/// <reference path="../../typings/node/node" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="Reader" />

var fs = require("fs");

module Magic.IO {
	export class FolderReader implements Reader {
		private files: string[]
		private current: Reader
		constructor(private path: string, pattern: string) {
			this.files = FolderReader.getFiles(this.path, pattern)
		}
		isEmpty(): boolean {
			return this.files.length == 0 && (!this.current || this.current.isEmpty())
		}
		read(): string {
			var result: string = null
			if (!this.current && this.files.length > 0) {
				this.current = new FileReader(this.files.shift())
			}
			if (this.current) {
				result = this.current.read()
				if (result && this.files.length > 0) {
					this.current = null
					result = "\0"
				}
			}
			return result
		}
		getResource(): string { return this.current ? this.current.getResource() : null }
		getLocation(): Error.Location { return this.current.getLocation() }
		getRegion(): Error.Region { return this.current.getRegion() }
		mark(): Error.Region { return this.current.mark() }

		private static getFiles(folder: string, filetype: string, ignoreFiles: string[] = []): string[] {
			var result: string[] = []
			var files: string[] = fs.readdirSync(folder)
			var filename = ""
			files.forEach(file => {
				filename = folder + "/" + file
				if (ignoreFiles.indexOf(filename) == -1) {
					if (fs.lstatSync(filename).isDirectory()) {
						result = result.concat(FolderReader.getFiles(filename, filetype, ignoreFiles))
					} else if (file.length > filetype.length && file.lastIndexOf(filetype, file.length - filetype.length) === file.length - filetype.length) {
						result.push(filename)
					}
				}
			})
			return result
		}
	}
}
