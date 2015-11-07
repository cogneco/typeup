module Magic.Unit {
	export class Test {
		constructor(private name: string, private action: () => void) {
		}
		getName(): string { return this.name }
		getAction(): () => void { return this.action }
		run(): void {
			this.action()
		}
		toString(): string {
			return this.name
		}
	}
}
