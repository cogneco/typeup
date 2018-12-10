import { Template } from "./Template"

export class Renderer {
	private variables: { [name: string]: string } = {}
	private template: Template
	constructor() {
		const template: any = {
			"name": "document",
			"description": "Document template used for testing.",
			"output": "html",
			"dependencies": [
			],
			"tags": { /* tslint:disable:no-invalid-template-strings max-line-length */
				"*": "<h1><code>${content}</code></h1>",
				"document": "<!doctype html>\n<html>\n<head>\n<meta charset='UTF-8'>\n<title>${title}</title>\n<meta name='author' content='${author}'/>\n<meta name='date' content='${date}'/>\n<link rel='stylesheet' href='http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css'>\n<script src='http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/highlight.min.js'></script>\n<script>hljs.initHighlightingOnLoad();</script>\n<link rel='stylesheet' type='text/css' href='${class}.css'>\n</head>\n<body>\n<header><h1>${title}</h1></header>\n${content}</body>\n</html>\n",
				"heading": "<h${level}>${content}</h${level}>\n",
				"paragraph": "<p>${content}</p>\n",
				"list item": "<li>${content}</li>\n",
				"unordered list": "<ul>\n${content}</ul>\n",
				"ordered list": "<ol>\n${content}</ol>\n",
				"emphasize": "<em>${content}</em>",
				"link": "<a href='${target}'>${content}</a>",
				"code": "<code>${content}</code>",
				"codeblock": "<figure>\n<pre><code class='${language}'>${code}</code></pre>\n<figcaption>${content}</figcaption>\n</figure>\n",
				"figure": "<figure>\n<img src='${source}' class='${classes}' />\n<figcaption>${content}</figcaption>\n</figure>\n",
				"video": "<figure>\n<video controls class='${classes}'><source src='${source}' type='${type}'>\n<figcaption>${content}</figcaption>\n</figure>\n",
				"math": "${html}",
				"mathblock": "<figure>\n${html}\n<figcaption>${content}</figcaption>\n</figure>\n",
				"chapter": "<section class='chapter'>\n${content}</section>\n",
				"section": "<section class='section'>\n${content}</section>\n",
				"table": "<table class='${classes}'>\n${rows}<caption>${content}</caption>\n</table>\n",
				"table row": "<tr>${content}</tr>\n",
				"table header": "<th>${content}</th>",
				"table cell": "<td>${content}</td>",
			}, /* tslint:enable:no-invalid-template-strings max-line-length */
		}
		this.template = template as Template
	}
	getVariable(name: string): string {
		return this.variables[name]
	}
	setVariable(name: string, value: string) {
		this.variables[name] = value
	}
	setTemplate(template: Template) {
		if (template)
			this.template = template
	}
	render(tag: string, locals: { [name: string]: string }): string {
		const template = this.template.tags[tag]
		return template ? template.replace(/\${(.*?)}/g, (_, variable) => {
			return locals[variable] ? locals[variable] : this.variables[variable] ? this.variables[variable] : ""
		}) : this.render("*", { content: ` ERROR: Tag "${tag}" undefined in template ${this.template.name} ` })
	}
}
