/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />

module Magic.IO {
	export interface Reader {
		isEmpty(): boolean
		read(): string;
		getResource(): string
		getLocation(): Error.Location
		getRegion(): Error.Region
		mark(): Error.Region
	}
}
