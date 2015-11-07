module Magic.Utilities {
	export class String {
		static padLeft(value: string, paddingCharacter: string, width: number) {
			return String.pad(value, paddingCharacter, width, true)
		}
		static padRight(value: string, paddingCharacter: string, width: number) {
			return String.pad(value, paddingCharacter, width, false)
		}
		private static pad(value: string, paddingCharacter: string, width: number, padLeft = false) {
			var padding = ""
			var count = width - value.length
			for (var i = 0; i < count; i++)
				padding += paddingCharacter
			return padLeft ? padding + value : value + padding
		}
	}
}
