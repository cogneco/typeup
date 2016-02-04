/// <reference path="Node" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export abstract class Inline extends Node {
		constructor(region: U10sil.Error.Region) {
			super(region)
		}
		private static parsers: { parse: ((source: Source) => Inline), priority: number }[] = []
		static addParser(parser: (source: Source) => Inline, priority = 0) {
			Inline.parsers.push({ parse: parser, priority: priority})
			Inline.parsers = Inline.parsers.sort((left, right) => right.priority - left.priority)
		}
		static parse(source: Source): Inline {
			var result: Inline
			var i = 0
			if (source.peek() != "\n")
				do
					result = Inline.parsers[i++].parse(source)
				while (!result && i < Inline.parsers.length)
			return result
		}
		static parseAll(source: Source): Inline[] {
			var result: Inline[] = []
			var r: Inline
			while ((r = Inline.parse(source)))
				result.push(r)
			if (source.peek() != "\n")
				source.raise("Expected end of line.")
			else
				source.read()
			return result
		}
	}
}
