import * as Error from "../../U10sil/Error/Region"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"

module Cogneco.Typeup {
	export class Figure extends ContentBlock<Inline> {
		constructor(private source: string, private classes: string[], content: Inline[], region: Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("figure", { "source": this.source, "classes": this.classes.join(" 	"), "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "Figure"
			result["source"] = this.source
			return result
		}
		toString() {
			return `!figure ${this.source} ${this.classes}\n${super.toString()}`
		}
		static parse(source: Source): Block[] {
			var result: Block[]
			if (source.readIf("!figure ")) {
				var image = source.till([" ", "\n"]).readAll()
				var classes = source.readIf(" ") ? source.till("\n").readAll().split(" ") : []
				if (!source.readIf("\n"))
					source.raise("Expected newline as end of figure.")
				var region = source.mark()
				result = Block.parse(source)
				if (result.length > 0 && result[0] instanceof Paragraph)
					result[0] = new Figure(image, classes, (<Paragraph>result[0]).getContent(), region)
				else
					result.unshift(new Figure(image, classes, [], region))
			}
			return result
		}
	}
	Block.addParser(Figure.parse)
}
