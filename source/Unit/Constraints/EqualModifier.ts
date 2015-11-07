/// <reference path="Modifier" />
/// <reference path="CompareConstraint" />

module Magic.Unit.Constraints {
	export class EqualModifier extends Modifier {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		To(correct: any): CompareConstraint {
			return new CompareConstraint(correct, (left, right) => { return left == right }, this)
		}
	}
}
