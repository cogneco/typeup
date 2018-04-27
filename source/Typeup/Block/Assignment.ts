import { Node } from "../Node"
import { Source } from "../Source"
import { Block } from "./Block"
import { Inline } from "../Inline/Inline"
import { Template } from "../Template"
import { Renderer } from "../Renderer"
import { Error, Uri } from "@cogneco/mend"

import * as fs from "fs"

export class Assignment extends Block {
	constructor(private name: string, private value: string, region: Error.Region) {
		super(region)
	}
	getName(): string { return this.name }
	getValue(): string { return this.value }
	render(renderer: Renderer): string {
		renderer.setVariable(this.name, this.value)
		if (this.name == "template") {
			const templatePath = Uri.Locator.parse(this.value + ".json")
			renderer.setVariable("template-path", templatePath ? templatePath.folder.toString() : "")
			const documentPath = this.getRegion().resource
			const location = templatePath ? templatePath.resolve(documentPath) : documentPath || new Uri.Locator()
			const nativePath = (location.isRelative ? "" : "/") + location.path.join("/")
			let content: string
			try {
				content = fs.readFileSync(nativePath, "utf-8")
				try {
					renderer.setTemplate(JSON.parse(content) as Template)
				} catch (error) {
					console.error(`Failed to parse template: ${nativePath}`)
				}
			} catch (error) {
				console.error(`Failed to open template: ${nativePath}`)
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
