module Cogneco.Uri {
	export class Endpoint {
		constructor(private host: string[], private port: number) {
		}
		getHost(): string[] {
			return this.host
		}
		getPort(): number {
			return this.port
		}
		toString(): string {
			var result = this.host.join(".")
			if (this.port)
				result += ":" + this.port.toString()
			return result
		}
		static parse(data: string): Endpoint {
			var result: Endpoint
			if (data) {
				var splitted = data.split(":", 2)
				result = new Endpoint(splitted[0].split("."), splitted.length > 1 ? parseInt(splitted[1]) : undefined)
			}
			return result
		}
	}
}
