import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Inline } from "./Inline"

module Cogneco.Typeup {
	export class Code extends Inline {
		constructor(private content: string, region: Error.Region) {
			super(region)
		}
		render(renderer: Renderer): string {
			return renderer.render("code", { "content": this.content })
		}
		toObject(): any {
			return { type: "code", content: this.content }
		}
		toString(): string {
			return "%" + super.toString() + "%"
		}
		static parse(source: Source): Inline[] {
			var result: Inline[]
			if (source.readIf("%")) {
				result = [new Code(source.till("%").readAll(), source.mark())]
				if (!source.readIf("%"))
					source.raise("Expected \"%\" as end of inline code.")
			}
			return result
		}
	}
	Inline.addParser(Code.parse)
}
