import { Error, IO, Uri } from "@cogneco/mend"

export class CommentStripper extends IO.Reader {
	private backend: IO.BufferedReader
	private last: string | undefined
	get readable(): boolean { return this.backend.readable }
	get opened(): boolean { return this.backend.opened }
	get isEmpty(): Promise<boolean> {
		return this.backend.isEmpty
	}
	get resource(): Uri.Locator {
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
	read(): string | undefined {
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
	close(): Promise<boolean> {
		return this.backend.close()
	}
}
