/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class NullOrUndefinedConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return "null or undefined" }
		test(value: any): boolean {
			return value === null || value === undefined
		}
	}
}
