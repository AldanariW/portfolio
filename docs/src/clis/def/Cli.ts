import {CommandParser} from "../../CommandParser";
import {ArgValidator} from "./ArgValidator";

export type ArgMap = Map<string, string | number | undefined>;
type Callable = (args: ArgMap) => string;


export abstract class Cli {
    protected args: ArgMap;
    protected validator: ArgValidator | undefined;

    protected constructor(
        public readonly name: string,
        public readonly desc: string,
        private readonly callable?: Callable
    ) {
        this.args = new Map;
    }

    public help(): string {
        // default method : generate help text based on validator if it exists, else returns description
        return this.validator !== undefined ? this.validator.generateHelp() : this.desc;
    }

    public output(): string {
        // default method: return the output of the callable if it's defined, else the name of the command
        // returns the help message if 'help' is in the arguments.

        if (this.args.has('help')) return this.help();

        return this.callable?.(this.args) ?? this.name
    }

    public parseArgs(args: string): {succes: boolean, errors: string, follow: boolean} {
        // default method: Parses the args with the Command Parser and validate them
        this.args = CommandParser.parseArgs(args);
        if (this.validator) {
            const res = this.validator.validate(this.args);
            return {succes: res.success, errors: res.errors, follow: false};
        }
        return {succes: true, errors: "", follow: !this.args.has('help')};
    };
}
