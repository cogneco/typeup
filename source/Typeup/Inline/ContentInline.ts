import { Error } from "@cogneco/mend"
import { Renderer } from "../Renderer"
import { Inline } from "./Inline"

export abstract class ContentInline extends Inline {
	constructor(private content: Inline[], region: Error.Region) {
		super(region)
	}
	render(renderer: Renderer): string {
		return this.content.map(c => c.render(renderer)).join("")
	}
	toString(): string {
		return this.content.map(c => c.toString()).join("")
	}
	toObject(): any {
		return { "content": this.content.map(c => c.toObject()) }
	}
}
