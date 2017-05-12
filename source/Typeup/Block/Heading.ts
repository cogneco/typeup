import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"

export class Heading extends ContentBlock<Inline> {
	constructor(private level: number, content: Inline[], region: Error.Region) {
		super(content, region)
	}
	render(renderer: Renderer): string {
		return renderer.render("heading", { level: this.level.toString(), content: super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "Heading"
		result.level = this.level
		return result
	}
	toString() {
		let result = ""
		for (let i = 0; i < this.level; i++)
			result += "#"
		result += super.toString()
		return result
	}
	static parse(source: Source): Block[] {
		let level = 0
		while (source.readIf("#"))
			level++
		let result: Block[]
		if (level > 0) {
			while (source.peek().match(/\s/))
				source.read()
			result = [new Heading(level, Inline.parse(source.till("\n")), source.mark())]
			if (!source.readIf("\n"))
				source.raise("Expected newline as end of header.")
		}
		return result
	}
}
Block.addParser(Heading.parse)
