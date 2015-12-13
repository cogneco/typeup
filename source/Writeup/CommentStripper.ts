/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />
/// <reference path="../IO/Reader" />
/// <reference path="../IO/BufferedReader" />

module Cogneco.Writeup {
	export class CommentStripper extends IO.Reader {
		private backend: IO.BufferedReader
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
					while (this.backend.peek() != "\n")
						this.backend.read()
					break
				case "/*":
					while (this.backend.peek(2) != "*/")
						this.backend.read()
					this.backend.read(2)
					break
			}
			return this.backend.read()
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
}
