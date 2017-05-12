import { Error, IO } from "@cogneco/mend"

import { File } from "./File"

import { Renderer } from "./Renderer"
import { Source } from "./Source"
import { CommentStripper } from "./CommentStripper"
import { Block } from "./Block/Block"

// Used via dependency injection in Block
import "./Block/Heading"
import "./Block/Assignment"
import "./Block/UnorderedList"
import "./Block/OrderedList"
import "./Block/CodeBlock"
import "./Block/MathBlock"
import "./Block/Figure"
import "./Block/Video"
import "./Block/Import"

export class Document extends File {
	constructor(content: Block[], region: Error.Region) {
		super(content, region)
	}
	render(renderer?: Renderer): string {
		if (!renderer)
			renderer = new Renderer()
		return renderer.render("document", { content: super.render(renderer) })
	}
	toObject(): any {
		return { type: "Document", content: super.toObject() }
	}
	toJson(indent?: string): string {
		if (!indent)
			indent = ""
		return JSON.stringify(this.toObject(), null, indent)
	}
	static parse(reader: IO.Reader, handler: Error.Handler): Document {
		const source = new Source(new CommentStripper(reader), handler)
		return new Document(Block.parseAll(source), source.mark())
	}
	static open(path: string, handler: Error.Handler): Document {
		return Document.parse(IO.Reader.open(path, "tup"), handler)
	}
}
