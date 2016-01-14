/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Locator" />

module Cogneco.Uri.Tests {
	import Is = Unit.Constraints.Is
	export class LocatorParseTest extends Unit.Fixture {
		constructor() {
			super("Uri.Locator.parse")
			this.add("undefined", () => {
				this.expect(Locator.parse(undefined), Is.Undefined())
			})
			this.add("null", () => {
				this.expect(Locator.parse(null), Is.Null())
			})
			this.add("empty", () => {
				this.expect(Locator.parse(""), Is.Undefined())
			})
		}
	}
	Unit.Fixture.add(new LocatorParseTest())
}
