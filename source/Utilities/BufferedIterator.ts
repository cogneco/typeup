/// <reference path="Iterator" />

module Magic.Utilities {
	export class BufferedIterator<T> implements Iterator<T> {
		private buffer: T[] = []
		constructor(private backend: Iterator<T>) {
		}
		peek(position: number = 0): T {
			var next: T = null
			while (position > this.buffer.length - 1 && (next = this.backend.next()))
				this.buffer.push(next)
			return position > this.buffer.length - 1 ? null : this.buffer[position]
		}
		next(): T {
			var result = this.peek(0)
			if (this.buffer.length > 0)
				this.buffer.shift()
			return result
		}
	}
}
