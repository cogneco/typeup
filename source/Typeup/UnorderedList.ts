/// <reference path="ContentBlock" />
/// <reference path="Inline" />
/// <reference path="Source" />
/// <reference path="ListItem" />

module Cogneco.Typeup {
	export class UnorderedList extends ContentBlock<ListItem> {
		constructor(private content: ListItem[]) {
			super(content)
		}
		render(renderer: Renderer): string {
			return renderer.render("unordered list", { "content": this.content.map(item => item.render(renderer)).join("") })
		}
		toString() {
			return this.content.map(item => item.toString(" - ")).join("\n")
		}
		static parse(source: Source): Block[] {
			var peeked = ""
			var p: string
			while (p = source.peekIs(peeked + "\t"))
				peeked = p
			var result: Block[]
			if (source.readIf(peeked + "-")) {
				while (source.peek().match(/\s/))
					source.read()
				var current = new ListItem(Inline.parse(source, "\n"), source.mark())
				var next = Block.parse(source)
				var index = 0
				while (next && next.length > 0 && next[index] instanceof EmptyLine)
					index++
				if (next && next.length > 0 && next[index] instanceof UnorderedList) {
					while (index-- > 0)
						next.shift()
					next[0] = new UnorderedList([current].concat((<UnorderedList>next[0]).content))
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
}
