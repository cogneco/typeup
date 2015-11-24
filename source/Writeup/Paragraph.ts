/// <reference path="ContentBlock" />
/// <reference path="Inline" />

module Cogneco.Writeup {
	export class Paragraph extends ContentBlock {
		constructor(content: Inline[], region: Error.Region) {
			super(content, region)
		}
		static parse(source: Source): Inline {
			var result = Inline.parseAll(source)
			return result ? new Paragraph(result, source.mark()) : undefined
		}
	}
	Inline.addParser(Paragraph.parse, -1)
}
