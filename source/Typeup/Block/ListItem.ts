import { Error } from "@cogneco/mend"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"

export class ListItem extends ContentBlock<Block> {
	constructor(content: Block[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("list item", { content: await super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "ListItem"
		return result
	}
	toString(symbol?: string): string {
		if (!symbol)
			symbol = " - "
		return symbol + super.toString()
	}
}
