/// <reference path="../U10sil/Error/Region" />

module Cogneco.Writeup {
	export abstract class Node {
		constructor(private region: U10sil.Error.Region) {
		}
		getRegion(): U10sil.Error.Region { return this.region }
		abstract toHtml(variables: { [name: string] : string }): string
	}
}
