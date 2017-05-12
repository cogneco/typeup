import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"

module Cogneco.Typeup {
	export class MathBlock extends ContentBlock<Inline> {
		constructor(private math: string, content: Inline[], region: Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("mathblock", { "math": this.math, "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "CodeBlock"
			result["math"] = this.math
			return result
		}
		toString() {
			return `$$\n${this.math}\n%%\n${super.toString()}`
		}
		static parse(source: Source): Block[] {
			var result: Block[]
			if (source.readIf("$$")) {
				source.readIf("\n")
				var math = source.till("$$").readAll()
				if (!source.readIf("$$"))
					source.raise("Expected \"$$\" as end of math block.")
				source.readIf("\n")
				var region = source.mark()
				result = Block.parse(source)
				if (result.length > 0 && result[0] instanceof Paragraph)
					result[0] = new MathBlock(math, (<Paragraph>result[0]).getContent(), region)
				else
					result.unshift(new MathBlock(math, [], region))
			}
			return result
		}
	}
	Block.addParser(MathBlock.parse)
}
