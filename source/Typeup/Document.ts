import * as Error from "../U10sil/Error/Handler"
import * as IO from "../U10sil/IO"

import { Renderer } from "./Renderer"
import { Node } from "./Node"
import { Block } from "./Block"
import { Source } from "./Source"
import { EmptyLine } from "./EmptyLine"
import { Paragraph } from "./Paragraph"

// Used via dependency injection in Block
import "./Paragraph"
import "./Heading"
import "./EmptyLine"
import "./Assignment"
import "./UnorderedList"
import "./OrderedList"

export class Document extends Node {
	constructor(private content: Block[], region: Error.Region) {
		super(region)
	}
	render(renderer?: Renderer): string {
		if (!renderer)
			renderer = new Renderer()
		var body = ""
		for (var i = 0; i < this.content.length; i++)
			body += this.content[i].render(renderer)
		return renderer.render("document", { "content": body })
	}
	toObject(): any {
		return { "type": "Document", "content": this.content.map(element => element.toObject()) }
	}
	toJson(indent?: string): string {
		if (!indent)
			indent = ""
		return JSON.stringify(this.toObject(), null, indent)
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
	static parse(reader: IO.Reader, handler: Error.Handler): Document {
		var source = new Source(reader, handler)
		return new Document(Block.parseAll(source), source.mark())
	}
	static open(path: string, handler: Error.Handler): Document {
		return Document.parse(IO.Reader.open(path, "tup"), handler)
	}
}
