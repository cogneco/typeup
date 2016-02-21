/// <reference path="Source" />
/// <reference path="Node" />
/// <reference path="Block" />
// Used via dependency injection in Block
/// <reference path="Paragraph" />
/// <reference path="Heading" />
/// <reference path="EmptyLine" />
/// <reference path="Assignment" />
/// <reference path="UnorderedList" />


module Cogneco.Typeup {
	export class Document extends Node {
		private content: Block[] = []
		constructor(content: Block[], region: U10sil.Error.Region) {
			super(region)
			this.content = content.filter(block => !(block instanceof(EmptyLine)))
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
		toJson(indent = ""): string {
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
		static parse(reader: U10sil.IO.Reader, handler: U10sil.Error.Handler): Document {
			var source = new Typeup.Source(reader, handler)
			return new Document(Block.parseAll(source), source.mark())
		}
		static open(path: string, handler: U10sil.Error.Handler): Document {
			return Document.parse(U10sil.IO.Reader.open(path, "wup"), handler)
		}
	}
}
