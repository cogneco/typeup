/// <reference path="Position" />
/// <reference path="Location" />

module Cogneco.Error {
	export class Region {
		constructor(private resource: string, private start?: Position, private end?: Position, private content?: string) { }
		getResource() { return this.resource }
		getStart() { return this.start }
		getEnd() { return this.end }
		getContent() { return this.content; }
		merge(other: Region) { return new Region(this.resource, this.start, other.end, this.content + other.content) }
		toString() {
			var result = this.resource
			if (this.start && this.end)
				result += " (" + this.start.toString() + " - " + this.end.toString() + ") "
			if (this.content)
				result += this.content
			return result
		}
	}
}
