import { Error, IO } from "@cogneco/mend"

export class CommentStripper extends IO.Reader {
	private backend: IO.BufferedReader
	private last: string
	get isEmpty(): boolean {
		return this.backend.isEmpty
	}
	get resource(): string {
		return this.backend.resource
	}
	get location(): Error.Location {
		return this.backend.location
	}
	get region(): Error.Region {
		return this.backend.region
	}
	constructor(backend: IO.Reader) {
		super()
		this.backend = backend instanceof IO.BufferedReader ? backend as IO.BufferedReader : IO.BufferedReader.create(backend)
	}
	read(): string {
		switch (this.backend.peek(2)) {
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
	mark(): Error.Region {
		return this.backend.mark()
	}
}
