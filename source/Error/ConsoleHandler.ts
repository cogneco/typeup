/// <reference path="Level" />
/// <reference path="Type" />
/// <reference path="Region" />
/// <reference path="Message" />
/// <reference path="Handler" />

module Magic.Error {
	export class ConsoleHandler implements Handler {
		raise(message: string | Message, level?: Level, type?: Type, region?: Region): void {
			if (message instanceof String) {
				message = new Message(<string>message, level, type, region)
			}
			console.log(message.toString())
		}
	}
}
