import { Error } from "@cogneco/mend"
import { Node } from "../Node"
import { Renderer } from "../Renderer"
import { Block } from "./Block"

export abstract class ContentBlock<T extends Node> extends Block {
	constructor(private content: T[], region: Error.Region) {
		super(region)
	}
	getContent(): T[] { return this.content }
	async render(renderer: Renderer): Promise<string> {
		return (await Promise.all(this.content.map(async c => c.render(renderer)))).join("")
	}
	toString(): string {
		return this.content.map(c => c.toString()).join("")
	}
	toObject(): any {
		return { content: this.content.map(c => c.toObject()) }
	}
}
