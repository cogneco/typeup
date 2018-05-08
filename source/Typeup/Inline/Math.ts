import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Inline } from "./Inline"

import * as MathJaxNode from "mathjax-node"

export class Math extends Inline {
	constructor(private content: string, region: Error.Region) {
		super(region)
	}
	async render(renderer: Renderer): Promise<string> {
		MathJaxNode.config({
			MathJax: {
			},
		})
		MathJaxNode.start()
		const html = await new Promise<string>((resolve, reject) => MathJaxNode.typeset({
			math: this.content,
			format: "inline-TeX",
			mml: true,
		}, data => {
			if (data.errors)
				reject(data.errors)
			else
				resolve(data.mml)
		}))
		return renderer.render("math", { html, content: this.content })
	}
	toObject(): any {
		return { type: "Math", content: this.content }
	}
	toString(): string {
		return "$" + super.toString() + "$"
	}
	static parse(source: Source): Inline[] | undefined {
		let result: Inline[] | undefined
		if (source.readIf("$")) {
			result = [new Math(source.till("$").readAll() || "", source.mark())]
			if (!source.readIf("$"))
				source.raise("Expected \"$\" as end of inline math.")
		}
		return result
	}
}
Inline.addParser(Math.parse)
