import { Inline } from "./Inline"
import { Source } from "./Source"
import { Renderer } from "./Renderer"
import * as Error from "../U10sil/Error/Region"

export class Text extends Inline {
	constructor(private value: string, region: Error.Region) {
		super(region)
	}
	render(renderer: Renderer): string {
		return this.value
	}
	toObject(): any {
		return { "type": "Text", "value": this.value }
	}
	toString(): string {
		return this.value
	}
	static parse(source: Source): Inline[] {
		var result: Inline[]
		var value = source.read()
		if (value == "\\")
			value = source.read()
		var region = source.mark()
		result = Inline.parse(source)
		if (result.length > 0 && result[0] instanceof Text) {
			value += (<Text>result[0]).value
			region = region.merge(result[0].getRegion())
			result[0] = new Text(value, region)
		} else
			result = [<Inline>new Text(value, region)].concat(result)
		return result
	}
}
Inline.addParser(Text.parse, -1)
