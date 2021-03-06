#!/usr/bin/env node
import { Error, Uri } from "@cogneco/mend"

import * as fs from "fs"
import * as cp from "child_process"

import { Document } from "./Typeup/Document"

import * as p from "../package.json"

export class Program {
	private defaultCommand = "html"
	constructor(private commands: string[]) {
		this.commands = this.commands.slice(2)
		if (this.commands.length == 0) {
			this.commands.push(this.defaultCommand)
			this.commands.push(".")
		}
	}
	private open(path: string | undefined): Document | undefined {
		return Document.open(path, new Error.ConsoleHandler())
	}
	private async runHelper(command: string | undefined, commands: string[]): Promise<void> {
		switch (command) {
			case "json":
			case "html":
			case "pdf":
			case "typeup":
				const path = this.commands.shift()
				const document = this.open(path)
				if (!document)
					console.log(`Unable to open document "${ path }".`)
				else
				switch (command) {
					case "json":
						console.log(document.toJson("  "))
						break
					case "html":
						fs.writeFileSync(document.getRegion().resource.toString().replace(/\.tup$/, ".html"), await document.render())
						break
					case "pdf":
						fs.writeFileSync(document.getRegion().resource.toString().replace(/\.tup$/, ".pdf"), cp.execFileSync("prince", ["--javascript", "-", "-o", "-"], { input: await document.render(), cwd: (document.getRegion().resource || new Uri.Locator()).folder.toString() }))
						break
					case "typeup":
						console.log(document.toString())
						break
				}
				break
			case "version": console.log("TypeUp " + this.getVersion()); break
			case "help": console.log("help"); break
			default:
				if (command)
					commands.push(command)
				command = undefined
				await this.runHelper(this.defaultCommand, commands)
				break
		}
		if (command)
			this.defaultCommand = command
	}
	async run(): Promise<void> {
		let command: string | undefined
		while (command = this.commands.shift())
			await this.runHelper(command, this.commands)
	}
	getVersion(): string {
		return p.version
	}
}
new Program(process.argv).run()
