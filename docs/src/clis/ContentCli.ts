import {Cli} from './def/Cli';

let $pane: JQuery
let $modal: JQuery
let $body: JQuery

$(() => {
    $pane = $('.modal-pane');
    $modal = $('.modal-overlay');
    $body = $('body');
})

export class ContentCli extends Cli {
    private readonly content: string;

    constructor(name: string, desc: string, content: string) {
        super(name, desc, () => `Showing ${name}...`);
        this.content = content;
    }

    public execute(): {succes: boolean, errors: string} {
        setContent('<div id="loading-div">Loading...</div>')
        showPane()

        let result = "";

        $.ajax({
            url: this.content,
            method: 'GET',
            success: (html: string) => setContent(html),
            error: () => {
                hidePane()
                result = `failed to load content : ${this.content}`;
            }
        })

        return {succes: result.length === 0, errors: result};
    }
}

export function showPane() {
    $modal.fadeIn();
    $body.addClass('body-fixed');
}

export function hidePane() {
    $modal.fadeOut();
    $body.removeClass('body-fixed');
}

export function setContent(content: string) {
    $pane.children().not('.close-button').remove();
    $pane.append(content);
}