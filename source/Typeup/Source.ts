/// <reference path="../U10sil/Error/Region" />
/// <reference path="../U10sil/IO/BufferedReader" />
/// <reference path="../U10sil/Error/Handler" />
/// <reference path="CommentStripper" />

module Cogneco.Typeup {
	export class Source extends U10sil.IO.BufferedReader implements U10sil.Error.Handler {
		constructor(reader: U10sil.IO.Reader, private errorHandler: U10sil.Error.Handler) {
			super(new CommentStripper(reader))
		}
		raise(message: string | U10sil.Error.Message, level = U10sil.Error.Level.Critical, type = U10sil.Error.Type.Lexical, region?: U10sil.Error.Region): void {
			if (!(message instanceof U10sil.Error.Message)) {
				if (!region)
					region = this.getRegion()
				message = new U10sil.Error.Message(<string>message, level, type, region)
			}
			this.errorHandler.raise(<U10sil.Error.Message>message)
		}
	}
}
