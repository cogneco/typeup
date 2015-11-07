/// <reference path="Type" />
/// <reference path="Level" />

module Magic.Error {
	export class Message {
		constructor(private description: string, private level: Level, private type: Type, private region: Region) {
		}
		toString(): string {
			return this.level + ": " + this.type + " Error. " + this.description + " @ " + this.region.toString();
		}
	}
}
