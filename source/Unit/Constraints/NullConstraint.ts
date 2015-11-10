/// <reference path="Constraint" />

module Cogneco.Unit.Constraints {
	export class NullConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return null }
		test(value: any): boolean {
			return value === null
		}
	}
}
