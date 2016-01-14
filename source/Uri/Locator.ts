/// <reference path="Authority" />

module Cogneco.Uri {
	export class Locator {
		constructor(private scheme: string[], private authority: Authority, private path: string[], private query: Object, private fragment: string) {
		}
		getScheme(): string[] {
			return this.scheme
		}
		getAuthority(): Authority {
			return this.authority
		}
		getPath(): string[] {
			return this.path
		}
		getQuery(): Object {
			return this.query
		}
		getFragment(): string {
			return this.fragment
		}
		toString(): string {
			var result
			if (this.scheme)
				result = this.scheme.join("+") + "://"
			if (this.authority)
				result += this.authority.toString()
			if (this.path)
				result += this.path.join("/")
			if (this.query)
				result += "?" + this.query.toString()
			if (this.fragment)
				result += "#" + this.fragment
			return result
		}
		static parse(data: string): Locator {
			var result: Locator
			switch (data) {
				case undefined:
					break
				case null:
					result = null
					break
				default:
					var splitted = data.split("://", 2)
					var scheme = splitted.length > 1 ? splitted.pop().split("+") : undefined
					data = splitted.pop()
					var index: number
					var fragment: string
					if (data && (index = data.lastIndexOf("#")) > -1) {
						fragment = data.slice(index + 1)
						data = data.slice(0, index)
					}
					var query: Object
					if (data && (index = data.lastIndexOf("?")) > -1) {
						query = new Object()
						data.slice(index + 1).split(";").forEach(element => {
							splitted = element.split("=")
							query[splitted.pop()] = splitted.pop()
						});
						data = data.slice(0, index)
					}
					var authority: Authority
					if (data && !data.match(/^(.\/|..\/|\//)) {
						splitted = data.split("/")
						authority = Authority.parse(splitted.pop())
						data = data.length > 0 ? "/" + splitted.pop() : undefined
					}
					var path: string[]
					if (data)
						path = splitted.pop().split("/")
					result = new Locator(scheme, authority, path, query, fragment)
					break
			}
			return result
		}
	}
}
