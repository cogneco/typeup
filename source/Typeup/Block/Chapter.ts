import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"

export class Chapter extends ContentBlock<Block> {
	constructor(content: Block[], region: Error.Region) {
		super(content, region)
	}
	render(renderer: Renderer): string {
		return renderer.render("chapter", { content: super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "Chapter"
		return result
	}
	toString() {
		return `===\n${super.toString()}`
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		if (source.readIf("===\n")) {
			const region = source.mark()
			result = Block.parseAll(source)
			const content: Block[] = []
			let next: Block | undefined
			while (result && result.length > 0 && !(result[0] instanceof Chapter) && (next = result.shift()))
				content.push(next)
			result = result ? [new Chapter(content, region), ...result] : [new Chapter(content, region)]
		}
		return result
	}
}
Block.addParser(Chapter.parse)
