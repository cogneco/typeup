import * as Error from "../../U10sil/Error/Region"
import { File } from "../File"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"
import { ContentBlock } from "./ContentBlock"
import { Paragraph } from "./Paragraph"
import { Inline } from "../Inline/Inline"
import * as Uri from "../../U10sil/Uri/Locator"

module Cogneco.Typeup {
	export class Import extends Block {
		constructor(private source: string, private content: File, region: Error.Region) {
			super(region)
		}
		render(renderer: Renderer): string {
			return this.content.render(renderer)
		}
		toObject(): any {
			return { "type": "Import", "source": this.source, "content": this.content.toObject() }
		}
		toString() {
			return `!import ${this.source} \n`
		}
		static parse(source: Source): Block[] {
			var result: Block[]
			if (source.readIf("!import ")) {
				var path = source.till(["\n"]).readAll()
				if (!source.readIf("\n"))
					source.raise("Expected newline as end of import.")
				var region = source.mark()
				var importPath = Uri.Locator.parse(path + ".tup")
				var currentPath = Uri.Locator.parse(region.getResource())
				var location = importPath.resolve(currentPath)
				var content = File.open((location.isRelative() ? "" : "/") + location.getPath().join("/"), source)
				result = [ new Import(path, content, region) ]
			}
			return result
		}
	}
	Block.addParser(Import.parse)
}
