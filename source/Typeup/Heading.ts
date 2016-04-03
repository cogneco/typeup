import * as Error from "../U10sil/Error/Region"
import { Source } from "./Source"
import { Renderer } from "./Renderer"
import { Block } from "./Block"
import { Inline } from "./Inline"
import { ContentBlock } from "./ContentBlock"

module Cogneco.Typeup {
	export class Heading extends ContentBlock<Inline> {
		constructor(private level: number, content: Inline[], region: Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("heading", { "level": this.level.toString(), "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "Heading"
			result["level"] = this.level
			return result
		}
		toString() {
			var result = ""
			for (var i = 0; i < this.level; i++)
				result += "#"
			result += super.toString()
			return result
		}
		static parse(source: Source): Block[] {
			var level = 0
			while (source.readIf("#"))
				level++
			var result: Block[]
			if (level > 0) {
				while (source.peek().match(/\s/))
					source.read()
				result = [new Heading(level, Inline.parse(source, "\n"), source.mark())]
			}
			return result
		}
	}
	Block.addParser(Heading.parse)
}
