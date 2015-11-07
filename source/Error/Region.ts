/// <reference path="Position" />
/// <reference path="Location" />

module Magic.Error {
	export class Region {
		constructor(private resource: string, private start: Position, private end: Position, private content: string) { }
		getResource() { return this.resource }
		getStart() { return this.start }
		getEnd() { return this.end }
		getContent() { return this.content; }
		toString() {
			return this.resource + " (" + this.start.toString() + " - " + this.end.toString() + ") " + this.content
		}
	}
}
