// Initialize when document is ready
import {ShellInterface} from "./shell";
import {Cli} from "./clis/Cli";
import {RedirectCli} from "./clis/ExternalRedirectCli";
import {TestCli} from "./clis/TestCli";
import {CommandListCli} from "./clis/CommandListCli";
import {AnimationCli} from "./clis/AnimationCli";

$(() => {
    const clis: Cli[] = [
        new RedirectCli("github", "https://github.com/AldanariP", "Just type 'github' to open the github profile in the new tab"),
        new TestCli(),
        new AnimationCli()
    ];

    clis.push(new CommandListCli(clis));

    new ShellInterface(...clis);

    // evil code that force focus on the text input
    const input = $('#command-input');
    $('body').on('mouseup', () => {
        setTimeout(() => {
            input.trigger('focus');
        }, 0);
    });
});
