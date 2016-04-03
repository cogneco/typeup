import { Node } from "./Node"
import { Source } from "./Source"
import * as Error from "../U10sil/Error/Region"

export abstract class Inline extends Node {
	constructor(region: Error.Region) {
		super(region)
	}
	private static parsers: { parse: ((source: Source, until: string) => Inline[]), priority: number }[] = []
	static addParser(parser: (source: Source, until: string) => Inline[], priority?: number) {
		if (!priority)
			priority = 0
		Inline.parsers.push({ parse: parser, priority: priority})
		Inline.parsers = Inline.parsers.sort((left, right) => right.priority - left.priority)
	}
	static parse(source: Source, until?: string): Inline[] {
		if (!until)
			until = "\n"
		var result: Inline[] = []
		while (source.peek() && source.peek().length > 0 && source.peek() != "\0" && !source.peekIs(until) && Inline.parsers.some(p => {
				var r = p.parse(source, until)
				if (r)
					result = result.concat(r)
				return !!r
			}))
			;
		return result
	}
}
