module Magic.Error {
	export class Position {
		constructor(private line: number, private column: number) { }
		getLine() { return this.line }
		getColumn() { return this.column }
		toString() {
			return "Ln " + this.line + ", Col " + this.column
		}
	}
}
