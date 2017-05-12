import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"

export class Video extends ContentBlock<Inline> {
	constructor(private source: string, private classes: string[], content: Inline[], region: Error.Region) {
		super(content, region)
	}
	private getType(): string {
		let result: string
		const match = this.source.match(/\.([a-z,A-Z,0-9]+)$/)
		if (match && match.length > 1)
			switch (match[1]) {
				case "ogg":
					result = "video/ogg"
					break
				case "mp4":
					result = "video/mp4"
					break
				default:
					break
			}
		return result
	}
	render(renderer: Renderer): string {
		return renderer.render("video", { source: this.source, type: this.getType(), classes: this.classes.join(" 	"), content: super.render(renderer) })
	}
	toObject(): any {
		const result = super.toObject()
		result.type = "Video"
		result.source = this.source
		return result
	}
	toString() {
		return `!video ${this.source} ${this.classes}\n${super.toString()}`
	}
	static parse(source: Source): Block[] {
		let result: Block[]
		if (source.readIf("!video ")) {
			const image = source.till([" ", "\n"]).readAll()
			const classes = source.readIf(" ") ? source.till("\n").readAll().split(" ") : []
			if (!source.readIf("\n"))
				source.raise("Expected newline as end of video.")
			const region = source.mark()
			result = Block.parse(source)
			if (result.length > 0 && result[0] instanceof Paragraph)
				result[0] = new Video(image, classes, (result[0] as Paragraph).getContent(), region)
			else
				result.unshift(new Video(image, classes, [], region))
		}
		return result
	}
}
Block.addParser(Video.parse)
