/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="../Error/Handler" />

module Cogneco.Unit {
	export class ErrorHandler implements Error.Handler {
		constructor(private errorHandler: Error.Handler, private region: Error.Region) {
		}
		raise(message: string | Error.Message, level = Error.Level.Recoverable, type = Error.Type.SelfTest, region?: Error.Region): void {
			if (!(message instanceof Error.Message)) {
				if (!region)
					region = this.region
				message = new Error.Message(<string>message, level, type, region)
			}
			this.errorHandler.raise(<Error.Message>message)
		}
	}
}
