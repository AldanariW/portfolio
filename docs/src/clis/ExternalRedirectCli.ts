import {Cli} from './def/Cli';
import {IExecutable} from "./def/IExecutable";

export class RedirectCli extends Cli implements IExecutable {
    private readonly url: string;

    constructor(name: string, url: string, help: string) {
        super(name, help);
        this.url = url;
    }

    public output(): string {
        if (this.args.has('help')) return this.help();

        return `Opening ${this.name}...`;
    }

    public execute(): { succes: boolean, errors: string } {
        const succes = window.open(this.url, '_blank');
        if (succes !== null) {
            succes.focus()
            return {succes: true, errors: ""};
        }
        return {succes: false, errors: "L'ouverture du lien a échoué, la nouvelle fenetre a été bloqué par l'utilisateur"};
    }
}