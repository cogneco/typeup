import { Node } from "../Node"
import { Source } from "../Source"
import { Block } from "./Block"
import { Inline } from "../Inline/Inline"
import { Template } from "../Template"
import { Renderer } from "../Renderer"
import { Error, Uri } from "@cogneco/mend"

import * as fs from "fs"
import * as path from "path"
import fetch from "node-fetch"

export class Assignment extends Block {
	constructor(private name: string, private value: string, region: Error.Region) {
		super(region)
	}
	getName(): string { return this.name }
	getValue(): string { return this.value }
	async render(renderer: Renderer): Promise<string> {
		renderer.setVariable(this.name, this.value)
		if (this.name == "template") {
			const templateUri = Uri.Locator.parse(this.value + ".json")
			renderer.setVariable("template-path", templateUri ? templateUri.folder.toString() : "")

			const documentPath = this.getRegion().resource
			const location = templateUri ? templateUri.resolve(documentPath) : documentPath || new Uri.Locator()
			switch (location.scheme.toString()) {
				case "":
				case "file":
					const nativePath = (location.isRelative ? "" : path.sep) + location.path.join(path.sep)
					let content: string
					try {
							content = fs.readFileSync(nativePath, "utf-8")
							try {
								renderer.setTemplate(JSON.parse(content) as Template)
							} catch (error) {
								console.error(`Failed to parse template: ${location.toString()}`)
							}
						} catch (error) {
							console.error(`Failed to open template: ${location.toString()}`)
					}
					break
				case "http":
				case "https":
					let template: Template | undefined
					try {
						const response = await fetch(location.toString())
						template = (await response.json()) as Template
					} catch (error) {
						console.error(`Failed to fetch template: ${location.toString()}`)
					}
					if (template)
						renderer.setTemplate(template)
					break
				default:
					console.error(`No handler for template URL scheme: ${location.toString()}`)
					break
			}
		}
		return ""
	}
	toObject(): any {
		return { type: "Assignment", name: this.name, value: this.value }
	}
	toString() {
		return this.name + " = " + this.value + "\n"
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		let i = 1
		let peeked: string | undefined
		while ((peeked = source.peek(i)) && peeked.charAt(i - 1).match(/[a-z]|[A-Z]|[0-9]|_|-/i))
			i++
		if ((peeked = source.peek(i + 2)) && peeked.slice(-3) == " = ") {
			const name = source.read(i - 1)
			if (!name)
				source.raise("Missing name of variable to assign to.", Error.Level.Recoverable)
			else {
				source.read(3) // consume " = "
				let value = ""
				while (source.peek() != "\n")
					value += source.read()
				source.read() // consume "\n"
				result = [new Assignment(name, value, source.mark())]
			}
		}
		return result
	}
}
Block.addParser(Assignment.parse)
