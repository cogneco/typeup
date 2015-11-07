/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Iterator" />
/// <reference path="../BufferedIterator" />

module Magic.Utilities.Tests {
	import Is = Unit.Constraints.Is
	class StringIterator implements Iterator<string> {
		private position: number = 0
		constructor(private content: string) {
			if (!content)
				content = ""
		}
		next(): string {
			return this.position < this.content.length ? this.content.charAt(this.position++) : undefined
		}
	}
	export class BufferedIteratorTest extends Unit.Fixture {
		constructor() {
			super("Utilitites.BufferedIterator")
			this.add("empty string", () => {
				var bi = new BufferedIterator(new StringIterator(""))
				this.expect(bi.next(), Is.Equal().To(null))
			})
			this.add("iterate using peek()", () => {
				var testString = "let's iterate this string using peek()"
				var bi = new BufferedIterator(new StringIterator(testString))
				var result: string = ""
				while (bi.peek()) {
					result += bi.next()
				}
				this.expect(result, Is.Equal().To(testString))
			})
			this.add("iterate using next()", () => {
				var testString = "let's iterate this string using next()"
				var bi = new BufferedIterator(new StringIterator(testString))
				var character: string
				var result: string = ""
				while ((character = bi.next())) {
					result += character
				}
				this.expect(result, Is.Equal().To(testString))
			})
			this.add("peek() and next()", () => {
				var testString = "abcdef"
				var bi = new BufferedIterator(new StringIterator(testString))
				// Force the reader to buffer the entire string
				this.expect(bi.peek(5), Is.Equal().To("f"))
				this.expect(bi.next(), Is.Equal().To("a"))
				this.expect(bi.next(), Is.Equal().To("b"))
				this.expect(bi.next(), Is.Equal().To("c"))
				this.expect(bi.next(), Is.Equal().To("d"))
				this.expect(bi.next(), Is.Equal().To("e"))
				this.expect(bi.next(), Is.Equal().To("f"))
			})
		}
	}
	Unit.Fixture.add(new BufferedIteratorTest())
}
