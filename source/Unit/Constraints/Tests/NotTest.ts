/// <reference path="../../Fixture" />
/// <reference path="../../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class NotTest extends Fixture {
		constructor() {
			super("Unit.Constraints.Not")
			this.add("foobar is not null", () => {
				this.expect("foobar", Is.Not().Null())
			})
			this.add("foobar is not equal to moobar", () => {
				this.expect("foobar", Is.Not().Equal().To("moobar"))
			})
			this.add("foo === bar is not true", () => {
				this.expect("foo" === "bar", Is.Not().True())
			})
			this.add("foo !== bar is not false", () => {
				this.expect("foo" !== "bar", Is.Not().False())
			})
			this.add("null is not undefined", () => {
				this.expect(null, Is.Not().Undefined())
			})
			this.add("undefined is not null", () => {
				this.expect(undefined, Is.Not().Null())
			})
			this.add("empty string is not null nor undefined", () => {
				this.expect("", Is.Not().NullOrUndefined())
			})
		}
	}
	Fixture.add(new NotTest())
}
