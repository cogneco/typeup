import * as Error from "../U10sil/source/Error"
import * as IO from "../U10sil/source/IO"

export class CommentStripper extends IO.Reader {
	private backend: IO.BufferedReader
	private last: string
	constructor(backend: IO.Reader) {
		super()
		this.backend = backend instanceof IO.BufferedReader ? <IO.BufferedReader>backend : new IO.BufferedReader(backend)
	}
	isEmpty(): boolean {
		return this.backend.isEmpty()
	}
	read(): string {
		switch(this.backend.peek(2)) {
			case "//":
				if (this.last != ":")
					while (this.backend.peek() != "\n")
						this.backend.read()
				break
			case "/*":
				while (this.backend.peek(2) != "*/")
					this.backend.read()
				this.backend.read(2)
				break
		}
		return this.last = this.backend.read()
	}
	getResource(): string {
		return this.backend.getResource()
	}
	getLocation(): Error.Location {
		return this.backend.getLocation()
	}
	getRegion(): Error.Region {
		return this.backend.getRegion()
	}
	mark(): Error.Region {
		return this.backend.mark()
	}
}
