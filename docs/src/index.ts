import {ShellInterface} from "./shell";
import {Cli} from "./clis/def/Cli";
import {RedirectCli} from "./clis/ExternalRedirectCli";
import {TestCli} from "./clis/TestCli";
import {CommandListCli} from "./clis/CommandListCli";
import {AnimationCli} from "./clis/AnimationCli";
import {ContentCli, hidePane} from "./clis/ContentCli";

const contentDir = "content";


$(() => {
    const clis: Cli[] = [
        new RedirectCli("github", "https://github.com/AldanariP", "Just type 'github' to open the github profile in the new tab"),
        new TestCli(),
        new AnimationCli(),
        new ContentCli("lorem", "a test modal pane", `${contentDir}/lorem_ipsum.html`)
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
});
