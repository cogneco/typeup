import { Error, IO, Uri } from "@cogneco/mend"

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
		let result = ""
		for (const c of this.content)
			result += c.render(renderer)
		return result
	}
	toObject(): any {
		return this.content.map(element => element.toObject())
	}
	toString(): string {
		let result = ""
		let wasParagraph = false
		for (const c of this.content) {
			const isParagraph = c instanceof Paragraph
			if (isParagraph && wasParagraph)
				result += "\n"
			result += c.toString()
			wasParagraph = isParagraph
		}
		return result
	}
	static parse(reader: IO.Reader | undefined, handler: Error.Handler): File | undefined {
		let result: File | undefined
		if (reader) {
			const source = new Source(new CommentStripper(reader), handler)
			result = new File(Block.parseAll(source) || [], source.mark())
		}
		return result
	}
	static open(path: string, handler: Error.Handler): File | undefined {
		const locator = Uri.Locator.parse(path)
		return locator ? File.parse(IO.Reader.open(locator), handler) : undefined
	}
}
