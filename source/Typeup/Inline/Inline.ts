import { Error } from "@cogneco/mend"
import { Node } from "../Node"
import { Source } from "../Source"

export abstract class Inline extends Node {
	constructor(region: Error.Region) {
		super(region)
	}
	private static parsers: { parse: ((source: Source) => Inline[] | undefined), priority: number }[] = []
	static addParser(parser: (source: Source) => Inline[] | undefined, priority?: number) {
		if (!priority)
			priority = 0
		Inline.parsers.push({ parse: parser, priority})
		Inline.parsers = Inline.parsers.sort((left, right) => right.priority - left.priority)
	}
	static parse(source: Source): Inline[] | undefined {
		let result: Inline[] | undefined
		let peeked: string | undefined
		while ((peeked = source.peek()) && peeked.length > 0 && Inline.parsers.some(p => {
				const r = p.parse(source)
				if (r)
					result = result ? result.concat(r) : r
				return !!r
			}))
			;
		return result
	}
}
