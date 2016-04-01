/// <reference path="Block" />
/// <reference path="Inline" />

module Cogneco.Typeup {
	export abstract class ContentBlock<T: Node> extends Block {
		constructor(private content: T[], region: U10sil.Error.Region) {
			super(region)
		}
		getContent(): T[] { return this.content }
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
