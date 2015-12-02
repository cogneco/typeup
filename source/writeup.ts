/// <reference path="../typings/node/node" />
/// <reference path="Error/ConsoleHandler" />
/// <reference path="IO/Reader" />
/// <reference path="IO/FileReader" />
/// <reference path="IO/FolderReader" />
/// <reference path="Unit/Fixture" />
/// <reference path="Writeup/Document" />

var fs = require("fs")

module Cogneco {
	export class Program {
		private defaultCommand = "compile"
		constructor(private commands: string[]) {
			this.commands = this.commands.slice(2)
			if (this.commands.length == 0) {
				this.commands.push(this.defaultCommand)
				this.commands.push(".")
			}
		}
		private runHelper(command: string, commands: string[]) {
			var handler = new Error.ConsoleHandler()
			switch (command) {
				case "compile":
					console.log("compile")
					var document = Writeup.Document.open(this.commands.shift(), handler)
					console.log(document.toHtml())
				case "verify":
					console.log("verify")
					var document = Writeup.Document.open(this.commands.shift(), handler)
					console.log(JSON.stringify(document, (key, value) => key != "region" ? value : undefined, "\t"))
					break
				case "self-test":
					Unit.Fixture.run()
					break
				case "version":
					console.log("writeup " + this.getVersion())
					break
				case "help":
					console.log("help")
					break
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
			while (command = this.commands.shift()) {
				this.runHelper(command, this.commands)
			}
		}
		getVersion(): string {
			return "0.1"
		}
	}
}

try {
	var magic = new Cogneco.Program(process.argv)
	magic.run()
	console.log("writeup " + magic.getVersion())
} catch (Error) {
	console.log(Error.toString())
}
