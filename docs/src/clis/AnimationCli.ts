import {Cli} from "./Cli";
import {ASCIIAnimation} from "../AsciiAnimation";
import {IExecutable} from "./IExecutable";
import data from "../../content/animations.json"

export class AnimationCli extends Cli implements IExecutable {
    public availableAnimations: string[];
    private animations: Map<number, ASCIIAnimation>;
    private currentId: number | undefined;

    constructor() {
        super('anim', 'an animation', () => '');
        this.animations = new Map();
        this.availableAnimations = Object(data);
    }

    public output(): string {
        this.currentId = Date.now();
        return `<pre class="animation" id="${this.currentId}"></pre>`;
    }

    public execute(...args: string[]): any {
        if (this.currentId === undefined) {
            return 'Animation failt to start, cause: Id is undefined at the time of animation instanciation'
        }
        let animName = this.args[0] as keyof typeof data;
        try {
            let animation = new ASCIIAnimation(data[animName], parseInt(this.args[1] ?? '100'), this.currentId.toString());
            animation.start()
            this.animations.set(this.currentId, animation);
        } catch (e) {
            return 'Animation failed to start, cause: ' + e;
        }
        return true;
    }

    public parseArgs(args: string): boolean | string {
        let argArray = args.split(' -').slice(1).map(x => x.trim());
        if (argArray.length === 0) {
            return `Command 'anim' requires at least one argument, found 0`;
        }
        const invalidArgs = argArray.filter(x => !x.match(/^[at] \S+$/g))// TODO write real arg parser
        if (invalidArgs.length > 0) {
            return `Unknown arg: ${invalidArgs.join(" ")}`;
        }
        argArray = argArray.map(x => x.split(' ', 2)[1])
        if (!(argArray[0] in this.availableAnimations)) {
            return `animation '${argArray[0]}' is unknowed`;
        }
        this.args = argArray;
        return true
    }
}