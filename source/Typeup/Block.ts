import { Node } from "./Node"
import { Source } from "./Source"
import { Inline } from "./Inline"
import * as Error from "../U10sil/Error/Region"
// Used via dependency injection in Inline
import "./Text"
import "./Emphasize"

export abstract class Block extends Node {
	constructor(region: Error.Region) {
		super(region)
	}
	private static parsers: { parse: ((source: Source, indent: number) => Block[]), priority: number }[] = []
	static addParser(parser: (source: Source, indent: number) => Block[], priority?: number) {
		if (!priority)
			priority = 0
		Block.parsers.push({ parse: parser, priority: priority})
		Block.parsers = Block.parsers.sort((left, right) => right.priority - left.priority)
	}
	static parse(source: Source, indent?: number): Block[] {
		if (!indent)
			indent = 0
		var result: Block[]
		var i = 0
		do
			result = Block.parsers[i++].parse(source, indent)
		while (!result && i < Block.parsers.length)
		return result
	}
	static parseAll(source: Source, indent?: number): Block[] {
		var result: Block[] = []
		var r: Block[]
		while ((r = Block.parse(source, indent)) && r.length > 0)
			result = result.concat(r)
		return result
	}
}
