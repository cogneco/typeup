module Cogneco.Uri {
	export class User {
		constructor(private name: string, private password: string) {
		}
		getName(): string {
			return this.name
		}
		getPassword(): string {
			return this.password
		}
		toString(): string {
			var result
			if (this.name)
				result = this.name
			if (this.password)
				result += ":" + this.password
			return result
		}
		static parse(data: string): User {
			var result: User
			if (data) {
				var splitted = data.split(":", 2)
				result = new User(splitted[0], splitted[1])
			}
			return result
		}
	}
}
