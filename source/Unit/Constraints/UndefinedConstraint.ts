/// <reference path="Constraint" />

module Cogneco.Unit.Constraints {
	export class UndefinedConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return undefined }
		test(value: any): boolean {
			return value === undefined
		}
	}
}
