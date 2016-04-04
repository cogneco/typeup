import { Node } from "../Node"
import { Source } from "../Source"
import { Block } from "./Block"
import { Inline } from "../Inline/Inline"
import { Template } from "../Template"
import { Renderer } from "../Renderer"
import * as Error from "../../U10sil/Error/Region"
import * as Uri from "../../U10sil/Uri/Locator"
/// <reference path="../../tsd.d.ts" />
import * as fs from "fs"

module Cogneco.Typeup {
	export class Assignment extends Block {
		constructor(private name: string, private value: string, region: Error.Region) {
			super(region)
		}
		getName(): string { return this.name }
		getValue(): string { return this.value }
		render(renderer: Renderer): string {
			renderer.setVariable(this.name, this.value)
			if (this.name == "template") {
				var templatePath = Uri.Locator.parse(this.value + ".json")
				renderer.setVariable("template-path", templatePath.getFolder().toString())
				var documentPath = Uri.Locator.parse(this.getRegion().getResource())
				var location = templatePath.resolve(documentPath)
				var content = fs.readFileSync((location.isRelative() ? "" : "/") + location.getPath().join("/"), "utf-8")
				renderer.setTemplate(<Template>JSON.parse(content))
			}
			return ""
		}
		toObject(): any {
			return { "type": "Assignment", "name": this.name, "value": this.value }
		}
		toString() {
			return this.name + " = " + this.value + "\n"
		}
		static parse(source: Source): Block[] {
			var result: Block[]
			var i = 1
			while (source.peek(i) && source.peek(i).charAt(i - 1).match(/[a-z]|[A-Z]|[0-9]|_|-/i))
				i++
			if (source.peek(i + 2) && source.peek(i + 2).slice(-3) == " = ") {
				var name = source.read(i - 1)
				source.read(3) // consume " = "
				var value = ""
				while (source.peek() != "\n")
					value += source.read()
				source.read() // consume "\n"
				result = [new Assignment(name, value, source.mark())]
			}
			return result
		}
	}
	Block.addParser(Assignment.parse)
}
