/// <reference path="ContentBlock" />
/// <reference path="Inline" />

module Cogneco.Writeup {
	export class Paragraph extends ContentBlock {
		constructor(content: Inline[], region: Error.Region) {
			super(content, region)
		}
		static parse(source: Source): Block {
			var result = Inline.parseAll(source)
			return result && result.length > 0 ? new Paragraph(result, source.mark()) : undefined
		}
	}
	Block.addParser(Paragraph.parse, -1)
}
