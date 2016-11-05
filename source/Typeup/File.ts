import * as Error from "../U10sil/Error/Handler"
import * as IO from "../U10sil/IO"

import { Renderer } from "./Renderer"
import { Node } from "./Node"
import { Source } from "./Source"
import { CommentStripper } from "./CommentStripper"
import { Block } from "./Block/Block"
import { EmptyLine } from "./Block/EmptyLine"
import { Paragraph } from "./Block/Paragraph"

export class File extends Node {
	constructor(private content: Block[], region: Error.Region) {
		super(region)
	}
	render(renderer: Renderer): string {
		var result = ""
		for (var i = 0; i < this.content.length; i++)
			result += this.content[i].render(renderer)
		return result
	}
	toObject(): any {
		return this.content.map(element => element.toObject())
	}
	toString(): string {
		var result = ""
		var wasParagraph = false
		for (var i = 0; i < this.content.length; i++) {
			var isParagraph = this.content[i] instanceof(Paragraph)
			if (isParagraph && wasParagraph)
				result += "\n"
			result += this.content[i].toString()
			wasParagraph = isParagraph
		}
		return result
	}
	static parse(reader: IO.Reader, handler: Error.Handler): File {
		var source = new Source(new CommentStripper(reader), handler)
		return new File(Block.parseAll(source), source.mark())
	}
	static open(path: string, handler: Error.Handler): File {
		return File.parse(IO.Reader.open(path, "tup"), handler)
	}
}
