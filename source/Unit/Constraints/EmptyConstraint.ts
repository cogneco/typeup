/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class EmptyConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return 0 }
		test(value: string | any[]): boolean {
			return value.length == 0
		}
	}
}
