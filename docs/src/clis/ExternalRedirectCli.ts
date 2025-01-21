import {Cli} from './Cli';
import {IExecutable} from "./IExecutable";

export class RedirectCli extends Cli implements IExecutable {
    private url: string;

    constructor(name: string, url: string, help: string) {
        super(name, help);
        this.url = url;
    }

    public output(): string {
        return `Opening ${this.name}...`;
    }

    public execute(): any {
        window.open(this.url, '_blank')?.focus();
    }
}