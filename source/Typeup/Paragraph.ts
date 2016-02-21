/// <reference path="ContentBlock" />
/// <reference path="Inline" />

module Cogneco.Typeup {
	export class Paragraph extends ContentBlock {
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
			var content = Inline.parse(source)
			var result: Block[]
			if (content && content.length > 0) {
				var next = Block.parse(source)
				result = (next && next.length > 0 && next[0] instanceof Paragraph) ?
				[new Paragraph(content.concat((<Paragraph>next[0]).getContent()))] :
				[<Block>new Paragraph(content)].concat(next)
			}
			return result
		}
	}
	Block.addParser(Paragraph.parse, -1)
}
