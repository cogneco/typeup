/// <reference path="ContentBlock" />
/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Typeup {
	export class ListItem extends ContentBlock {
		constructor(content: Inline[], region: U10sil.Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("list item", { "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "ListItem"
			return result
		}
		toString(symbol = " - "): string {
			return symbol + super.toString()
		}
	}
}
