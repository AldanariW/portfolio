import {Cli} from "./def/Cli";

export class CommandListCli extends Cli {
    private cliInstances: Cli[];

    constructor(cliInstances: Cli[]) {
        super('help', 'Lists all available commands', () => this.listCommands());
        this.cliInstances = cliInstances;
    }

    private listCommands(): string {
        return `Command List :\n - ${this.cliInstances
            .map(cli => `${cli.name}: ${cli.desc}`)
            .join('\n - ')}`
    }
}