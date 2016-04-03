import * as Error from "../U10sil/Error/Region"
import { Renderer } from "./Renderer"

export abstract class Node {
	constructor(private region: Error.Region) {
	}
	getRegion(): Error.Region { return this.region }
	abstract render(renderer: Renderer): string
	abstract toObject(): any
}
