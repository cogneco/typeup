/// <reference path="Iterator" />

module Cogneco.Utilities {
	export class ArrayIterator<T> implements Iterator<T> {
		private position = 0
		constructor(private backend: T[]) {
		}
		next(): T {
			return this.position < this.backend.length ? this.backend[this.position++] : undefined
		}
	}
}
