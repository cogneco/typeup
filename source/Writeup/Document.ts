/// <reference path="Source" />
/// <reference path="Node" />
/// <reference path="Block" />

module Cogneco.Writeup {
	export class Document extends Node {
		constructor(private blocks: Block[], region: Error.Region) {
			super(region)
		}
		toString(): string {
			var result = ""
			for (var i = 0; i < this.blocks.length; i++)
				result += this.blocks[i].toString()
			return result
		}
		static parse(reader: IO.Reader, handler: Error.Handler): Document {
			var source = new Writeup.Source(reader, handler)
			return new Document(Block.parseAll(source), source.mark())
		}
		static open(path: string, handler: Error.Handler): Document {
			return Document.parse(IO.Reader.open(path, "wup"), handler)
		}
	}
}
