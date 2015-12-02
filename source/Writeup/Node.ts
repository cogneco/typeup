/// <reference path="../Error/Region" />

module Cogneco.Writeup {
	export abstract class Node {
		constructor(private region: Error.Region) {
		}
		getRegion(): Error.Region { return this.region }
		abstract toHtml(variables: { [name: string] : string }): string
	}
}
