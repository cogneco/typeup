/// <reference path="Position" />

module Magic.Error {
	export class Location extends Position {
		getResource(): string { return this.resource }
		constructor(private resource: string, line: number, column: number) {
			super(line, column)
		}
		toString() {
			return this.resource + " @ " + super.toString()
		}
	}
}
