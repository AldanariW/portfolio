type Callable = (args: string[]) => string;


export abstract class Cli {
    name: string;
    help: string;
    callable: Callable | undefined;
    args: string[];

    protected constructor(name: string, help: string, callable?: Callable) {
        this.name = name;
        this.help = help;
        this.callable = callable;
        this.args = []
    }

    public output(): string {
        // default method: returns it's own name
        return this.callable?.(this.args) ?? this.name
    }

    public parseArgs(args: string): boolean | string {
        // default method: does nothing
        return true;
    };
}
