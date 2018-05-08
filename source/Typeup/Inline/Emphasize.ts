import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { ContentInline } from "./ContentInline"
import { Inline } from "./Inline"

export class Emphasize extends ContentInline {
	constructor(content: Inline[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("emphasize", { content: await super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "Emphasize"
		return result
	}
	toString(): string {
		return "_" + super.toString() + "_"
	}
	static parse(source: Source): Inline[] | undefined {
		let result: Inline[] | undefined
		if (source.readIf("_")) {
			result = [new Emphasize(Inline.parse(source.till("_")) || [], source.mark())]
			if (!source.readIf("_"))
				source.raise("Expected \"_\" as end of emphasize.")
		}
		return result
	}
}
Inline.addParser(Emphasize.parse)
