/// <reference path="../typings/node/node" />
/// <reference path="U10sil/Error/ConsoleHandler" />
/// <reference path="U10sil/IO/Reader" />
/// <reference path="U10sil/IO/FileReader" />
/// <reference path="U10sil/IO/FolderReader" />
/// <reference path="Writeup/Document" />
/// <reference path="U10sil/Test" />

var fs = require("fs")

module Cogneco {
	export class Program {
		private defaultCommand = "html"
		constructor(private commands: string[]) {
			this.commands = this.commands.slice(2)
			if (this.commands.length == 0) {
				this.commands.push(this.defaultCommand)
				this.commands.push(".")
			}
		}
		private runHelper(command: string, commands: string[]) {
			var handler = new U10sil.Error.ConsoleHandler()
			switch (command) {
				case "json": console.log(Writeup.Document.open(this.commands.shift(), handler).toJson("  ")); break
				case "html": console.log(Writeup.Document.open(this.commands.shift(), handler).render()); break
				case "writeup": console.log(Writeup.Document.open(this.commands.shift(), handler).toString()); break
				case "self-test": U10sil.Unit.Fixture.run(true); break
				case "version": console.log("writeup " + this.getVersion()); break
				case "help": console.log("help"); break
				default:
					commands.push(command)
					command = undefined
					this.runHelper(this.defaultCommand, commands)
					break
			}
			if (command)
				this.defaultCommand = command
		}
		run() {
			var command: string
			while (command = this.commands.shift())
				this.runHelper(command, this.commands)
		}
		getVersion(): string {
			return "0.1"
		}
	}
}
new Cogneco.Program(process.argv).run()
