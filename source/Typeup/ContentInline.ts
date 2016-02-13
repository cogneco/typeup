/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Typeup {
	export abstract class ContentInline extends Inline {
		constructor(private content: Inline[], region: U10sil.Error.Region) {
			super(region)
		}
		render(renderer: Renderer): string {
			return this.content.map(c => c.render(renderer)).join("")
		}
		toString(): string {
			return this.content.map(c => c.toString()).join("")
		}
		toObject(): any {
			return { "content": this.content.map(c => c.toObject()) }
		}
	}
}
