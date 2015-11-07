/// <reference path="../../Fixture" />
/// <reference path="../../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class NullOrUndefinedTest extends Fixture {
		constructor() {
			super("Unit.Constraints.NullOrUndefined")
			this.add("null or undefined 1", () => {
				this.expect(null, Is.NullOrUndefined())
			})
			this.add("null or undefined 2", () => {
				this.expect(undefined, Is.NullOrUndefined())
			})
			this.add("null or undefined 3", () => {
				var s: string = null
				this.expect(s, Is.NullOrUndefined())
			})
			this.add("null or undefined 4", () => {
				var s: string = undefined
				this.expect(s, Is.NullOrUndefined())
			})
			this.add("null or undefined 5", () => {
				var s: string = ""
				this.expect(s, Is.Not().NullOrUndefined())
			})
		}
	}
	Fixture.add(new NullOrUndefinedTest())
}
