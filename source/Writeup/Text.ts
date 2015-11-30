/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export class Text extends Inline {
		constructor(private value: string, region: Error.Region) {
			super(region)
		}
		toString(): string {
			return this.value
		}
		static parse(source: Source): Inline {
			return source.peek() && source.peek().length > 0 && source.peek() != "" && source.peek() != "\n" ? new Text(source.read(), source.mark()) : undefined
		}
	}
	Inline.addParser(Text.parse, -1)
}
