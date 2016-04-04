import { ContentInline } from "./ContentInline"
import { Inline } from "./Inline"
import { Source } from "./Source"
import { Renderer } from "./Renderer"
import * as Error from "../U10sil/Error/Region"

module Cogneco.Typeup {
	export class Emphasize extends ContentInline {
		constructor(content: Inline[], region: Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("emphasize", { "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "Emphasize"
			return result
		}
		toString(): string {
			return "_" + super.toString() + "_"
		}
		static parse(source: Source): Inline[] {
			var result: Inline[]
			if (source.readIf("_")) {
				result = [new Emphasize(Inline.parse(source.till("_")), source.mark())]
				if (!source.readIf("_"))
					source.raise("Expected \"_\" as end of emphasize.")
			}
			return result
		}
	}
	Inline.addParser(Emphasize.parse)
}
