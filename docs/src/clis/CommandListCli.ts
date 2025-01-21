import {Cli} from "./Cli";

export class CommandListCli extends Cli {
    private cliInstances: Cli[];

    constructor(cliInstances: Cli[]) {
        super('help', 'Lists all available commands', () => this.listCommands());
        this.cliInstances = cliInstances;
    }

    private listCommands(): string {
        return `Command List :\n - ${this.cliInstances
            .map(cli => `${cli.name}: ${cli.help}`)
            .join('\n - ')}`
    }

    public parseArgs(args: string): boolean | string {
        // No args needed for this command
        this.args = [];
        return true;
    }
}