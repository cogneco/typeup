/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export class Text extends Inline {
		constructor(private value: string, region: U10sil.Error.Region) {
			super(region)
		}
		merge(other: Text): Text {
			return new Text(this.value + other.value, this.getRegion().merge(other.getRegion()))
		}
		toHtml(variables: { [name: string] : string }): string {
			return this.value
		}
		toObject(): any {
			return { "type": "Text", "value": this.value }
		}
		toString(): string {
			return this.value
		}
		static parse(source: Source): Inline {
			return source.peek() && source.peek().length > 0 && source.peek() != "\0" && source.peek() != "\n" ? new Text(source.read(), source.mark()) : undefined
		}
	}
	Inline.addParser(Text.parse, -1)
}
