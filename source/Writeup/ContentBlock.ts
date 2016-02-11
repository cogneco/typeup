/// <reference path="Block" />
/// <reference path="Inline" />

module Cogneco.Writeup {
	export abstract class ContentBlock extends Block {
		private content: Inline[] = []
		constructor(content: Inline[], region: U10sil.Error.Region) {
			super(region)
			var last: Text
			for (var i = 0; i < content.length; i++) {
				if (content[i] instanceof(Text))
					last = last ? last.merge(<Text>content[i]) : <Text>content[i]
				else {
					if (last) {
						this.content.push(last)
						last = null
					}
					this.content.push(content[i])
				}
			}
			if (last) {
				this.content.push(last)
				last = null
			}
		}
		getContent(): Inline[] { return this.content }
		render(renderer: Renderer): string {
			var result = ""
			for (var i = 0; i < this.content.length; i++)
				result += this.content[i].render(renderer)
			return result
		}
		toString(): string {
			var result = ""
			for (var i = 0; i < this.content.length; i++)
				result += this.content[i].toString()
			return result + "\n"
		}
	}
}
