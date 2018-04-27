import { Error, IO, Uri } from "@cogneco/mend"

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
	static parse(reader: IO.Reader | undefined, handler: Error.Handler): Document | undefined {
		let result: Document | undefined
		if (reader) {
			const source = new Source(new CommentStripper(reader), handler)
			result = new Document(Block.parseAll(source) || [], source.mark())
		}
		return result
	}
	static open(path: string | undefined, handler: Error.Handler): Document | undefined {
		const locator = Uri.Locator.parse(path)
		return locator ? Document.parse(IO.Reader.open(locator), handler) : undefined
	}
}
