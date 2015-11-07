/// <reference path="Test" />
/// <reference path="TestFailedError" />
/// <reference path="../Error/ConsoleHandler" />
/// <reference path="./Constraints/Constraint" />
/// <reference path="./Constraints/TrueConstraint" />
/// <reference path="../Utilities/String" />

module Magic.Unit {
	export class Fixture {
		private tests: Test[] = []
		private expectId = 0
		private consoleHandler: Error.ConsoleHandler
		constructor(private name: string, private reportOnPass = true) {
			this.consoleHandler = new Error.ConsoleHandler()
		}
		getName(): string { return this.name }
		add(name: string, action: () => void): void {
			this.tests.push(new Test(name, action))
		}
		run(): boolean {
			var failures: TestFailedError[] = []
			var result = true
			this.tests.forEach(test => {
				try {
					test.run()
				} catch (Error) {
					if (Error instanceof TestFailedError) {
						var e = <TestFailedError>Error
						e.setTest(test)
						e.setExpectId(this.expectId)
						failures.push(e)
						result = false
					} else {
						console.dir("[Fixture]", Error)
						throw Error
					}
				}
				this.expectId = 0
			})
			if ((result && this.reportOnPass) || !result)
				this.prettyPrintTestResult(result)

			if (!result) {
				failures.forEach(failure => {
					var expectedMessage = "expected '" + failure.getConstraint().getExpectedValue().toString() + "', found '" + failure.getValue() + "'"
					var whereMessage = "[expect #" + failure.getExpectId() + " in '" + failure.getTest().toString() + "']"
					this.consoleHandler.raise("  -> " + expectedMessage + " " + whereMessage)
				})
			}
			return result;
		}
		expect(value: any, constraint: Constraints.Constraint = null): void {
			this.expectId++
			if (constraint == null)
				constraint = new Constraints.TrueConstraint()
			if (!constraint.verify(value))
				throw new TestFailedError(value, constraint)
		}
		//
		// This is a temporary thing to make it easier on the eyes when reading
		// test results in the terminal.
		//
		private prettyPrintTestResult(success: boolean) {
			var coloredString = "\x1b[" + (success ? "32mpassed" : "31mfailed")
			var colorReset = "\x1b[0m"
			var message = coloredString + colorReset
			var result = Utilities.String.padRight(this.name, ".", 35) + ": " + message
			console.log(result)
		}

		private static fixtures: Fixture[] = []
		static add(fixture: Fixture) {
			Fixture.fixtures.push(fixture)
		}
		static run() {
			Fixture.fixtures.forEach((fixture) => { fixture.run() })
		}
	}
}
