import { Template } from "./Template"

import * as defaultTemplate from "../../docs/templates/document.json"

export class Renderer {
	private variables: { [name: string]: string } = {}
	private template: Template
	constructor() {
		this.template = defaultTemplate
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
