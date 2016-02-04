/// <reference path="ContentBlock" />
/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export class Heading extends ContentBlock {
		constructor(private level: number, content: Inline[], region: U10sil.Error.Region) {
			super(content, region)
		}
		toHtml(variables: { [name: string] : string }): string {
			var result: string
			var content = super.toHtml(variables)
			switch (this.level) {
				case 1: result = `<h1>${content}</h1>`; break
				case 2: result = `<h2>${content}</h2>`; break
				case 3: result = `<h3>${content}</h3>`; break
				case 4: result = `<h4>${content}</h4>`; break
				case 5: result = `<h5>${content}</h5>`; break
				case 6: result = `<h6>${content}</h6>`; break
			}
			return result
		}
		toString() {
			var result = ""
			for (var i = 0; i < this.level; i++)
				result += "#"
			result += super.toString()
			return result
		}
		static parse(source: Source): Block {
			var level = 0
			while (source.peek() == "#") {
				level++
				source.read()
			}
			var result: Block
			if (level > 0) {
				while (source.peek().match(/\s/))
					source.read()
				result = new Heading(level, Inline.parseAll(source), source.mark())
			}
			return result
		}
	}
	Block.addParser(Heading.parse)
}
