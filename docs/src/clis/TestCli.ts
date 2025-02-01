import {Cli} from "./def/Cli";

export class TestCli extends Cli {

    constructor() {
        super('test', 'a helper cli', () => `cli ${this.name} called with args ${JSON.stringify(Object.fromEntries(this.args))}`);
    }
}