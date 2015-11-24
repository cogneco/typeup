/// <reference path="Source" />
/// <reference path="Node" />
/// <reference path="Block" />

module Cogneco.Writeup {
	export class Document extends Node {
		constructor(private blocks: Block[], region: Error.Region) {
			super(region)
		}
		static parse(source: Source): Document {
			return new Document(Block.parseAll(source), source.mark())
		}
	}
}
