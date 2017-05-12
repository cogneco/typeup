import { Error, Uri, Unit, IO } from "@cogneco/mend"
import "@cogneco/mend"

import * as fs from "fs"
import * as cp from "child_process"

import { Document } from "./Typeup/Document"

export class Program {
	private defaultCommand = "html"
	constructor(private commands: string[]) {
		this.commands = this.commands.slice(2)
		if (this.commands.length == 0) {
			this.commands.push(this.defaultCommand)
			this.commands.push(".")
		}
	}
	private open(path: string): Document {
		return Document.open(path, new Error.ConsoleHandler())
	}
	private runHelper(command: string, commands: string[]) {
		switch (command) {
			case "json": console.log(this.open(this.commands.shift()).toJson("  ")); break
			case "html":
				let document = this.open(this.commands.shift())
				fs.writeFileSync(document.getRegion().getResource().replace(/\.tup$/, ".html"), document.render())
				break
			case "pdf":
				document = this.open(this.commands.shift())
				fs.writeFileSync(document.getRegion().getResource().replace(/\.tup$/, ".pdf"), cp.execFileSync("prince", ["--javascript", "-", "-o", "-"], { input: document.render(), cwd: Uri.Locator.parse(document.getRegion().getResource()).getFolder().toString() }))
				break
			case "typeup": console.log(this.open(this.commands.shift()).toString()); break
			case "self-test": Unit.Fixture.run(true); break
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
		let command: string
		while (command = this.commands.shift())
			this.runHelper(command, this.commands)
	}
	getVersion(): string {
		return "0.1"
	}
}
new Program(process.argv).run()
