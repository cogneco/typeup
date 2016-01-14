/// <reference path="User" />
/// <reference path="Endpoint" />

module Cogneco.Uri {
	export class Authority {
		constructor(private user: User, private endpoint: Endpoint) {
		}
		getUser(): User {
			return this.user
		}
		getEndpoint(): Endpoint {
			return this.endpoint
		}
		toString(): string {
			var result
			if (this.user)
				result = this.user.toString() + "@"
			if (this.endpoint)
				result += this.endpoint.toString()
			return result
		}
		static parse(data: string): Authority {
			var result: Authority
			if (data) {
				var splitted = data.split("@", 2)
				var user: User
				var endpoint: Endpoint
				if (splitted.length == 2)
					user = User.parse(splitted.pop())
				endpoint = Endpoint.parse(splitted.pop())
				result = new Authority(user, endpoint)
			}
			return result
		}
	}
}
