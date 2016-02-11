/// <reference path="Template" />

module Cogneco.Writeup {
	export class Renderer {
		private variables: { [name: string]: string } = {}
		private template: Template
		constructor() {
		}
		getVariable(name: string): string {
			return this.variables[name]
		}
		setVariable(name: string, value: string) {
			this.variables[name] = value
		}
		setTemplate(template: Template) {
			this.template = template
		}
		render(tag: string, locals: { [name: string]: string }) {
			return this.template.tags[tag].replace(/\${(.*?)}/g, (_, variable) => {
				return locals[variable] ? locals[variable] : this.variables[variable]
			})
		}
	}
}
