/// <reference path="../../Fixture" />
/// <reference path="../../Constraints/Is" />
/// <reference path="../../Constraints/NotModifier" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class EmptyTest extends Fixture {
		constructor() {
			super("Unit.Constraints.Empty")
			this.add("empty string", () => {
				this.expect("", Is.Empty())
			})
			this.add("empty array", () => {
				this.expect([], Is.Empty())
			})
			this.add("string is not empty", () => {
				this.expect("foobar", Is.Not().Empty())
			})
			this.add("array is not empty", () => {
				this.expect([1, 2, 3], Is.Not().Empty())
			})
		}
	}
	Fixture.add(new EmptyTest())
}
