import { Error } from "@cogneco/mend"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"
import { Source } from "../Source"
import { Paragraph } from "./Paragraph"
import { TableRow } from "./TableRow"

export class Table extends ContentBlock<Inline> {
	constructor(private alignments: ("" | "left" | "center" | "right")[], private rows: TableRow[], content: Inline[], region: Error.Region) {
		super(content, region)
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("table", {
			classes: this.alignments.map((value, index) => {
				let result: string
				switch (value) {
					case "center":
						result = "tc" + (index + 1)
						break
					case "right":
						result = "tr" + (index + 1)
						break
					default:
						result = ""
						break
			}
				return result
			}).filter(value => value != "").join(" "),
			rows: (await Promise.all(this.rows.map(async row => row.render(renderer)))).join("\n"),
			content: await super.render(renderer),
		})
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "TableRow"
		return result
	}
	static parse(source: Source): Block[] | undefined {
		const rows: TableRow[] = []
		let row: TableRow | undefined
		while (source.peekIs("| ") && (row = TableRow.parseRow(true, source.till("\n"))) && source.readIf("\n"))
			rows.push(row)
		let alignments: ("" | "left" | "center" | "right")[] | undefined
		if (source.peekIs(["|-", "|:-"]) && source.readIf("|")) {
			const alignmentString = source.until("\n").readAll()
			if (alignmentString)
				alignments = alignmentString.substr(0, alignmentString.length - 2).split("|").map(a => a.startsWith(":") ? a.endsWith(":") ? "center" : "left" : a.endsWith(":") ? "right" : "")
		}
		while (source.peekIs("| ") && (row = TableRow.parseRow(false, source.till("\n"))) && source.readIf("\n"))
			rows.push(row)
		let result: Block[] | undefined
		if (rows.length > 0) {
			const region = source.mark()
			result = Block.parse(source) || []
			if (result.length > 0 && result[0] instanceof Paragraph)
				result[0] = new Table(alignments || [], rows, (result[0] as Paragraph).getContent(), region)
			else
				result.unshift(new Table(alignments || [], rows, [], region))
		}
		return result
	}
}
Block.addParser(Table.parse)
