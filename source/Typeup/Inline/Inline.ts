import { Error } from "@cogneco/mend"
import { Node } from "../Node"
import { Source } from "../Source"

export abstract class Inline extends Node {
	constructor(region: Error.Region) {
		super(region)
	}
	private static parsers: { parse: ((source: Source) => Inline[]), priority: number }[] = []
	static addParser(parser: (source: Source) => Inline[], priority?: number) {
		if (!priority)
			priority = 0
		Inline.parsers.push({ parse: parser, priority})
		Inline.parsers = Inline.parsers.sort((left, right) => right.priority - left.priority)
	}
	static parse(source: Source): Inline[] {
		let result: Inline[] = []
		while (source.peek() && source.peek().length > 0 && source.peek() && Inline.parsers.some(p => {
				const r = p.parse(source)
				if (r)
					result = result.concat(r)
				return !!r
			}))
			;
		return result
	}
}
