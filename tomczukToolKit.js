// ==UserScript==
// @name     tomczukToolKit
// @version  1
// @grant    none
// ==/UserScript==

// ========================== CONFIG ==========================

const CONFIG = {};

// ========================== CONFIG ==========================


function useTomczukToolbarStyles() {
    let style = document.createElement('style');
    style.id = 'tomczuk-toolbar-styles';
    let css = `
    :root {
        --right-panel-width: 400px;
        --main-transition: 500ms;
        --silver-color: #dedede;
        --red-color: #f55;
    }
    
    .tomczuk {
        all: revert;
        font-family: calibri;
        z-index: 9999;
        outline: none;
    }
    
    .tomczuk-right-panel {
        padding: 0;
        color: var(--silver-color);
        font-size: 1.2rem;
        position: fixed;
        top: 0px;
        right: calc(( (var(--right-panel-width) / 2) * -1));
        border-left: 3px solid #000;
        background: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: var(--right-panel-width);
        transition: var(--main-transition) ease-out;
        box-shadow: inset 80px 0 80px -60px #000;
        user-select: none;
    }
    
    @media only screen and (min-width: 2100px) {
        .tomczuk-right-panel {
            right: 0;
        }
    }
    
    .tomczuk-right-panel.active,
    .tomczuk-right-panel.permactive {
        right: 0;
        background: rgba(0, 0, 0, 0.75);
    }
    
    .tomczuk-right-panel.permactive {
        right: 0;
        background: rgba(0, 50, 0, 0.75);
    }
    
    .tomczuk-right-panel-header {
        padding: 6px;
        background: rgba(0, 0, 0, 0.8);
        letter-spacing: 1px;
        display: flex;
    }
    
    .tomczuk-utility-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0;
    }
    
    @media only screen and (max-width: 1700px) {
        .tomczuk-right-panel {
            right: calc( (var(--right-panel-width) * -1) + 35px);
        }
        .tomczuk-right-panel .tomczuk-utility-container {
            opacity: 0;
            pointer-events: none;
            transition: var(--main-transition);
        }
        .tomczuk-right-panel.active .tomczuk-utility-container,
        .tomczuk-right-panel.permactive .tomczuk-utility-container {
            opacity: 1;
            pointer-events: all;
        }
    }
    
    .tomczuk-primary,
    .tomczuk-secondary {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
    
    .tomczuk-box {
        border: 1px solid var(--silver-color);
        border-radius: 5px;
        margin: 4px 0;
        flex: 1;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
    }
    
    .tomczuk-box-title {
        background: #000;
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 6px;
        cursor: pointer;
        border-radius: inherit;
        border-bottom: 2px solid var(--silver-color);
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    
    .tomczuk-box-title::before {
        content: '\\25BC';
        text-transform: lowercase;
        display: flex;
        align-items: center;
        font-size: .6rem;
        color: var(--red-color);
    }
    
    .tomczuk-box-title.minimized::before {
        transform: rotate(-90deg);
    }
    
    .tomczuk-box-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: stretch;
        padding: 5px;
    }
    
    .tomczuk-box-container.tomczuk-minimized-box {
        display: none;
    }
    
    .tomczuk-self-input {
        border: 1px solid black;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 1rem;
        padding: 3px;
        cursor: copy;
        border-radius: 5px;
    }
    
    .tomczuk-self-input.tomczuk-self-input-copying {
        color: var(--red-color);
        font-weight: 800;
        background-color: #fff;
        border-color: var(--red-color);
        cursor: progress;
    }
    
    .tomczuk-row-btns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 4px;
    }
    
    .tomczuk-btn {
        cursor: pointer;
        border: 1px solid black;
        text-decoration: none;
        flex: 1;
        font-size: 1.1rem;
        border-radius: 5px;
        padding: 2px 0;
        background: var(--silver-color);
        color: #000;
        transition: 150ms;
        text-transform: uppercase;
    }
    
    .tomczuk-btn:hover {
        text-decoration: none;
        box-shadow: inset 0 0 2px 1px black;
    }
    
    .tomczuk-nav-btn {
        background-size: 30%;
        background-origin: content-box;
        background-position: center;
        background-repeat: no-repeat;
        padding: 5px;
    }
    
    .tomczuk-recache-btn {
        background-image: url("https://svgsilh.com/svg/525698.svg");
    }
    
    .tomczuk-mobile-btn {
        background-image: url("https://www.svgrepo.com/show/91399/mobile-phone-design.svg");
    }
    
    #panel-toggler {
        border: 2px solid yellowgreen;
        display: inline-block;
        padding: 10px;
        border-radius: 4px;
        cursor: pointer;
        background: white url('https://simpleicon.com/wp-content/uploads/pin.svg');
        background-size: cover;
        transition: var(--main-transition);
        margin-right: 15px;
    }
    
    #panel-toggler.pinned {
        background-color: yellowgreen;
    }
    
    #panel-toggler.pinned:hover {
        border-color: red;
    }
    
    #panel-toggler.unpinned:hover {
        border-color: black;
    }
    
    
    /* https://www.svgrepo.com/show/91399/mobile-phone-design.svg MOBILE ICON */
    
    
    /* https://svgsilh.com/svg/525698.svg REFRESH ICON */
    `
        // let revertedClasses = [...new Set(css.match(/\.[a-z-]+/ig))].map(e => e + ' {all: revert;}').join("\n");
        // css = (revertedClasses + css)
        //     .replaceAll(/[\n\t\s]+/ig, ' ')
        //     .replaceAll(/\s*\{\s*/ig, '{')
        //     .replaceAll(/\s*\}\s*/ig, '}')
        //     .replaceAll(/\s*\:\s*/ig, ':');

    style.textContent = css;
    let head = document.querySelector('head');
    let body = document.querySelector('body');
    if (head) {
        head.append(style);
    } else {
        let head = document.createElement('head');
        if (html) {
            html.append(head);
            head.append(style);
            if (!body) html.append(body);
        } else {
            let html = document.createElement('html');
            document.append(html);
            html.append(head);
            head.append(style);
            if (!body) html.append(body);
        }
    }
}

