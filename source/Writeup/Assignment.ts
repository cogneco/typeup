/// <reference path="Node" />
/// <reference path="Block" />

module Cogneco.Writeup {
	export class Assignment extends Block {
		constructor(private name: string, private value: string, region: Error.Region) {
			super(region)
		}
		static parse(source: Source): Block {
			var result: Block
			var i = 1
			while (source.peek(i).charAt(i - 1).match(/[a-z]|[A-Z]|[0-9]|_|-/i))
				i++
			if (source.peek(i + 2).slice(-3) == " = ") {
				var name = source.read(i - 1)
				source.read(i + 2) // consume " = "
				var value = ""
				while (source.peek() != "\n")
					value += source.read()
				result = new Assignment(name, value, source.mark())
			}
			return result
		}
	}
	Block.addParser(Assignment.parse)
}
