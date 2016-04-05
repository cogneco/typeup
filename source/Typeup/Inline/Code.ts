import * as Error from "../../U10sil/Error/Region"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { ContentInline } from "./ContentInline"
import { Inline } from "./Inline"

module Cogneco.Typeup {
	export class Code extends ContentInline {
		constructor(content: Inline[], region: Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("code", { "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "Code"
			return result
		}
		toString(): string {
			return "%" + super.toString() + "%"
		}
		static parse(source: Source): Inline[] {
			var result: Inline[]
			if (source.readIf("%")) {
				result = [new Code(Inline.parse(source.till("%")), source.mark())]
				if (!source.readIf("%"))
					source.raise("Expected \"%\" as end of emphasize.")
			}
			return result
		}
	}
	Inline.addParser(Code.parse)
}