class App {
    constructor(department) {
        this.auth = new Auth(department);
        switch (true) {
            case isCBA():
                this.ctrl = new CBAController;
                break;
            case isTK():
                this.ctrl = new TKController;
                break;
            case isBEE():
                this.ctrl = new BEEController;
                break;
            default:
                this.ctrl = new BasicController;
        }
    }

    navBox() {
        const allowed = this.auth.forbid([]);

        if (!allowed) return;



        let nav = box('Nawigacja');
        const navBtnsContainer = html('div', { classes: 'tomczuk-nav-btns-container tomczuk-row-btns' });
        const reCacheBtn = html('a', { classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-recache-btn' });
        reCacheBtn.addEventListener('click', e => {
            let currentUrl = window.location.href.replaceAll(/\?ReCache=1/ig, '');
            window.location.href = currentUrl + '?ReCache=1';
        });
        navBtnsContainer.append(reCacheBtn);
        navBtnsContainer.append(html('a', { textContent: '_', classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-mobile-btn' }));

        nav.container.append(navBtnsContainer);



        this.ctrl.primary.append(nav);
    }

    productBox() {
        const allowed = this.auth.forbid([]);

        if (!allowed) return;

        let model = this.productModel();
        if (isDev() && !model) model = '9788382158106';
        if (model) {
            const productBox = box('Produkt');
            const input = selfCopyInput({ value: model, classes: 'tomczuk-self-input' });
            productBox.container.append(input);

            const btnsContainer = html('div', { classes: 'tomczuk-product-btns-container tomczuk-row-btns' });
            if (!isCBA()) btnsContainer.append(btn({ value: 'cba' }));
            if (!isTK()) btnsContainer.append(btn({ value: 'tk', url: `https://www.taniaksiazka.pl/Szukaj/q-${model}` }));
            if (!isBEE()) btnsContainer.append(btn({ value: 'bee', url: `https://www.bee.pl/Szukaj/q-${model}?pf-size=24&pf-page=1` }))
            const basketsUrlBtn = btn({ value: 'Jadące koszyki', url: arrivingBasketsUrl(model) });


            productBox.container.append(btnsContainer);
            productBox.container.append(basketsUrlBtn);

            //test
            this.ctrl.primary.append(productBox);
        }
    }

    productModel() {
        const allowed = this.auth.forbid([]);

        if (!allowed) return;

        const model = this.ctrl.productModel();
        return model ? model : false;
    }

    salesBox() {
        const allowed = this.auth.allow([
            'handlowy'
        ])
        if (!allowed) return;

        let model = this.productModel();
        if (isDev() && !model) model = '9788382158106';
        if (model) {
            const salesBox = box('Sprzedaż');
            const resultBox = html('div', { classes: 'tomczuk-sales-result-box', text: 'Sprzedaż z X dni:' });

            salesBox.append(resultBox);



            this.ctrl.secondary.append(salesBox);
        }
    }
}



// departments:
// handlowy, bok, marketing, bee, it, 
class Auth {
    constructor(department) {
        this.department = department;
    }
    allow(departments) {
        return departments.includes(this.department);
    }
    forbid(departments) {
        return !departments.includes(this.department)
    }
}

class Controller {
    constructor() {
        this.rightPanel = this.getRightPanel();
        this.header = this.getHeader();

        this.makeUtilityContainer();
    }

    getRightPanel() {
        let rightPanel = html('div', { classes: 'tomczuk-right-panel' });
        document.body.append(rightPanel);

        rightPanel.pin = function() {
            localStorage.tomczukPanelToggler = 'pinned';
            rightPanel.querySelector('#panel-toggler').classList.add('pinned');
            rightPanel.querySelector('#panel-toggler').classList.remove('unpinned');
            rightPanel.classList.add('permactive');
        }

        rightPanel.unpin = function() {
            localStorage.tomczukPanelToggler = 'unpinned';
            rightPanel.querySelector('#panel-toggler').classList.remove('pinned');
            rightPanel.querySelector('#panel-toggler').classList.add('unpinned');
            rightPanel.classList.remove('permactive');
        }

        rightPanel.canTogglePanel = (clickedEl) => {
            return clickedEl.querySelector('.tomczuk-box');
        }

        rightPanel.addEventListener('click', e => {
            console.log(e.target);
            if (!rightPanel.canTogglePanel(e.target) || rightPanel.classList.contains('permactive')) return;
            setTimeout(() => {
                if (!rightPanel.classList.contains('permactive')) rightPanel.classList.toggle('active')
            }, 180);
        });
        rightPanel.addEventListener('dblclick', e => {
            if (!rightPanel.canTogglePanel(e.target)) return;

            if (rightPanel.classList.contains('permactive')) {
                console.log('dblclick odpinam');
                rightPanel.unpin();
            } else {
                console.log('dblclick przypinam');
                rightPanel.pin();
            }
        });

        let timeOutId;
        rightPanel.addEventListener('mouseout', () => {
            timeOutId = setTimeout(() => {
                rightPanel.classList.remove('active');
            }, 1250);
        });
        rightPanel.addEventListener('mouseover', () => {
            window.clearTimeout(timeOutId);
        });

        CONFIG.rightPanel = rightPanel;
        return rightPanel;
    }

    makeUtilityContainer() {
        const container = html('div', { classes: 'tomczuk-utility-container' });
        const primary = this.getPrimary();
        const secondary = this.getSecondary();

        container.append(primary, secondary);
        this.rightPanel.append(container);
    }

    getHeader() {
        const rightPanel = this.rightPanel;
        const header = html('div', { classes: 'tomczuk-right-panel-header' });
        header.append(html('div', { textContent: '.tomczukToolKit' }));

        const panelToggler = html('div', { id: 'panel-toggler' });
        header.prepend(panelToggler);
        rightPanel.append(header);

        if (localStorage.tomczukPanelToggler == 'pinned') rightPanel.pin();
        else rightPanel.unpin();

        panelToggler.addEventListener('click', e => {
            if (localStorage.tomczukPanelToggler == 'pinned') rightPanel.unpin();
            else rightPanel.pin();
        });

        return header;
    }

    getPrimary() {
        const primary = html('div', { classes: 'tomczuk-primary' });
        this.primary = primary;
        return primary;
    }

    getSecondary() {
        const secondary = html('div', { classes: 'tomczuk-secondary' });
        this.secondary = secondary;
        return secondary;
    }

    productModel() {
        return false;
    }
}


class TKController extends Controller {
    productModel() {
        let meta = document.querySelector('meta[itemprop="productID"]');
        if (!meta) return false;

        let model = meta.getAttribute('content');
        if (!model) return false;
        return model;
    }
}

class CBAController extends Controller {

}

class BEEController extends Controller {

}

class BasicController extends Controller {
    productModel() {
        return false;
    }
}

function pl2url(string) {
    let utf = {
        "Ą": "%A1",
        "Ć": "%C6",
        "Ę": "%CA",
        "Ł": "%A3",
        "Ń": "%D1",
        "Ó": "%D3",
        "Ś": "%A6",
        "Ź": "%AC",
        "Ż": "%AF",
        "ą": "%B1",
        "ć": "%E6",
        "ę": "%EA",
        "ł": "%B3",
        "ń": "%F1",
        "ó": "%F3",
        "ś": "%B6",
        "ź": "%BC",
        "ż": "%BF",
        " ": "%20" // ? zostawić ?
    };
    string = string.trim();
    let result = '';

    let strlen = string.length;
    for (i = 0; i < strlen; i++) {
        const letter = string[i];
        if (utf.hasOwnProperty(letter)) result += utf[letter];
        else result += letter;
    }
    return result;
}

function isCurrentPage(page) {
    page = page.replaceAll('.', '\.').replaceAll('/', '\/');
    let regexp = new RegExp(page, 'ig');
    return Boolean(window.location.href.match(regexp));
}

function isTK() { return isCurrentPage('taniaksiazka.pl'); }

function isCBA() { return isCurrentPage('cba.kierus.com.pl'); }

function isBEE() { return isCurrentPage('bee.pl'); }

function isDev() {
    let env = document.querySelector('meta[env="dev"]');
    if (env) return env.getAttribute('env') == 'dev';
    return false;
}

function arrivingBasketsUrl(model) {
    return `https://jakistamlink.cba.kierus.com.pl?query=${model}?jakis_parametr=test`;
}

function px(value) { return value + 'px' }

function noPx(value) {
    if (Number.isInteger(value)) return value;
    if (typeof value == 'string') {
        let regexed = value.match(/(\d+)px/i);
        if (!regexed) return parseInt(value);
        return parseInt(regexed[1]);
    };
}

function userSelection(strong = false, exceptions = '') {
    var result = '';
    if (exceptions) exceptions = exceptions.split('').join('\\');

    if (document.activeElement.localName == 'input' || document.activeElement.localName == 'textarea') {
        let active = document.activeElement;
        let start = active.selectionStart;
        let end = active.selectionEnd;
        if (start != end) result = active.value.substr(start, end - start);
    } else result = window.getSelection().toString();

    if (strong) result = result.replace(new RegExp('[^a-z0-9ęóąśłżźćń' + exceptions + ']', 'ig'), ' ');

    result = result.replace(/\s{2,}/ig, ' ').trim();

    return result;
}

function getInterface() {
    let interfaceContainer = document.createElement('div');
    let minimize = document.createElement('div');
}

function getCloseBtn() {
    let close = document.createElement('div');
    close.classList.add('close-box');
}

function html(tag, attributes = {}) {
    const el = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key !== 'classes') el[key] = value;
        else {
            let classes = value.split(' ');
            if (!classes.length) break;

            if (classes.indexOf('tomczuk') > 0) classes.splice(classes.indexOf('tomczuk'), 1);

            classes.unshift('tomczuk');
            classes = classes.filter(cls => cls.length > 0);
            for (let className of classes) el.classList.add(className);
        }
    }
    return el;
}

function box(title) {
    const box = html('div', { classes: 'tomczuk-box' })
    const titleDiv = html('div', { classes: 'tomczuk-box-title', textContent: title });
    titleDiv.addEventListener('click', e => {
        e.stopPropagation();
        titleDiv.classList.toggle('minimized');
        const container = titleDiv.nextElementSibling;
        container.classList.toggle('tomczuk-minimized-box');
    });
    const container = html('div', { classes: 'tomczuk-box-container' });
    box.container = container;
    box.append(titleDiv, container);
    return box;
}

function btn({ value, url }) {
    let attributes = {};
    if (value) attributes.textContent = value;
    attributes.classes = 'tomczuk-btn';
    if (url) attributes.href = url;
    const btn = html('a', attributes);
    return btn;
}

function selfCopyInput(attributes = { value, classes, id }) {
    const input = html('input', attributes);

    input.addEventListener('click', () => {
        const VAL = input.value;
        navigator.clipboard.writeText(VAL).then(() => {
            const delayClassName = 'tomczuk-self-input-copying';
            input.value = 'KOPIUJĘ...';
            input.disabled = true;
            input.classList.add(delayClassName);

            setTimeout(() => {
                input.value = VAL;
                input.select();
                input.disabled = false;
                input.classList.remove(delayClassName);
            }, 500);

        });
    });

    return input;
}

async function getReportFromURL(url, additionalOptions = null) {
    let dom = await fetchPageDOM(url, additionalOptions);
    let rawReport = dom.querySelector('textarea#SqlReport').value;
    let labels = dom.querySelector('textarea#LabelsNames').value.trim().split("\t").map(label => label.toLowerCase());
    let result = [];
    rawReport.split("\n").forEach(row => {
        let obj = {};
        row.split("\t").forEach((value, i) => {
            obj[labels[i]] = value;
        });
        result.push(obj);
    });
    return result;
}

async function fetchPageDOM(url, additionalOptions = null) {
    let finalOptions = { method: 'get', credentials: 'include', mode: 'cors' };

    if (additionalOptions) {
        for (property in additionalOptions) {
            finalOptions[property] = additionalOptions[property];
        }
    }

    let html = await fetch(url, finalOptions);
    let buffer = await html.arrayBuffer();
    let text = new TextDecoder('iso-8859-2').decode(buffer);
    let dom = new DOMParser().parseFromString(text, 'text/html');
    return dom;
}

function unnamedYet() {
    document.addEventListener('keyup', e => {
        if (e.key == 'd' && e.ctrlKey && e.altKey) {
            console.log('go');

            console.log(userSelection());
            // let a = document.createElement('a');
            // a.textContent = 'testowy tomczukBaton';
            // a.href = window.location.href;
            // a.className = 'tomczuk-btn';

            // let body = document.querySelector('body');
            // body.append(a);
        }
    });
}

function setInitListeners() {
    document.addEventListener('click', e => {
        const rightPanel = CONFIG.rightPanel;
        if (!rightPanel.classList.contains('active')) return;
        if (!rightPanel.contains(e.target)) {
            rightPanel.classList.remove('active');
        }
    });
}

function basicInit(department) {
    if (!isTK() && !isDev()) return false;
    if (!isDev()) useTomczukToolbarStyles();
    const app = new App(department);
    setInitListeners();
    return app;
}


(async function main() {
    let app = basicInit('handlowy');
    if (!app) return;

    app.navBox();
    app.productBox();
    app.salesBox();




    console.log('success');
})();