/// <reference path="Block" />

module Cogneco.Typeup {
	export class EmptyLine extends Block {
		constructor(region: U10sil.Error.Region) {
			super(region)
		}
		render(render: Renderer): string {
			return ""
		}
		toObject(): any {
			return { "type": "EmptyLine" }
		}
		toString(): string {
			return "\n"
		}
		static parse(source: Source): Block[] {
			var result: Block[]
			if (source.peek() == "\n") {
				source.read()
				result = [new EmptyLine(source.mark())]
				var next = Block.parse(source)
				if (next && next.length > 0)
					result = result.concat(next)
			}
			return result
		}
	}
	Block.addParser(EmptyLine.parse)
}