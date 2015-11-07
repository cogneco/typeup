/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />
/// <reference path="Reader" />

module Magic.IO {
	export class BufferedReader implements Reader {
		buffer: string = ""
		private line: number = 1
		private column: number = 1
		private lastMark: Error.Position
		private lastContent: string = ""
		constructor(private backend: Reader) {
			this.lastMark = new Error.Position(1, 1)
		}
		isEmpty(): boolean {
			return this.buffer.length == 0 && this.backend.isEmpty()
		}
		peek(length: number = 1): string {
			var next: string = null
			while (length > this.buffer.length && (next = this.backend.read())) {
				this.buffer += next
			}
			return length > this.buffer.length ? "\0" : this.buffer.substring(0, length)
		}
		read(length: number = 1): string {
			var result = this.peek(length)
			if (this.buffer.length > 0)
				this.buffer = this.buffer.substring(length)
			for (var i = 0; i < result.length; i++) {
				switch (result.charAt(i)) {
					case "\0":
						this.column = 1
						this.line = 1
						break
					case "\n":
						this.column = 1
						this.line++
						break
					default:
						this.column++
						break
				}
			}
			this.lastContent += result
			return result
		}
		getResource(): string { return this.backend.getResource() }
		getLocation(): Error.Location { return new Error.Location(this.getResource(), this.line, this.column) }
		getRegion(): Error.Region { return new Error.Region(this.getResource(), this.lastMark, new Error.Position(this.line, this.column), this.lastContent) }
		mark(): Error.Region {
			var result = this.getRegion()
			this.lastMark = new Error.Position(this.line, this.column)
			this.lastContent = ""
			return result
		}
	}
}
