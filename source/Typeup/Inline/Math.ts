import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Inline } from "./Inline"

export class Math extends Inline {
	constructor(private content: string, region: Error.Region) {
		super(region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("math", { content: await this.content })
	}
	toObject(): any {
		return { type: "Math", content: this.content }
	}
	toString(): string {
		return "$" + super.toString() + "$"
	}
	static parse(source: Source): Inline[] | undefined {
		let result: Inline[] | undefined
		if (source.readIf("$")) {
			result = [new Math(source.till("$").readAll() || "", source.mark())]
			if (!source.readIf("$"))
				source.raise("Expected \"$\" as end of inline math.")
		}
		return result
	}
}
Inline.addParser(Math.parse)
