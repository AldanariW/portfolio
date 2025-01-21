import {Cli} from "./Cli";

export class TestCli extends Cli {

    constructor() {
        super('test', 'a helper cli', () => `cli ${this.name} called with args ${this.args}`);
    }

    public parseArgs(args: string): boolean | string {
        // basic and error prone parsing
        this.args = args.split('-').slice(1).map(x => x.trimEnd());
        return true;
    };
}