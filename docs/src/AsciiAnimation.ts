/*
	usage: ASCIIAnimation(param1, param2, param3)

	param1 - array of animation 'frames' (strings)
	param2 - speed of animation in ms
	param3 - DOM target, inserts animation to .innerHTML (retains spaces)

	ex:
	var anim1 = new ASCIIAnimation(["1","2","3"], 100, div1);
*/

export class ASCIIAnimation {
    private readonly frames: string[]
    private readonly speed: number;
    private readonly id: JQuery;
    private currentFrame: number;
    private animation: number | undefined;
    private readonly animFunction: () => void;

    constructor(frames: string[], speed: number, id: string) {
        this.id = $(`#${id}`);
        if (this.id.length === 0) {
            throw new Error(`The component with id ${id} does not exist`);
        }
        if ((frames?.length ?? 0) < 1) {
            throw new Error(`Not enough frames, found : ${frames?.length ?? undefined}`);
        }
        this.speed = speed;
        this.currentFrame = 0;
        this.frames = frames.map(frame => frame.replace(/ /g, "&nbsp"));
        this.animFunction = () => {
            this.id.html(this.frames[this.currentFrame])
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }

    public start() {
        this.currentFrame = 0;
        this.animation = window.setInterval(this.animFunction, this.speed);
    }

    public stop() {
        this.currentFrame = 0;
        clearInterval(this.animation);
    }

    public resume() {
        this.animation = window.setInterval(this.animFunction, this.speed);
    }

    public pause() {
        clearInterval(this.animation);
    }
}