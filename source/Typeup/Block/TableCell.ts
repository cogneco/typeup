import { Error } from "@cogneco/mend"
import { Renderer } from "../Renderer"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"
import { Source } from "../Source"

export class TableCell extends ContentBlock<Inline> {
	constructor(private header: boolean, content: Inline[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render(this.header ? "table header" : "table cell", { content: await super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "TableCell"
		return result
	}
	static parseCell(header: boolean, source: Source): TableCell | undefined {
		const content = Inline.parse(source.till("|"))
		source.readIf("|")
		return content != undefined ? new TableCell(header, content, source.mark()) : undefined
	}
}
