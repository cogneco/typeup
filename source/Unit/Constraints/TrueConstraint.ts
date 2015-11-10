/// <reference path="Constraint" />

module Cogneco.Unit.Constraints {
	export class TrueConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return true }
		test(value: any): boolean {
			return value == true
		}
	}
}
