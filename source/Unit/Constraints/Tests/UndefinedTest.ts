/// <reference path="../../Fixture" />
/// <reference path="../../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class UndefinedTest extends Fixture {
		constructor() {
			super("Unit.Constraints.Undefined")
			this.add("undefined 1", () => {
				this.expect(undefined, Is.Undefined())
			})
			this.add("undefined 2", () => {
				var s: string
				this.expect(s, Is.Undefined())
			})
			this.add("undefined 3", () => {
				var s: string = ""
				this.expect(s, Is.Not().Undefined())
			})
		}
	}
	Fixture.add(new UndefinedTest())
}
