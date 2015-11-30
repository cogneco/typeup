/// <reference path="Block" />
/// <reference path="Inline" />

module Cogneco.Writeup {
	export abstract class ContentBlock extends Block {
		constructor(private content: Inline[], region: Error.Region) {
			super(region)
		}
		toString() {
			var result = ""
			for (var i = 0; i < this.content.length; i++)
				result += this.content[i].toString()
			return result + "\n"
		}

	}
}
