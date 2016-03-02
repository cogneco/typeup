/// <reference path="../typings/main" />
/// <reference path="U10sil/Error/ConsoleHandler" />
/// <reference path="U10sil/IO/Reader" />
/// <reference path="U10sil/IO/FileReader" />
/// <reference path="U10sil/IO/FolderReader" />
/// <reference path="Typeup/Document" />
/// <reference path="U10sil/Test" />

var fs = require("fs")
var cp = require("child_process")

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
		private open(path: string): Typeup.Document {
			return Typeup.Document.open(path, new U10sil.Error.ConsoleHandler())
		}
		private runHelper(command: string, commands: string[]) {
			switch (command) {
				case "json": console.log(this.open(this.commands.shift()).toJson("  ")); break
				case "html":
					var document = this.open(this.commands.shift())
					fs.writeFileSync(document.getRegion().getResource().replace(/\.tup$/, ".html"), document.render())
					break
				case "pdf":
					var document = this.open(this.commands.shift())
					fs.writeFileSync(document.getRegion().getResource().replace(/\.tup$/, ".pdf"), cp.execFileSync("prince", ["-", "-o", "-"], { input: document.render() }))
					break;
				case "typeup": console.log(this.open(this.commands.shift()).toString()); break
				case "self-test": U10sil.Unit.Fixture.run(true); break
				case "version": console.log("typeup " + this.getVersion()); break
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
