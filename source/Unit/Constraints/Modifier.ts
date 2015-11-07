module Magic.Unit.Constraints {
	export class Modifier {
		private child: Modifier
		constructor(private parent: Modifier = null) {
		}
		verify(value: any, child: Modifier = null): boolean {
			this.child = child
			return this.parent != null ? this.parent.verify(value, this) : this.test(value)
		}
		test(value: any): boolean {
			return this.testChild(value)
		}
		testChild(value: any): boolean {
			return this.child != null && this.child.test(value)
		}
	}
}
