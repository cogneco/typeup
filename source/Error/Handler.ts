/// <reference path="Level" />
/// <reference path="Type" />
/// <reference path="Region" />
/// <reference path="Message" />

module Magic.Error {
	export interface Handler {
		raise: {
			(message: Message): void
			(message: string, level?: Level, type?: Type, region?: Region): void
		}
	}
}
