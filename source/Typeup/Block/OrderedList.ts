import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Inline } from "../Inline/Inline"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { ListItem } from "./ListItem"
import { EmptyLine } from "./EmptyLine"
import { Paragraph } from "./Paragraph"

export class OrderedList extends ContentBlock<ListItem> {
	constructor(content: ListItem[]) {
		super(content, content.map(c => c.getRegion()).reduce((left, right) => left.merge(right)))
	}
	render(renderer: Renderer): string {
		return renderer.render("ordered list", { content: this.getContent().map(item => item.render(renderer)).join("") })
	}
	toString() {
		return this.getContent().map(item => item.toString("1. ")).join("\n")
	}
	static parse(source: Source): Block[] {
		let peeked = ""
		let p: string
		while (p = source.peekIs(peeked + "\t"))
			peeked = p
		let result: Block[]
		if (source.readIf(peeked + "1.")) {
			while (source.peek().match(/\s/))
				source.read()
			const current = new ListItem(Block.parseAll(source.requirePrefix("\t")), source.mark())
			const next = Block.parse(source)
			let index = 0
			while (next && next.length > 0 && next[index] instanceof EmptyLine)
				index++
			if (next && next.length > 0 && next[index] instanceof OrderedList) {
				while (index-- > 0)
					next.shift()
				next[0] = new OrderedList([current].concat((next[0] as OrderedList).getContent()))
				result = next
			} else {
				result = [new OrderedList([current])]
				if (next && next.length > 0)
					result = result.concat(next)
			}
		}
		return result
	}
}
Block.addParser(OrderedList.parse)
