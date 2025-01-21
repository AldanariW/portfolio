// Initialize when document is ready
import {ShellInterface} from "./shell";
import {TestCli} from "./clis/TestCli";
import {RedirectCli} from "./clis/ExternalRedirectCli";
import {CommandListCli} from "./clis/CommandListCli";
import {Cli} from "./clis/Cli";

$(() => {
    const clis: Cli[] = [
        new RedirectCli("github", "https://github.com/AldanariP", "Just type 'github' to open the github profile in the new tab"),
        new TestCli(),
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
