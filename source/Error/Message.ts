/// <reference path="Type" />
/// <reference path="Level" />

module Cogneco.Error {
	export class Message {
		constructor(private description: string, private level: Level, private type: Type, private region: Region) {
		}
		toString(): string {
			return this.level.toString() + ": " + this.type.toString() + " Error. " + this.description + " @ " + this.region.toString();
		}
	}
}
