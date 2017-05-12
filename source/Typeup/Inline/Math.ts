import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Inline } from "./Inline"

export class Math extends Inline {
	constructor(private content: string, region: Error.Region) {
		super(region)
	}
	render(renderer: Renderer): string {
		return renderer.render("math", { "content": this.content })
	}
	toObject(): any {
		return { type: "Math", content: this.content }
	}
	toString(): string {
		return "$" + super.toString() + "$"
	}
	static parse(source: Source): Inline[] {
		var result: Inline[]
		if (source.readIf("$")) {
			result = [new Math(source.till("$").readAll(), source.mark())]
			if (!source.readIf("$"))
				source.raise("Expected \"$\" as end of inline math.")
		}
		return result
	}
}
Inline.addParser(Math.parse)

