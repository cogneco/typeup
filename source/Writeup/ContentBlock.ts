/// <reference path="Block" />
/// <reference path="Inline" />

module Cogneco.Writeup {
	export abstract class ContentBlock extends Block {
		constructor(private content: Inline[], region: Error.Region) {
			super(region)
		}
	}
}
