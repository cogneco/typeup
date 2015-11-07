/// <reference path="./Constraints/Constraint" />

module Magic.Unit {
	export class TestFailedError implements Error {
		public name = "TestFailedError"
		private test: Test
		private expectId: number
		constructor(private value: any, private constraint: Constraints.Constraint, public message: string = null) {
		}
		getValue(): any { return this.value }
		getConstraint(): Constraints.Constraint { return this.constraint }
		getName(): string { return this.name }
		getTest() { return this.test }
		setTest(value: Test) {
			this.message = value.getName()
			this.test = value
		}
		getExpectId() { return this.expectId }
		setExpectId(value: number) { this.expectId = value }
		toString(): string {
			return this.name + ": " + this.test.getName()
		}
	}
}
