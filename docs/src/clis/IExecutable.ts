import {Cli} from "./Cli";

export interface IExecutable {
    execute(...args: string[]): any;
}

export function isExecutable(object: Cli | undefined): object is Cli & IExecutable {
    return object !== undefined && 'execute' in object;
}