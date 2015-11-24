/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export class Text extends Inline {
		constructor(private value: string, region: Error.Region) {
			super(region)
		}
		static parse(source: Source): Inline {
			return source.peek() != "\n" ? new Text(source.read(), source.mark()) : undefined
		}
	}
	Inline.addParser(Text.parse, -1)
}
