import * as Error from "../../U10sil/Error/Region"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"

module Cogneco.Typeup {
	export class CodeBlock extends Block {
		constructor(private language: string, private content: string, region: Error.Region) {
			super(region)
		}
		render(renderer: Renderer): string {
			return renderer.render("codeblock", { "content": this.content })
		}
		toObject(): any {
		return { "type": "CodeBlock", "content": this.content, language: this.language }
		}
		toString() {
			return `%% ${this.language}\n${this.content}\n%%\n`
		}
		static parse(source: Source): Block[] {
			var result: Block[]
			if (source.readIf("%%")) {
				var language = source.till("\n").readAll()
				if (!source.readIf("\n"))
					source.raise("Expected newline.")
				result = [new CodeBlock(language, source.till("%%").readAll(), source.mark())]
				if (!source.readIf("%%"))
					source.raise("Expected \"%%\" as end of code block.")
			}
			return result
		}
	}
	Block.addParser(CodeBlock.parse)
}
