declare module "mathjax-node" {
	function config(configuration: any): void
	function start(): void
	function typeset(work: {}, callback: (data: { errors: boolean, mml: string}) => void): void
}
