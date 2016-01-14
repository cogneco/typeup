/// <reference path="Source" />
/// <reference path="Node" />
/// <reference path="Block" />

module Cogneco.Writeup {
	export class Document extends Node {
		private content: Block[] = []
		constructor(private location: string, content: Block[], region: Error.Region) {
			super(region)
			var last: Paragraph
			for (var i = 0; i < content.length; i++) {
				if (content[i] instanceof(Paragraph))
					last = last ? last.merge(<Paragraph>content[i]) : <Paragraph>content[i]
				else {
					if (last) {
						this.content.push(last)
						last = null
					}
					if (!(content[i] instanceof(EmptyLine)))
						this.content.push(content[i])
				}
			}
			if (last) {
				this.content.push(last)
				last = null
			}
		}
		toHtml(): string {
			var variables: { [name: string] : string } = {};
			variables["location"] = this.location
			var body = ""
			for (var i = 0; i < this.content.length; i++)
				body += this.content[i].toHtml(variables)
			return `<!doctype html><html><head></head><body>${body}</body></html>`
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
			var source = new Writeup.Source(reader, handler)
			return new Document(reader.getResource(), Block.parseAll(source), source.mark())
		}
		static open(path: string, handler: Error.Handler): Document {
			return Document.parse(IO.Reader.open(path, "wup"), handler)
		}
	}
}
