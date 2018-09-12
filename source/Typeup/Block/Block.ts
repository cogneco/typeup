import { Node } from "../Node"
import { Source } from "../Source"
import { Error } from "@cogneco/mend"
// Used via dependency injection in Inline
import "../Inline/Text"
import "../Inline/Emphasize"
import "../Inline/Link"
import "../Inline/Code"
import "../Inline/Math"

export abstract class Block extends Node {
	constructor(region: Error.Region) {
		super(region)
	}
	private static parsers: { parse: ((source: Source) => Block[] | undefined), priority: number }[] = []
	static addParser(parser: (source: Source) => Block[] | undefined, priority?: number) {
		if (!priority)
			priority = 0
		Block.parsers.push({ parse: parser, priority})
		Block.parsers = Block.parsers.sort((left, right) => right.priority - left.priority)
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		let i = 0
		do
			result = Block.parsers[i++].parse(source)
		while (!result && i < Block.parsers.length)
		return result
	}
	static parseAll(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		let r: Block[] | undefined
		while ((r = Block.parse(source)) && r.length > 0)
			result = result ? result.concat(r) : r
		Block.filters.forEach(filter => result = result && result.filter(filter))
		return result
	}
	private static filters: ((block: Block) => boolean)[] = []
	static addFilter(filter: (block: Block) => boolean) {
		Block.filters.push(filter)
	}
}
