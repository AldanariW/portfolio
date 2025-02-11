import {ShellInterface} from "./shell";
import {Cli} from "./clis/def/Cli";
import {RedirectCli} from "./clis/ExternalRedirectCli";
import {CommandListCli} from "./clis/CommandListCli";
import {ContentCli, hidePane} from "./clis/ContentCli";
import {bootsequence, name} from "../content/boot.json"

const contentDir = "content";


$(async () => {

    const bootSequenceWait = showBootSequence()

    const clis: Cli[] = [
        new RedirectCli("github", "https://github.com/AldanariP", "Pour être redirigé vers ma page GitHub où tous mes projets personels publiques sont hebergés."),
        new RedirectCli("mail", "mailto:curylorafael945@gmail.com?body=Je veux vous embaucher !", "Pour m'écrire un email"),
        new RedirectCli("cv", `${contentDir}/cv.pdf`, "Ouvre mon CV dans un nouvel onglet"),
        // new TestCli(),
        // new AnimationCli(),
        // new ContentCli("lorem", "a test modal pane", `${contentDir}/lorem_ipsum.html`),
        new ContentCli("competences", `${contentDir}/competences.html`, "Affiche mes differentes compétences")
    ];

    clis.push(new CommandListCli(clis));

    new ShellInterface(...clis);

    // evil code that forces focus on the text input
    const input = $('#command-input');
    $('body').on('mouseup', () => {
        setTimeout(() => {
            input.trigger('focus');
        }, 0);
    });

    // Prevent modal from closing when clicking inside it
    $('.modal-pane').on("click", function (e) {
        e.stopPropagation();
    });

    // Close modal pane on close click or click out
    $('.close-button, .modal-overlay').on("click", function (e) {
        if (e.target === this) hidePane()
    });

    // Close modal pane on escape key press
    $(document).on("keyup", function (e) {
        if (e.key === "Escape") hidePane()
    });

    await bootSequenceWait;
    $('#terminal').show()
});

async function showBootSequence() {
    const generateBootDelays = (numberOfLines: number): number[] => {
        const delays: number[] = [];
        let burstMode = false;
        let burstCount = 0;
        const normalMin = 100
        const normalMax = 400
        const burstMin = 10
        const burstMax = 60
        const burstChance = 0.3
        const extraDelayChance = 0.2
        const extraDelayMax = 500

        for (let i = 0; i < numberOfLines; i++) {
            if (!burstMode && Math.random() < burstChance) {
                burstMode = true;
                burstCount = Math.floor(Math.random() * 5) + 3;
            }

            if (burstMode && burstCount > 0) {
                delays.push(Math.random() * (burstMax - burstMin) + burstMin);
                burstCount--;
                if (burstCount === 0) burstMode = false;
            } else {
                const baseDelay = Math.random() * (normalMax - normalMin) + normalMin;
                const occasionalLongerDelay = Math.random() < extraDelayChance ? Math.random() * extraDelayMax : 0;
                delays.push(baseDelay + occasionalLongerDelay);
            }
        }
        return delays;
    };

    const bootDiv = $(`#boot-sequence`)
    const nameDiv = $(`#name`)

    const delays = generateBootDelays(bootsequence.length);

    for (let i = 0; i < bootsequence.length; i++) {
        bootDiv.append(`${bootsequence[i].length > 1 ? '[ <span style="color: #0f0">OK</span> ]' : ''} ${bootsequence[i]}<br>`);
        await new Promise(resolve => setTimeout(resolve, delays[i]));
    }

    bootDiv.hide()
    $("#name").show()

    for (let i = 0; i < name.length; i++) {
        nameDiv.append(`<pre>${name[i]}</pre>`);
        await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
}

