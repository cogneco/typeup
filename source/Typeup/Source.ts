import { Error, IO } from "@cogneco/mend"

export class Source extends IO.BufferedReader implements Error.Handler {
	constructor(reader: IO.Reader, private errorHandler: Error.Handler) {
		super(reader)
	}
	raise(message: Error.Message): void
	raise(message: string, level?: Error.Level, type?: string, region?: Error.Region): void
	raise(message: string | Error.Message, level?: Error.Level, type = "lexical", region?: Error.Region): void {
		if (!(message instanceof Error.Message)) {
			if (!level)
				level = Error.Level.Critical
			if (!region)
				region = this.region
			message = new Error.Message(message as string, level, type, region)
		}
		this.errorHandler.raise(message as Error.Message)
	}
	requirePrefix(prefix: string | string[]): Source {
		return new Source(new IO.PrefixReader(this, prefix), this.errorHandler)
	}
	till(endMark: string | string[]): Source {
		return new Source(IO.TillReader.create(this, endMark), this.errorHandler)
	}
	until(endMark: string | string[]): Source {
		return new Source(IO.UntilReader.create(this, endMark), this.errorHandler)
	}
}
