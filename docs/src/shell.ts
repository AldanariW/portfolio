import {Cli} from "./clis/Cli";
import {isExecutable} from "./clis/IExecutable";
import {CommandParser} from "./CommandParser";


interface CommandHistory {
    commands: string[];
    currentIndex: number;
}

export class ShellInterface {
    private $terminal: JQuery;
    private $output: JQuery;
    private $input: JQuery;
    private history: CommandHistory;
    private clis: Cli[];

    constructor(...clis: Cli[]) {
        this.$terminal = $('#terminal');
        this.$output = $('#output');
        this.$input = $('#command-input');
        this.clis = clis;

        this.history = {
            commands: [],
            currentIndex: -1
        };

        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        this.$input.on('keydown', (e: JQuery.KeyDownEvent) => {
            switch (e.key) {
                case 'Enter':
                    this.handleCommand();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateHistory('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateHistory('down');
                    break;
            }
        });
    }

    private navigateHistory(direction: 'up' | 'down'): void {
        if (this.history.commands.length === 0) return;

        if (direction === 'up') {
            if (this.history.currentIndex > 0) {
                this.history.currentIndex--;
                this.$input.val(this.history.commands[this.history.currentIndex]);
            }
        } else {
            if (this.history.currentIndex < this.history.commands.length - 1) {
                this.history.currentIndex++;
                this.$input.val(this.history.commands[this.history.currentIndex]);
            } else {
                this.history.currentIndex = this.history.commands.length;
                this.$input.val('');
            }
        }
    }

    private addLine(line: string, err: string): void {
        this.$output.append(`<span class="prompt">$</span><span class="${err}">${line}</span><br>`);
        this.$terminal.scrollTop(this.$terminal[0].scrollHeight);
        this.$input.val('');
    }

    private handleCommand(): void {

        const command = this.$input.val() as string;

        if (command.trim()) {
            // adds the commands to history
            this.history.commands.push(command);
            this.history.currentIndex = this.history.commands.length;

            // parses the command
            const cli = this.clis.find((c: Cli) => CommandParser.parseName(command) === c.name);

            let output: string;
            let err = ''

            if (cli === undefined) {
                output = `Commmande inconnue: ${command}`;
                err = 'err'
            } else {
                const res = cli.parseArgs(command);
                if (res && res !== true) {
                    output = res as string;
                    err = 'err'
                } else {
                    output = cli.output();
                }
            }

            // prints the result of the command
            this.addLine(output, err)

            // execute the command
            if (err.length === 0 && isExecutable(cli)) {
                const res = cli.execute()
                if (res && res !== true) {
                    this.addLine(res, 'err')
                }
            }
        }
    }

}
