export class CommandParser {

    public static parseName(command: string): string {
        return command.slice(0, command.indexOf(' ') + 1 || undefined).trim();
    }

    public static parseArgs(command: string): Map<string, string | number | undefined> {
        let map = new Map<string, string | number | undefined>();

        let i = 0;
        const eof = () => i >= command.length;

        // go to the start of the command args, skipping command name.
        while (command[i] !== ' ' && !eof()) i++;

        while (!eof()) {
            // go to next arg
            while (command[i] !== '-' && !eof()) i++;

            // skip dash
            i++
            if (command[i] === '-') i++;

            // read arg name
            let start = i;
            while (command[i] !== ' ' && !eof()) i++;
            if (i === start) break; //Syntax Error
            let argName = command.slice(start, i)
            map.set(argName, undefined)

            // go to arg value
            while (command[i] === ' ' && !eof()) i++;

            // continue if new arg instead of arg value
            if (command[i] === '-') continue;

            // read arg value
            start = i;
            while (command[i] !== ' ' && !eof()) i++;
            if (i > start) {
                let argValue = command.slice(start, i)
                map.set(argName, isNaN(Number(argValue)) ? argValue : Number(argValue));
            }
        }

        return map;
    }
}