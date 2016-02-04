/// <reference path="ContentBlock" />
/// <reference path="Inline" />

module Cogneco.Writeup {
	export class Paragraph extends ContentBlock {
		constructor(content: Inline[], region: U10sil.Error.Region) {
			super(content, region)
		}
		toHtml(variables: { [name: string] : string }): string {
			var content = super.toHtml(variables)
			return `<p>${content}</p>`
		}
		merge(other: Paragraph): Paragraph {
			var result: Inline[] = []
			var content = this.getContent()
			for (var i = 0; i < content.length; i++)
				result.push(content[i])
			var content = other.getContent()
			for (var i = 0; i < content.length; i++)
				result.push(content[i])
			return new Paragraph(result, this.getRegion().merge(other.getRegion()))
		}
		static parse(source: Source): Block {
			var result = Inline.parseAll(source)
			return result && result.length > 0 ? new Paragraph(result, source.mark()) : undefined
		}
	}
	Block.addParser(Paragraph.parse, -1)
}
