/// <reference path="../U10sil/Error/Region" />
/// <reference path="Renderer" />


module Cogneco.Typeup {
	export abstract class Node {
		constructor(private region: U10sil.Error.Region) {
		}
		getRegion(): U10sil.Error.Region { return this.region }
		abstract render(renderer: Renderer): string
		abstract toObject(): any
	}
}
