/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Iterator" />
/// <reference path="../ArrayIterator" />

module Magic.Utilities.Tests {
	import Is = Unit.Constraints.Is
	export class ArrayIteratorTest extends Unit.Fixture {
		constructor() {
			super("Utilitites.ArrayIterator")
			this.add("empty", () => {
				this.expect(new ArrayIterator([]).next(), Is.Undefined())
			})
			this.add("integers", () => {
				var integers = [1, 2, 4, 8, 16]
				var iterator = new ArrayIterator(integers)
				integers.forEach(value => {
					this.expect(iterator.next(), Is.Equal().To(value))
				});
				this.expect(iterator.next(), Is.Undefined())
			})
		}
	}
	Unit.Fixture.add(new ArrayIteratorTest())
}
