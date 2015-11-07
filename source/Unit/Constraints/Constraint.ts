/// <reference path="Modifier" />

module Magic.Unit.Constraints {
	export class Constraint extends Modifier {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { throw "getExpectedValue() - not implemented" }
	}
}
