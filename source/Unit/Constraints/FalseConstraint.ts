/// <reference path="Constraint" />

module Cogneco.Unit.Constraints {
	export class FalseConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return false }
		test(value: any): boolean {
			return value == false
		}
	}
}
