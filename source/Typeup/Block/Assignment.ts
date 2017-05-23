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
			renderer.setVariable("template-path", templatePath.folder.toString())
			const documentPath = Uri.Locator.parse(this.getRegion().resource)
			const location = templatePath.resolve(documentPath)
			const nativePath = (location.isRelative ? "" : "/") + location.path.join("/")
			let content: string
			try {
				content = fs.readFileSync(nativePath, "utf-8")
			} catch (error) {
				console.error(`Failed to open template: ${nativePath}`)
			}
			try {
				renderer.setTemplate(JSON.parse(content) as Template)
			} catch (error) {
				console.error(`Failed to parse template: ${nativePath}`)
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
	static parse(source: Source): Block[] {
		let result: Block[]
		let i = 1
		while (source.peek(i) && source.peek(i).charAt(i - 1).match(/[a-z]|[A-Z]|[0-9]|_|-/i))
			i++
		if (source.peek(i + 2) && source.peek(i + 2).slice(-3) == " = ") {
			const name = source.read(i - 1)
			source.read(3) // consume " = "
			let value = ""
			while (source.peek() != "\n")
				value += source.read()
			source.read() // consume "\n"
			result = [new Assignment(name, value, source.mark())]
		}
		return result
	}
}
Block.addParser(Assignment.parse)
