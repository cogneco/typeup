import * as Error from "../../U10sil/source/Error"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"

export class Paragraph extends ContentBlock<Inline> {
	constructor(content: Inline[]) {
		super(content, content.map(content => content.getRegion()).reduce((left, right) => left.merge(right)))
	}
	render(renderer: Renderer): string {
		return renderer.render("paragraph", { "content": super.render(renderer) })
	}
	toObject(): any {
		var result = super.toObject()
		result["type"] = "Paragraph"
		return result
	}
	static parse(source: Source): Block[] {
		var content = Inline.parse(source.until("\n"))
		var result: Block[]
		if (content && content.length > 0) {
			var next = Block.parse(source)
			result = (next && next.length > 0 && next[0] instanceof Paragraph) ?
			[<Block>new Paragraph(content.concat((<Paragraph>next[0]).getContent()))].concat(next.slice(1)) :
			[<Block>new Paragraph(content)].concat(next)
		}
		return result
	}
}
Block.addParser(Paragraph.parse, -1)
