/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="../Error/Handler" />
/// <reference path="CommentStripper" />


module Cogneco.Writeup {
	export class Source extends IO.BufferedReader implements Error.Handler {
		constructor(reader: IO.Reader, private errorHandler: Error.Handler) {
			super(new CommentStripper(reader))
		}
		raise(message: string | Error.Message, level = Error.Level.Critical, type = Error.Type.Lexical, region?: Error.Region): void {
			if (!(message instanceof Error.Message)) {
				if (!region)
					region = this.getRegion()
				message = new Error.Message(<string>message, level, type, region)
			}
			this.errorHandler.raise(<Error.Message>message)
		}
	}
}
