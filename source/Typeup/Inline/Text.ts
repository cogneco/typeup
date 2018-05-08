import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Inline } from "./Inline"

export class Text extends Inline {
	constructor(private value: string, region: Error.Region) {
		super(region)
	}
	async render(renderer: Renderer): Promise<string> {
		return this.value
	}
	toObject(): any {
		return { type: "Text", value: this.value }
	}
	toString(): string {
		return this.value
	}
	static parse(source: Source): Inline[] | undefined {
		let result: Inline[] | undefined
		let value = source.read()
		if (value == "\\")
			value = source.read()
		let region = source.mark()
		if (value && value != "\0") {
			result = Inline.parse(source)
			if (!result)
				result = [new Text(value, region) as Inline]
			else if (result.length > 0 && result[0] instanceof Text) {
				value += (result[0] as Text).value
				region = region.merge(result[0].getRegion())
				result[0] = new Text(value, region)
			} else
				result = [new Text(value, region) as Inline].concat(result)
		}
		return result
	}
}
Inline.addParser(Text.parse, -1)
