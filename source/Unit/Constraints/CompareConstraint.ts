/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class CompareConstraint extends Constraint {
		constructor(private correct: any, private comparer: (left: any, right: any) => boolean, parent: Modifier = null) {
			super(parent)
		}
		getExpectedValue(): any { return this.correct }
		test(value: any): boolean {
			return this.comparer(value, this.correct)
		}
	}
}
