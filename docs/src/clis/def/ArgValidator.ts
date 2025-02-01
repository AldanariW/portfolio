type ArgType = 'string' | 'number' | 'boolean';

interface ArgDefinition {
    name: string;
    alias?: string;
    description: string;
    type: ArgType;
    required?: boolean;
    value?: string | number | undefined;
}

export class ArgValidator {
    private schema: Map<string, ArgDefinition>;

    constructor(args: ArgDefinition[]) {
        const argCounts = (args: ArgDefinition[], field: 'name' | 'alias') =>
            Array.from(
                args.reduce((counts, arg) =>
                        arg[field] ? counts.set(arg[field], (counts.get(arg[field]) || 0) + 1) : counts,
                    new Map<string, number>()))
                .filter(([_, count]) => count > 1)
                .map(([name, _]) => name);

        const nameCounts = argCounts(args, 'name');
        if (nameCounts.length > 0) {
            throw new Error(`Dupliacte name of argument :${nameCounts.join(', ')}`);
        }

        const aliasCounts = argCounts(args, 'alias');
        if (aliasCounts.length > 0) {
            throw new Error(`Overlapping alias :${aliasCounts.join(', ')}`);
        }

        const overlappingAliases = args.filter(arg => args.some(other => arg.alias === other.name));
        if (overlappingAliases.length > 0) {
            throw new Error(`The following aliases overlap at least one argument name :${overlappingAliases}`);
        }

        this.schema = new Map();

        // add aliases as valid args
        args.forEach(arg => {
            this.schema.set(arg.name, arg);
            if (arg.alias) {
                this.schema.set(arg.alias, arg);
            }
        });
    }

    validate(args: Map<string, any>): { success: boolean, errors: string } {
        const errors = new Set<string>();
        const seenRequiredArgs = new Set<string>();

        for (const [key, value] of args.entries()) {
            if (key === 'help') return {success: true, errors: ""};

            const argDef = this.schema.get(key);

            if (!argDef) {
                errors.add(`Unknown argument: ${key}`);
                continue;
            }

            if (typeof value !== argDef.type) {
                errors.add(`Invalid type for ${argDef.name}: expected ${argDef.type}, got ${typeof value}`);
            }

            if (argDef.required) {
                seenRequiredArgs.add(argDef.name);
                if (argDef.alias) {
                    seenRequiredArgs.add(argDef.alias);
                }
            }
        }

        for (const [name, argDef] of this.schema.entries()) {
            if (argDef.required && !seenRequiredArgs.has(name)) {
                errors.add(`Missing required argument: ${argDef.name}`);
            }
        }

        if (errors.size === 0) {
            this.schema.forEach((arg: ArgDefinition) => {
                arg.value = args.get(arg.name) ?? (arg.alias ? args.get(arg.alias) : undefined);
            })
        }

        return {
            success: errors.size === 0,
            errors: Array.from(errors.values()).join('\n'),
        };
    }

    public getArg(name: string): string | number | undefined {
        return this.schema.get(name)?.value;
    }

    generateHelp(): string {
        return Array.from(new Set(this.schema.values()))
            .map(arg => {
                const aliasText = arg.alias ? ` (-${arg.alias})` : '';
                const requiredText = arg.required ? ' [required]' : '';
                return `--${arg.name}${aliasText}${requiredText}: ${arg.description}\n  Type: ${arg.type}`;
            })
            .join('\n\n');
    }
}