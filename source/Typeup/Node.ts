import { Error } from "@cogneco/mend"
import { Renderer } from "./Renderer"

export abstract class Node {
	protected constructor(private region: Error.Region) {
	}
	getRegion(): Error.Region { return this.region }
	abstract render(renderer: Renderer): Promise<string>
	abstract toObject(): any
}
