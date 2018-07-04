import { Error } from "@cogneco/mend"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Source } from "../Source"
import { Inline } from "../Inline/Inline"
import { TableCell } from "./TableCell"
import { Table } from "./Table"

export class TableRow extends ContentBlock<TableCell> {
	constructor(content: TableCell[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("table row", { content: await super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "TableRow"
		return result
	}
	static parseRow(header: boolean, source: Source): TableRow | undefined {
		let result: TableRow | undefined
		const cells: TableCell[] = []
		if (source.readIf("| ")) {
			let cell: TableCell | undefined
			while (cell = TableCell.parseCell(header, source))
				cells.push(cell)
			if (cells.length > 0)
				result = new TableRow(cells, source.mark())
		}
		return result
	}
}
