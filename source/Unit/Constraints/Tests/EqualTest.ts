/// <reference path="../../Fixture" />
/// <reference path="../../Constraints/Is" />
/// <reference path="../../Constraints/NotModifier" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class EqualTest extends Fixture {
		constructor() {
			super("Unit.Constraints.Equal")
			this.add("true is true", () => {
				this.expect(true, Is.Equal().To(true))
			})
			this.add("false is false", () => {
				this.expect(false, Is.Equal().To(false))
			})
			this.add("null equals null", () => {
				this.expect(null, Is.Equal().To(null))
			})
			this.add("undefined equals undefined", () => {
				this.expect(undefined, Is.Equal().To(undefined))
			})
			this.add("\"foo\" equals \"foo\"", () => {
				this.expect("foo", Is.Equal().To("foo"))
			})
		}
	}
	Fixture.add(new EqualTest())
}
