/// <reference path="../U10sil/Error/Location" />
/// <reference path="../U10sil/Error/Region" />
/// <reference path="../U10sil/IO/Reader" />
/// <reference path="../U10sil/IO/BufferedReader" />

module Cogneco.Typeup {
	export class CommentStripper extends U10sil.IO.Reader {
		private backend: U10sil.IO.BufferedReader
		constructor(backend: U10sil.IO.Reader) {
			super()
			this.backend = backend instanceof U10sil.IO.BufferedReader ? <U10sil.IO.BufferedReader>backend : new U10sil.IO.BufferedReader(backend)
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
		getLocation(): U10sil.Error.Location {
			return this.backend.getLocation()
		}
		getRegion(): U10sil.Error.Region {
			return this.backend.getRegion()
		}
		mark(): U10sil.Error.Region {
			return this.backend.mark()
		}
	}
}
