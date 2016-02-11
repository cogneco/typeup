/// <reference path="ContentBlock" />
/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export class Heading extends ContentBlock {
		constructor(private level: number, content: Inline[], region: U10sil.Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("heading", { "level": this.level.toString(), "content": super.render(renderer) })
		}
		toObject(): any {
			return { "type": "Heading", "level": this.level, "content": this.getContent().map(element => element.toObject()) }
		}
		toString() {
			var result = ""
			for (var i = 0; i < this.level; i++)
				result += "#"
			result += super.toString()
			return result
		}
		static parse(source: Source): Block {
			var level = 0
			while (source.peek() == "#") {
				level++
				source.read()
			}
			var result: Block
			if (level > 0) {
				while (source.peek().match(/\s/))
					source.read()
				result = new Heading(level, Inline.parseAll(source), source.mark())
			}
			return result
		}
	}
	Block.addParser(Heading.parse)
}
