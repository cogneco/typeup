/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />

module Cogneco.IO {
	export abstract class Reader {
		abstract isEmpty(): boolean
		abstract read(): string;
		abstract getResource(): string
		abstract getLocation(): Error.Location
		abstract getRegion(): Error.Region
		abstract mark(): Error.Region
		static open(path: string, extension: string): Reader {
			return path.slice(-4) == ".wup" ? new IO.FileReader(path) : new IO.FolderReader(path, "*.wup")
		}
	}
}
