/// <reference path="Node" />
/// <reference path="Source" />

module Cogneco.Typeup {
	export abstract class Inline extends Node {
		constructor(region: U10sil.Error.Region) {
			super(region)
		}
		private static parsers: { parse: ((source: Source, until: string) => Inline[]), priority: number }[] = []
		static addParser(parser: (source: Source, until: string) => Inline[], priority = 0) {
			Inline.parsers.push({ parse: parser, priority: priority})
			Inline.parsers = Inline.parsers.sort((left, right) => right.priority - left.priority)
		}
		static parse(source: Source, until = "\n"): Inline[] {
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
}
