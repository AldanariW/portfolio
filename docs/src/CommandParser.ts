export class CommandParser {

    public static parseName(command: string): string {
        return command.slice(0, command.indexOf(' ') + 1 || undefined).trim();
    }

    public static parseArgs(command: string): Map<string, any> {
        let map = new Map<string, any>();

        // skip the command name
        let i = 0;
        const eof = () => i >= command.length;

        while (command[i] !== ' ' && !eof()) i++;

        while (!eof()) {
            // go to next arg
            while (command[i] !== '-' && !eof()) i++;

            // skip dash
            i++;

            // read arg name
            let argName = ''
            while (command[i] !== ' ' && !eof()) {
                argName += command[i];
                i++;
            }

            map.set(argName, undefined)

            // go to arg value
            while (command[i] === ' ' && !eof()) i++;

            // read arg value
            let argValue = '';
            while (command[i] !== ' ' && !eof()) {
                argValue += command[i];
                i++;
            }

            map.set(argName, argValue);
        }

        return map;
    }
}