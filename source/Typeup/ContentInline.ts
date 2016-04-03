import * as Error from "../U10sil/Error/Region"
import { Inline } from "./Inline"
import { Renderer } from "./Renderer"

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
