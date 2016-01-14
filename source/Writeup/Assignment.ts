/// <reference path="Node" />
/// <reference path="Block" />

module Cogneco.Writeup {
	export class Assignment extends Block {
		constructor(private name: string, private value: string, region: Error.Region) {
			super(region)
		}
		getName(): string { return this.name }
		getValue(): string { return this.value }
		toHtml(variables: { [name: string]: string }): string {
			switch(this.name) {
				case "template":
					variables[this.name] = this.value
				break
				default:
					variables[this.name] = this.value
				break
			}
			return ""
		}
		toString() {
			return this.name + " = " + this.value + "\n"
		}
		static parse(source: Source): Block {
			var result: Block
			var i = 1
			while (source.peek(i).charAt(i - 1).match(/[a-z]|[A-Z]|[0-9]|_|-/i))
				i++
			if (source.peek(i + 2).slice(-3) == " = ") {
				var name = source.read(i - 1)
				source.read(3) // consume " = "
				var value = ""
				while (source.peek() != "\n")
					value += source.read()
				source.read() // consume "\n"
				result = new Assignment(name, value, source.mark())
			}
			return result
		}
	}
	Block.addParser(Assignment.parse)
}
