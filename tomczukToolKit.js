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
    let css =
        `:root {
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
            font-size: 17px;
        }
        
        .tomczuk-right-panel {
            padding: 0;
            color: var(--silver-color);
            font-size: 1.2em;
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
            align-items: center;
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
            content: "\\25BC";
            text-transform: lowercase;
            display: flex;
            align-items: center;
            font-size: .6em;
            color: var(--red-color);
        }
        
        .tomczuk-box-title:hover {
            filter: brightness(1.05);
        }
        .tomczuk-box-title:hover::before {
            color: #f00;
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
            overflow: hidden;
            opacity: 1;
            max-height: 120px;
            pointer-events: all;
            transition: .5s;
        }
        
        .tomczuk-box-container.tomczuk-minimized-box {
            transition: .8s cubic-bezier(0,1,0,1);
            pointer-events: none;
            opacity: 0;
            max-height: 0;
        }
        
        .tomczuk-self-input {
            border: 1px solid black;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            font-size: 1em;
            padding: 3px;
            cursor: copy;
            border-radius: 3px;
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
            font-size: 1em;
            border-radius: 5px;
            padding: 2px 0;
            background: var(--silver-color);
            color: #000;
            transition: 150ms;
            text-transform: uppercase;
        }
        
        .tomczuk-btn:hover {
            text-decoration: none;
            box-shadow: inset 0 0 3px 1px #444;
            background-color: #fefefe;
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
        
        .tomczuk-btn.tomczuk-mobile-btn {
            color: rgba(0,0,0,0);
            background-image: url("https://www.svgrepo.com/show/91399/mobile-phone-design.svg");
        }
        
        .tomczuk-mobile-mode {
            background-color: greenyellow;
            border-color: var(--red-color);
        }
        .tomczuk-mobile-mode:hover {
            background-color: orange;
        }
        
        #panel-toggler {
            border: 2px solid greenyellow;
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
            background-color: greenyellow;
        }
        
        #panel-toggler.pinned:hover {
            border-color: var(--red-color);
        }
        
        #panel-toggler.unpinned:hover {
            border-color: black;
        }`
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
        this.department = department;
        this.getRightPanel();

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

    allow(departments) {
        return departments.includes(this.department);
    }
    forbid(departments) {
        return !departments.includes(this.department)
    }

    getRightPanel() {
        let rightPanel = html('div', { classes: 'tomczuk-right-panel' });
        CONFIG.rightPanel = rightPanel;
        document.body.append(rightPanel);
        this.rightPanel = rightPanel;

        rightPanel.pin = function() {
            storage('tomczukPanelToggler', 'pinned');
            rightPanel.querySelector('#panel-toggler').classList.add('pinned');
            rightPanel.querySelector('#panel-toggler').classList.remove('unpinned');
            rightPanel.classList.add('permactive');
        }

        rightPanel.unpin = function() {
            storage('tomczukPanelToggler', 'unpinned');
            rightPanel.querySelector('#panel-toggler').classList.remove('pinned');
            rightPanel.querySelector('#panel-toggler').classList.add('unpinned');
            rightPanel.classList.remove('permactive');
        }

        rightPanel.canTogglePanel = (clickedEl) => {
            return clickedEl.querySelector('.tomczuk-box');
        }

        rightPanel.addEventListener('click', e => {
            if (!rightPanel.canTogglePanel(e.target) || rightPanel.classList.contains('permactive')) return;
            setTimeout(() => {
                if (!rightPanel.classList.contains('permactive')) rightPanel.classList.toggle('active')
            }, 180);
        });

        rightPanel.addEventListener('dblclick', e => {
            e.stopPropagation();
            if (!rightPanel.canTogglePanel(e.target)) return;

            if (rightPanel.classList.contains('permactive')) {
                rightPanel.unpin();
            } else {
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

        this.getHeader();
        this.makeUtilityContainer();
        return rightPanel;
    }

    makeUtilityContainer() {
        const container = html('div', { classes: 'tomczuk-utility-container' });
        const primary = this.getPrimary();
        const secondary = this.getSecondary();
        container.primary = primary;
        container.secondary = secondary;
        container.append(primary, secondary);
        this.rightPanel.append(container);
        this.rightPanel.container = container;
    }

    getHeader() {
        const rightPanel = this.rightPanel;
        const header = html('div', { classes: 'tomczuk-right-panel-header' });
        header.append(html('div', { textContent: '.tomczukToolKit' }));

        const panelToggler = html('div', { id: 'panel-toggler' });
        header.prepend(panelToggler);
        rightPanel.append(header);

        if (storage('tomczukPanelToggler') == 'pinned') rightPanel.pin();
        else rightPanel.unpin();

        panelToggler.addEventListener('click', e => {
            if (storage('tomczukPanelToggler') == 'pinned') rightPanel.unpin();
            else rightPanel.pin();
        });
        rightPanel.header = header;
    }

    getPrimary() {
        const primary = html('div', { classes: 'tomczuk-primary' });
        return primary;
    }

    getSecondary() {
        const secondary = html('div', { classes: 'tomczuk-secondary' });
        return secondary;
    }

    navBox() {
        const allowed = this.forbid([]);

        if (!allowed) return;

        let nav = box('Nawigacja');
        const navBtnsContainer = html('div', { classes: 'tomczuk-nav-btns-container tomczuk-row-btns' });
        const reCacheBtn = html('a', { classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-recache-btn' });
        reCacheBtn.addEventListener('click', async e => {
            const basicUrl = window.location.href.match(/^https?:\/\/[^\/]*/);
            try { await fetch(basicUrl + '/?ReCache=1'); } catch (e) {}
            window.location.reload();
        });

        const mobileBtn = html('a', { textContent: '_', classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-mobile-btn' });
        if (sessionStorage.tomczukMobileMode !== 'true') {
            mobileBtn.classList.remove('tomczuk-mobile-mode');
        } else {
            mobileBtn.classList.add('tomczuk-mobile-mode');
        }
        mobileBtn.addEventListener('click', async e => {
            const basicUrl = window.location.href.match(/^https?:\/\/[^\/]*/);
            if (!mobileBtn.classList.contains('tomczuk-mobile-mode')) {
                mobileBtn.classList.add('tomczuk-mobile-mode');
                sessionStorage.tomczukMobileMode = 'true';
                try { await fetch(basicUrl + '/?Theme=Mobile'); } catch (e) {}
                window.location.reload(true);
            } else {
                mobileBtn.classList.remove('tomczuk-mobile-mode');
                sessionStorage.tomczukMobileMode = 'false';
                try { await fetch(basicUrl + '/?Theme='); } catch (e) {}

                window.location.reload(true);
            }
        });



        navBtnsContainer.append(reCacheBtn);
        navBtnsContainer.append(mobileBtn);

        nav.container.append(navBtnsContainer);
        this.rightPanel.container.primary.append(nav);
    }

    productBox() {
        const allowed = this.forbid([]);

        if (!allowed) return;

        let model = this.productModel();
        if (isDev() && !model) model = '9788382158106';
        if (!model) return;

        const productBox = box('Produkt');
        const input = selfCopyInput({ value: model, classes: 'tomczuk-self-input' });
        productBox.container.append(input);

        const btnsContainer = html('div', { classes: 'tomczuk-product-btns-container tomczuk-row-btns' });
        if (!isCBA()) btnsContainer.append(btn({ value: 'cba', url: `https://cba.kierus.com.pl/?p=EditProduct&load=*${model}` }));
        if (!isTK()) btnsContainer.append(btn({ value: 'tk', url: `https://www.taniaksiazka.pl/Szukaj/q-${model}` }));
        if (!isBEE()) btnsContainer.append(btn({ value: 'bee', url: `https://www.bee.pl/Szukaj/q-${model}?pf-size=24&pf-page=1` }))
        const basketsUrlBtn = btn({ value: 'Jadące koszyki', url: arrivingBasketsUrl(model) });


        productBox.container.append(btnsContainer);
        productBox.container.append(basketsUrlBtn);

        this.rightPanel.container.primary.append(productBox);
    }

    productModel() {
        const allowed = this.forbid([]);

        if (!allowed) return;

        const model = this.ctrl.productModel();
        return model ? model : false;
    }

    salesBox() {
        const allowed = this.allow([
            'handlowy'
        ])
        if (!allowed) return;

        let model = this.productModel();
        if (isDev() && !model) model = '9788382158106';
        if (model) {
            const salesBox = box('Sprzedaż');
            const resultBox = html('div', { classes: 'tomczuk-sales-result-box', text: 'Sprzedaż z X dni:' });

            salesBox.append(resultBox);



            this.rightPanel.container.secondary.append(salesBox);
        }
    }
}

class Controller {
    constructor() {}

    productModel() {
        return false;
    }

    redirectFromSearchPage() {
        if (!this.isSearchPage()) return;
        console.log('wyszukiwanie');
        const searchText = this.searchText();
        console.log(searchText);
        const url = this.searchedElementUrl(searchText);
        if (!url) return;
        console.log(url);
        window.location.href = url;
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

    isSearchPage() {
        return isCurrentPage('taniaksiazka.pl/Szukaj/q-');
    }

    searchText() {
        let searchText = document.querySelector('div.text.search-results.text-with-border > strong');
        if (!searchText) return null;
        searchText = searchText.textContent;
        if (!searchText) return null;
        return searchText;
    }

    searchedElementUrl(searchText) {
        const searchedElement = document.querySelector(`a[data-model="${searchText}"]`);
        if (!searchedElement) return false;
        return searchedElement.href;
    }
}

class CBAController extends Controller {

}

class BEEController extends Controller {
    productModel() {
        let meta = document.querySelector('meta[itemprop="productID"]');
        if (!meta) return false;

        let model = meta.getAttribute('content');
        if (!model) return false;

        return model;
    }
    
    isSearchPage() {
        return isCurrentPage('bee.pl/Szukaj/q-');
    }

    searchText() {
        let url = window.location.href;
        let searchText = url.match(/Szukaj\/q\-([^\?]*)/i);
        if (!searchText) return null;
        searchText = searchText[1];
        return searchText;
    }

    searchedElementUrl(searchText) {
        console.log(`szukam: ${searchText}`);
        const searchedElement = document.querySelector(`a[data-model="${searchText}"]`);
        console.log(`znalazłem: ${searchedElement}`);
        if (!searchedElement) return false;
        return searchedElement.href;
    }
}

class BasicController extends Controller {
    productModel() {
        return false;
    }
}

function storage(key, value = null) {
    if (value === null) return getFromLocalStorage(key);
    return setToLocalStorage(key, value);
}

function getFromLocalStorage(key) {
    let storage = storageObj();
    if (!storage) return null;
    if (!storage.hasOwnProperty(key)) null;
    return storage[key];
}

function setToLocalStorage(key, value) {
    let storage = storageObj();
    if (!storage) {
        localStorage.tomczukToolKit = `${key}=${value}`;
        return true;
    }
    if (storage[key] !== undefined) {
        storage[key] = value;

        let storageStr = '';
        for (const storageKey in storage) {
            storageStr += `${storageKey}=${storage[storageKey]}&`;
        }
        localStorage.tomczukToolKit = storageStr.slice(0, -1);

        return true;
    };
    localStorage.tomczukToolKit += '&' + key + '=' + value;
    return true;
}

function storageObj() {
    const storageStr = localStorage.tomczukToolKit;
    if (!storageStr) return null;
    let resultObj = {};

    for (const pair of storageStr.split('&')) {
        let [key, val] = pair.split('=');

        if (val.match(/^\d*$/)) {
            resultObj[key] = parseInt(val);
            continue;
        }
        if (val.match(/^\d*\.\d*$/)) {
            resultObj[key] = parseFloat(val);
            continue;
        }
        if (val.match(/^true|false$/i)) {
            resultObj[key] = val.match(/true/i) ? true : false;
            continue;
        }

        resultObj[key] = val;
    }
    return resultObj;
}

function emptyStorage() {
    delete localStorage.tomczukToolKit;
    return true;
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
    return `https://cba.kierus.com.pl/?p=SupplierBasket&a=Filter&sp=0&stm=&stl=&edtm=&edtl=&dtm=&dtl=&SbkStatus=unreceived&SbkOrderBy=Id&SbkViewBy=DESC&opiekun=&product_filter=${model}&doc_filter=&Magazine=-1&DocumentFilter=0`;
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
    const container = html('div', { classes: 'tomczuk-box-container' });
    box.container = container;
    box.append(titleDiv, container);


    let minimizeOptName = title.toLowerCase() + '-boxMinimized';
    if (storage(minimizeOptName) == true) {
        titleDiv.classList.add('minimized');
        container.classList.add('tomczuk-minimized-box');
    }

    titleDiv.addEventListener('click', e => {
        e.stopPropagation();
        titleDiv.classList.toggle('minimized');
        const container = titleDiv.nextElementSibling;
        container.classList.toggle('tomczuk-minimized-box');

        if (titleDiv.classList.contains('minimized')) storage(minimizeOptName, 'true');
        else storage(minimizeOptName, 'false');
    });
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
    if (!isTK() && !isDev() && !isBEE()) return false;
    if (!isDev()) useTomczukToolbarStyles();
    const app = new App(department);
    app.ctrl.redirectFromSearchPage();
    setInitListeners();
    return app;
}


//START APP


(async function main() {
    let app = basicInit('handlowy');
    if (!app) return;

    app.navBox();
    app.productBox();
    app.salesBox();

    console.log('success');
})();