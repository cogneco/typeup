import { Inline } from "../Inline/Inline"
import { Source } from "../Source"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Renderer } from "../Renderer"
import { ListItem } from "./ListItem"
import { EmptyLine } from "./EmptyLine"
import { Paragraph } from "./Paragraph"

export class UnorderedList extends ContentBlock<ListItem> {
	constructor(content: ListItem[]) {
		super(content, content.map(c => c.getRegion()).reduce((left, right) => left.merge(right)))
	}
	async render(renderer: Renderer): Promise<string> {
		return renderer.render("unordered list", { content: (await Promise.all(this.getContent().map(async item => item.render(renderer)))).join("") })
	}
	toString() {
		return this.getContent().map(item => item.toString("- ")).join("\n")
	}
	static parse(source: Source): Block[] | undefined {
		let peeked = ""
		let p: string | undefined
		while (p = source.peekIs(peeked + "\t"))
			peeked = p
		let result: Block[] | undefined
		if (source.readIf(peeked + "-")) {
			while ((source.peek() || "").match(/\s/))
				source.read()
			const current = new ListItem(Block.parseAll(source.requirePrefix("\t")) || [], source.mark())
			const next = Block.parse(source)
			let index = 0
			while (next && next.length > 0 && next[index] instanceof EmptyLine)
				index++
			if (next && next.length > 0 && next[index] instanceof UnorderedList) {
				while (index-- > 0)
					next.shift()
				next[0] = new UnorderedList([current].concat((next[0] as UnorderedList).getContent()))
				result = next
			} else {
				result = [new UnorderedList([current])]
				if (next && next.length > 0)
					result = result.concat(next)
			}
		}
		return result
	}
}
Block.addParser(UnorderedList.parse)
