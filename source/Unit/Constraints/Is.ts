/// <reference path="FalseConstraint" />
/// <reference path="TrueConstraint" />
/// <reference path="NullConstraint" />
/// <reference path="NullOrUndefinedConstraint" />
/// <reference path="UndefinedConstraint" />
/// <reference path="EqualModifier" />
/// <reference path="NotModifier" />
/// <reference path="EmptyConstraint" />

module Magic.Unit.Constraints {
	export class Is {
		static True() { return new TrueConstraint() }
		static False() { return new FalseConstraint() }
		static Null() { return new NullConstraint() }
		static NullOrUndefined() { return new NullOrUndefinedConstraint() }
		static Undefined() { return new UndefinedConstraint() }
		static Equal() { return new EqualModifier() }
		static Not() { return new NotModifier() }
		static Empty() { return new EmptyConstraint() }
	}
}
