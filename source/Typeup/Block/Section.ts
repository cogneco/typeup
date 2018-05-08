import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"
import { Chapter } from "./Chapter"

export class Section extends ContentBlock<Block> {
	constructor(content: Block[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("section", { content: await super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "Section"
		return result
	}
	toString() {
		return `---\n${super.toString()}`
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		if (source.readIf("---\n")) {
			const region = source.mark()
			result = Block.parse(source)
			const content: Block[] = []
			let next: Block | undefined
			while (result && result.length > 0 && !(result[0] instanceof Section) && !(result[0] instanceof Chapter) && (next = result.shift()))
				content.push(next)
			result = [new Section(content, region), ...(result || [])]
		}
		return result
	}
}
Block.addParser(Section.parse, 1)
