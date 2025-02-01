import {Cli} from "./def/Cli";
import {ASCIIAnimation} from "../AsciiAnimation";
import {IExecutable} from "./def/IExecutable";
import {ArgValidator} from "./def/ArgValidator"
import data from "../../content/animations.json"

export class AnimationCli extends Cli implements IExecutable {
    public availableAnimations: string[];
    private animations: Map<number, ASCIIAnimation>;
    private currentId: number | undefined;
    protected validator: ArgValidator;

    constructor() {
        super('anim', 'an animation', () => '');
        this.animations = new Map();
        this.availableAnimations = Object.keys(data);
        this.validator = new ArgValidator([
            {
                name: 'animation',
                alias: 'a',
                description: "The name of the animation",
                type: 'string',
                required: true,
            },
            {
                name: 'time',
                alias: 't',
                description: "The time between animation frames, a lower time means a faster animation",
                type: 'number',
                required: false,
            }
        ])
    }

    public output(): string {
        if (this.args.has('help')) return this.help() + `\n\nAvailable animations : ${this.availableAnimations.join(', ')}`;

        this.currentId = Date.now();
        return `<pre class="animation" id="${this.currentId}"></pre>`;
    }

    public execute(): {succes: boolean, errors: string} {
        if (this.currentId === undefined) {
            return {succes: false, errors: 'Animation failed to start, cause: Id is undefined at the time of animation instanciation'}
        }
        let animName = this.validator.getArg("a") as keyof typeof data;
        try {
            const time = this.validator.getArg("t") as number ?? 100;
            let animation = new ASCIIAnimation(data[animName], time, this.currentId.toString());
            animation.start()
            this.animations.set(this.currentId, animation);
        } catch (e) {
            return {succes: false, errors: 'Animation failed to start, cause: ' + e}
        }
        return {succes: true, errors: ""};
    }

    public parseArgs(args: string): {succes: boolean, errors: string, follow: boolean} {
        const res = super.parseArgs(args);
        if (!res.succes) return res;

        const isHelpCommand = this.validator.getArg('help') !== undefined;
        const animName = this.validator.getArg("a") as string;
        if (!isHelpCommand && !this.availableAnimations.includes(animName)) {
            return {succes: false, errors: `animation '${animName}' is not a valid animation, type 'anim -help' to see the list of animations.`, follow: false}
        }

        return {succes: true, errors: "", follow: !isHelpCommand}
    }
}