import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"

export class MathBlock extends ContentBlock<Inline> {
	constructor(private math: string, content: Inline[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("mathblock", { math: this.math, content: await super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "CodeBlock"
		result.math = this.math
		return result
	}
	toString() {
		return `$$\n${this.math}\n%%\n${super.toString()}`
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		if (source.readIf("$$")) {
			source.readIf("\n")
			const math = source.till("$$").readAll() || ""
			if (!source.readIf("$$"))
				source.raise("Expected \"$$\" as end of math block.")
			source.readIf("\n")
			const region = source.mark()
			result = Block.parse(source) || []
			if (result.length > 0 && result[0] instanceof Paragraph)
				result[0] = new MathBlock(math, (result[0] as Paragraph).getContent(), region)
			else
				result.unshift(new MathBlock(math, [], region))
		}
		return result
	}
}
Block.addParser(MathBlock.parse)
