/// <reference path="../../typings/node/node" />
/// <reference path="../Error/Position" />
/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />
/// <reference path="../Error/Level" />
/// <reference path="../Error/Type" />
/// <reference path="Reader" />

var fs = require("fs");

module Magic.IO {
	export class StringReader implements Reader {
		private count: number = 0
		private line: number = 1
		private column: number = 1
		private lastPosition: Error.Position
		private lastContent: string = ""
		constructor(private content: string, private path: string = "") {
			this.lastPosition = new Error.Position(1, 1)
		}
		isEmpty(): boolean {
			return this.count >= this.content.length
		}
		read(): string {
			var result: string
			if (this.count < this.content.length)
				result = this.content.charAt(this.count)
			else if (this.count == this.content.length)
				result = "\0"
			this.count++
			if (result) {
				if (result == "\n") {
					this.line++
					this.column = 1
				} else
					this.column++
				this.lastContent += result
			}
			return result
		}
		getResource(): string { return this.path }
		getLocation(): Error.Location { return new Error.Location(this.path, this.line, this.column) }
		getRegion(): Error.Region { return new Error.Region(this.path, this.lastPosition, new Error.Position(this.line, this.column), this.lastContent) }
		mark(): Error.Region {
			var result = this.getRegion()
			this.lastPosition = new Error.Position(this.line, this.column)
			this.lastContent = ""
			return result
		}
	}
}
