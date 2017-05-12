import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"

export class Paragraph extends ContentBlock<Inline> {
	constructor(content: Inline[]) {
		super(content, content.map(c => c.getRegion()).reduce((left, right) => left.merge(right)))
	}
	render(renderer: Renderer): string {
		return renderer.render("paragraph", { content: super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "Paragraph"
		return result
	}
	static parse(source: Source): Block[] {
		const content = Inline.parse(source.until("\n"))
		let result: Block[]
		if (content && content.length > 0) {
			const next = Block.parse(source)
			result = (next && next.length > 0 && next[0] instanceof Paragraph) ?
			[new Paragraph(content.concat((next[0] as Paragraph).getContent())) as Block].concat(next.slice(1)) :
			[new Paragraph(content) as Block].concat(next)
		}
		return result
	}
}
Block.addParser(Paragraph.parse, -1)
