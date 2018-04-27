import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"

export class CodeBlock extends ContentBlock<Inline> {
	constructor(private language: string, private code: string, content: Inline[], region: Error.Region) {
		super(content, region)
	}
	render(renderer: Renderer): string {
		return renderer.render("codeblock", { code: this.code, language: this.language, content: super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "CodeBlock"
		result.code = this.code
		result.language = this.language
		return result
	}
	toString() {
		return `%% ${this.language}\n${this.code}\n%%\n${super.toString()}`
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		if (source.readIf("%%")) {
			const language = source.till("\n").readAll() || ""
			if (!source.readIf("\n"))
				source.raise("Expected newline.")
			const code = source.till("%%").readAll() || ""
			if (!source.readIf("%%"))
				source.raise("Expected \"%%\" as end of code block.")
			source.readIf("\n")
			const region = source.mark()
			result = Block.parse(source) || []
			if (result.length > 0 && result[0] instanceof Paragraph)
				result[0] = new CodeBlock(language, code, (result[0] as Paragraph).getContent(), region)
			else
				result.unshift(new CodeBlock(language, code, [], region))
		}
		return result
	}
}
Block.addParser(CodeBlock.parse)
