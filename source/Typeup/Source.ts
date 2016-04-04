import * as Error from "../U10sil/Error/Handler"
import * as IO from "../U10sil/IO"
import { CommentStripper } from "./CommentStripper"

export class Source extends IO.BufferedReader implements Error.Handler {
	constructor(reader: IO.Reader, private errorHandler: Error.Handler) {
		super(reader instanceof Source || reader instanceof CommentStripper ? reader : new CommentStripper(reader))
	}
	raise(message: string | Error.Message, level?: Error.Level, type?: Error.Type, region?: Error.Region): void {
		if (!(message instanceof Error.Message)) {
			if (!level)
				level = Error.Level.Critical
			if (!type)
				type = Error.Type.Lexical
			if (!region)
				region = this.getRegion()
			message = new Error.Message(<string>message, level, type, region)
		}
		this.errorHandler.raise(<Error.Message>message)
	}
	requirePrefix(prefix: string): Source {
		return new Source(new IO.PrefixReader(prefix, this), this.errorHandler)
	}
	until(endMark: string): Source {
		return new Source(new IO.UntilReader(endMark, this), this.errorHandler)
	}
}
