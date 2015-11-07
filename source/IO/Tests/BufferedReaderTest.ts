/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../Error/Position" />
/// <reference path="../../Error/Location" />
/// <reference path="../../Error/Region" />
/// <reference path="../../IO/BufferedReader" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />

module Magic.IO.Tests {
	import Is = Unit.Constraints.Is
	export class BufferedReaderTest extends Unit.Fixture {
		constructor() {
			super("IO.BufferedReader")
			var errorHandler = new Error.ConsoleHandler()
			this.add("empty", () => {
				var br = new IO.BufferedReader(new IO.StringReader(""))
				this.expect(br.isEmpty())
			})
			this.add("state check", () => {
				var br = new IO.BufferedReader(new IO.StringReader(""))
				this.expect(br.getLocation(), Is.Not().NullOrUndefined())
				this.expect(br.getRegion(), Is.Not().NullOrUndefined())
				this.expect(br.getResource(), Is.Not().NullOrUndefined())
			})
			this.add("peek", () => {
				var br = new IO.BufferedReader(new IO.StringReader("foobar"))
				this.expect(br.peek(1), Is.Equal().To("f"))
				this.expect(br.peek(2), Is.Equal().To("fo"))
				this.expect(br.peek(3), Is.Equal().To("foo"))
				this.expect(br.peek(4), Is.Equal().To("foob"))
				this.expect(br.peek(5), Is.Equal().To("fooba"))
				this.expect(br.peek(6), Is.Equal().To("foobar"))
			})
			this.add("read one at a time", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abcdef"))
				this.expect(br.read(), Is.Equal().To("a"))
				this.expect(br.read(), Is.Equal().To("b"))
				this.expect(br.read(), Is.Equal().To("c"))
				this.expect(br.read(), Is.Equal().To("d"))
				this.expect(br.read(), Is.Equal().To("e"))
				this.expect(br.read(), Is.Equal().To("f"))
			})
			this.add("read three at a time", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abcdef"))
				this.expect(br.read(3), Is.Equal().To("abc"))
				this.expect(br.read(3), Is.Equal().To("def"))
			})
			this.add("read three at a time with a newline", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abc\ndef"))
				this.expect(br.read(3), Is.Equal().To("abc"))
				this.expect(br.read(1), Is.Equal().To("\n"))
				this.expect(br.read(3), Is.Equal().To("def"))
			})
			this.add("string location", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abc\ndef"))
				this.expect(br.getLocation().getColumn(), Is.Equal().To(1))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(2))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(3))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(4))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(1))
				this.expect(br.getLocation().getLine(), Is.Equal().To(2))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(2))
				this.expect(br.getLocation().getLine(), Is.Equal().To(2))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(3))
				this.expect(br.getLocation().getLine(), Is.Equal().To(2))
				br.read()
				this.expect(br.isEmpty())
			})
			this.add("tabs and newlines location", () => {
				var br = new IO.BufferedReader(new IO.StringReader("\t\t\t\n\t\t\t"))
				this.expect(br.getLocation().getColumn(), Is.Equal().To(1))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(2))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(3))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(4))
				this.expect(br.getLocation().getLine(), Is.Equal().To(1))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(1))
				this.expect(br.getLocation().getLine(), Is.Equal().To(2))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(2))
				this.expect(br.getLocation().getLine(), Is.Equal().To(2))
				br.read()
				this.expect(br.getLocation().getColumn(), Is.Equal().To(3))
				this.expect(br.getLocation().getLine(), Is.Equal().To(2))
				br.read()
				this.expect(br.isEmpty())
			})
			this.add("mark", () => {
				var br = new BufferedReader(new IO.StringReader("abc\0"))
				this.expect(br.mark(), Is.Not().NullOrUndefined())
				br.read(); br.read(); br.read()
				var region = br.getRegion()
				this.expect(region.getStart().getLine(), Is.Equal().To(1))
				this.expect(region.getStart().getColumn(), Is.Equal().To(1))
				this.expect(region.getEnd().getLine(), Is.Equal().To(1))
				this.expect(region.getEnd().getColumn(), Is.Equal().To(4))
			})
		}
	}
	Unit.Fixture.add(new BufferedReaderTest())
}
