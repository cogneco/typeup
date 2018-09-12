import { Error, Uri } from "@cogneco/mend"
import { File } from "../File"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"

export class Import extends Block {
	constructor(private source: string, private content: File, region: Error.Region) {
		super(region)
	}
	async render(renderer: Renderer): Promise<string> {
		return this.content.render(renderer)
	}
	toObject(): any {
		return { type: "Import", source: this.source, content: this.content.toObject() }
	}
	toString() {
		return `!import ${this.source} \n`
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		if (source.readIf("!import ")) {
			const path = source.till("\n").readAll()
			if (!path)
				source.raise("Expected URL to subdocument to import.", Error.Level.Recoverable)
			else if (!source.readIf("\n"))
				source.raise("Expected newline as end of import.", Error.Level.Recoverable)
			else {
				const region = source.mark()
				const importPath = Uri.Locator.parse(path + ".tup")
				if (!importPath)
					source.raise("Unable to parse imported path.", Error.Level.Recoverable)
				else {
					const currentPath = region.resource
					const location = importPath.resolve(currentPath)
					const content = File.open((location.isRelative ? "" : "/") + location.path.join("/"), source)
					if (!content)
						source.raise("Unable to open imported file.", Error.Level.Recoverable)
					else
						result = [ new Import(path, content, region) ]
				}
			}
		}
		return result
	}
}
Block.addParser(Import.parse)
