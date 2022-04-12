// ==UserScript==
// @name     tomczukToolKit
// @version  1
// @grant    none
// ==/UserScript==

// ========================== CONFIG ==========================

const CONFIG = {elems: []};

// ========================== CONFIG ==========================


function useTomczukToolbarStyles() {
    let style = document.createElement('style');
    style.id = 'tomczuk-toolbar-styles';
    let css =
        `:root {
            --right-panel-width: 400px;
            --main-transition: 250ms;
            --silver-color: #dedede;
            --red-color: #f55;
        }
        
        .tomczuk {
            all: revert;
            font-family: calibri;
            z-index: 99999;
            outline: none;
            font-size: 17px;
            line-height: normal;
        }
        
        .tomczuk-right-panel {
            padding: 0;
            color: var(--silver-color);
            font-size: 1.2em;
            position: fixed;
            top: 0;
            right: 0;
            border-left: 3px solid #000;
            background: rgba(0, 0, 0, 0.5);
            height: 100vh;
            width: var(--right-panel-width);
            transition: var(--main-transition) ease-out;
            box-shadow: inset 80px 0 80px -60px rgba(0, 0, 0, 0.5);
            user-select: none;
        }
        
        .tomczuk-right-panel.tomczuk-click-through {
            opacity: .03;
            pointer-events: none;
        }
        
        .tomczuk-right-panel.tomczuk-pinned {
            right: 0;
        }
        
        .tomczuk-right-panel.tomczuk-full {
            right: 0;
        }
        
        .tomczuk-right-panel.tomczuk-invisible {
            top: 100vh;
            right: calc(var(--right-panel-width) * -1) !important;
        }
        
        .tomczuk-right-panel.tomczuk-hidden {
            right: calc(30px - var(--right-panel-width));
        }
        
        .tomczuk-right-panel.tomczuk-hidden:hover {
            opacity: .7;
        }
        
        .tomczuk-right-panel-header {
            padding: 7px 2px;
            background: rgba(0, 0, 0, 0.8);
            letter-spacing: 1px;
            display: flex;
            align-items: center;
        }
        
        .tomczuk-panel-toggler {
            background-color: var(--silver-color);
            border-radius: 5px;
            padding: 2px;
            font-size: .9em;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
        }
        
        .tomczuk-panel-toggler:hover {
            cursor: pointer;
            background-color: #ababab;
        }
        
        .tomczuk-panel-toggler.tomczuk-active {
            background-color: greenyellow;
        }
        
        .tomczuk-utility-container {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding: 0;
        }
        
        .tomczuk-primary,
        .tomczuk-secondary {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 5px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .tomczuk-box {
            border: 1px solid var(--silver-color);
            border-radius: 5px;
            margin: 4px 0;
            flex: 1;
            text-align: center;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .tomczuk-right-panel.tomczuk-hidden .tomczuk-box {
            display: none;
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
        
        .tomczuk-box-title-arrow {
            display: flex;
            align-items: center;
            font-size: .6em;
            color: var(--red-color);
        }
        
        .tomczuk-box-title-arrow.arrow-minimized {
            transform: rotate(-90deg);
        }
        
        .tomczuk-box-title:hover {
            filter: contrast(2);
        }
        
        .tomczuk-box-title-arrow:hover {
            color: #f00;
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
            pointer-events: inherit;
            transition: .5s;
        }
        
        .tomczuk-box-container.tomczuk-minimized-box {
            transition: .8s cubic-bezier(0, 1, 0, 1);
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
        
        .tomczuk-btn,
        .tomczuk-btn:visited {
            cursor: pointer;
            border: 1px solid black;
            text-decoration: none;
            flex: 1;
            font-size: 1em;
            border-radius: 5px;
            padding: 2px 0;
            background: var(--silver-color);
            color: #000;
            transition: filter 80ms;
            text-transform: uppercase;
        }
        
        .tomczuk-btn:hover {
            text-decoration: none;
            color: #000;
            filter: contrast(1.3);
        }
        
        .tomczuk-nav-btn {
            background-size: 30%;
            background-origin: content-box;
            background-position: center;
            background-repeat: no-repeat;
            font-size: 1.5em;
            padding: 5px;
        }
        
        .tomczuk-mobile-mode {
            background-color: greenyellow;
            border-color: var(--red-color);
        }
        
        .tomczuk-mobile-mode:hover {
            background-color: orange;
        }
        
        .tomczuk-goup-btn {
            opacity: 1;
            transition: opacity 600ms;
        }
        
        .tomczuk-hidden {
            opacity: .5;
            cursor: default;
        }
        
        .tomczuk-hidden:hover {
            filter: none;
        }
        
        .tomczuk-goup-btn.tomczuk-hidden {
            filter: none;
        }
        
        .tomczuk-product-info-box {
            text-align: center;
            display: flex;
            flex-direction: column;
            max-height: 120px;
        }
        
        .tomczuk-product-info-box.tomczuk-hidden {
            display: none;
        }
        
        .tomczuk-product-info-box>.tomczuk-box-child {
            margin: 3px;
            background: green;
            color: white;
            z-index: 1;
        }
        
        .tomczuk-btn.tomczuk-product-list-mode {
            background: greenyellow;
        }
        
        .tomczuk-copy-product-list,
        .tomczuk-modify-product-list {
            font-size: 1.5em;
        }
        
        .tomczuk-invisible-btn {
            position: fixed;
            cursor: pointer;
            right: 0;
            bottom: 0;
            font-size: 12px;
            z-index: 100000;
        }
        
        .tomczuk-invisible-btn:hover {
            filter: brightness(1.5);
        }`;

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
            if (!body) html.append(document.createElement('body'));
        } else {
            let html = document.createElement('html');
            document.append(html);
            html.append(head);
            head.append(style);
            if (!body) html.append(document.createElement('body'));
        }
    }
}

class App {
    constructor(department) {
        this.department = department;

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
            case isCurrentPage('fantastyczneswiaty.pl'):
                this.ctrl = new FantastyczneSwiatyController;
                break;
            case isCurrentPage('bonito.pl'):
                this.ctrl = new BonitoController;
                break;
            case isCurrentPage('gandalf.com.pl'):
                this.ctrl = new GandalfController;
                break;
            case isCurrentPage('swiatksiazki.pl'):
                this.ctrl = new SwiatKsiazkiController;
                break;
            case isCurrentPage('tantis.pl'):
                this.ctrl = new TantisController;
                break;
            case isCurrentPage('czytam.pl'):
                this.ctrl = new CzytamController;
                break;
            case isCurrentPage('wydawnictwokobiece.pl'):
                this.ctrl = new WKController;
                break;
            case isCurrentPage('czarymary.pl'):
                this.ctrl = new CMController;
                break;
            case isCurrentPage('allegro.pl/oferta'):
                this.ctrl = new AllegroController;
                break;
            case isCurrentPage('matras.pl'):
                this.ctrl = new MatrasController;
                break;
            default:
                this.ctrl = new BasicController;
        }

        this.getRightPanel();
    }

    allow(departments, feature) {
        return (departments.includes(this.department) && this.ctrl.showFeature(feature));
    }
    forbid(departments, feature) {
        return (!departments.includes(this.department) && this.ctrl.showFeature(feature));
    }

    getRightPanel() {
        let rightPanel = html('div', { classes: 'tomczuk-right-panel' });
        CONFIG.rightPanel = this.rightPanel = rightPanel;

        rightPanel.adjustWidth = () => {
            if (rightPanel.classList.contains('tomczuk-pinned')) return;
            let panelWidth = 400;
            let minSpace = 30;
            let space = this.ctrl.spaceForPanel();
            if (!space) {
                rightPanel.hide();
            } else {
                rightPanel.classList.remove('tomczuk-hidden');
                rightPanel.style.right = Math.min(0, Math.max(space - panelWidth, minSpace - panelWidth)) + 'px';
            }
        }

        rightPanel.fullWidth = () => {
            if (rightPanel.classList.contains('tomczuk-pinned')) return;
            rightPanel.removeAttribute('style');
            rightPanel.classList.remove('tomczuk-hidden');
            rightPanel.classList.add('tomczuk-full');
        }

        rightPanel.hide = () => {
            if (rightPanel.classList.contains('tomczuk-pinned')) return;
            rightPanel.classList.remove('tomczuk-full');
            rightPanel.classList.add('tomczuk-hidden');
        }

        rightPanel.pin = () => {
            rightPanel.removeAttribute('style');
            rightPanel.classList.add('tomczuk-pinned');
            rightPanel.classList.remove('tomczuk-full', 'tomczuk-hidden');
            storage('tomczukPanelToggler', 'pinned')
        }

        rightPanel.unpin = () => {
            rightPanel.classList.remove('tomczuk-pinned');
            rightPanel.fullWidth();
            storage('tomczukPanelToggler', 'unpinned')
        }

        if (storage('tomczukPanelToggler') == 'pinned') {
            rightPanel.pin();
        } else rightPanel.adjustWidth();

        let timeOutId;
        rightPanel.addEventListener('mouseleave', e => {
            if (rightPanel.classList.contains('tomczuk-pinned')) return;
            timeOutId = setTimeout(() => {
                rightPanel.adjustWidth();
            }, 800);
        });

        rightPanel.addEventListener('mouseover', e => clearTimeout(timeOutId));


        rightPanel.addEventListener('click', e => {
            let classes = e.target.classList;

            if (
                classes.contains('tomczuk-right-panel') ||
                classes.contains('tomczuk-primary') ||
                classes.contains('timczuk-secondary') ||
                classes.contains('tomczuk-utility-container') ||
                classes.contains('tomczuk-right-panel-header') ||
                classes.contains('tomczuk-right-panel-header-title')
            ) {
                rightPanel.fullWidth();
                rightPanel.classList.remove('tomczuk-hidden');
            }
        });

        this.getHeader();
        this.makeUtilityContainer();
        document.body.append(rightPanel);
        return rightPanel;
    }

    getInvisibleBtn() {
        let btn = html('a', { classes: 'tomczuk-invisible-btn tomczuk-invisible' });
        if (storage('tomczukRightPanelInvisible') == false) {
            this.rightPanel.classList.remove('tomczuk-invisible');
            btn.innerHTML = '&#128317;';
        } else {
            this.rightPanel.classList.add('tomczuk-invisible');
            storage('tomczukRightPanelInvisible', 'true');
            btn.innerHTML = '&#128316;';
        }

        btn.addEventListener('click', e => {
            this.rightPanel.classList.toggle('tomczuk-invisible');
            if (this.rightPanel.classList.contains('tomczuk-invisible')) {
                btn.innerHTML = '&#128316;';
                storage('tomczukRightPanelInvisible', 'true');
            } else {
                btn.innerHTML = '&#128317;'
                storage('tomczukRightPanelInvisible', 'false');
            }
        });

        this.rightPanel.after(btn);
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
        header.append(html('div', { textContent: '.tomczukToolKit', classes: 'tomczuk-right-panel-header-title' }));
        const panelToggler = this.getPanelToggler(storage('tomczukPanelToggler'));

        header.prepend(panelToggler);
        rightPanel.append(header);
        rightPanel.header = header;
    }

    getPanelToggler(pinned) {
        const panelToggler = html('div', { classes: 'tomczuk-panel-toggler', innerHTML: '&#128204;' });
        const activeClass = 'tomczuk-active';

        if (pinned == 'pinned') panelToggler.classList.add(activeClass);

        panelToggler.addEventListener('click', e => {
            if (panelToggler.classList.contains(activeClass)) {
                this.rightPanel.unpin();
                panelToggler.classList.remove(activeClass);
            } else {
                this.rightPanel.pin();
                panelToggler.classList.add(activeClass);
            }
        });
        return panelToggler;
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
        const allowed = this.forbid([], 'navBox');

        if (!allowed) return;

        let nav = box('Nawigacja');
        const navBtnsContainer = html('div', { classes: 'tomczuk-nav-btns-container tomczuk-row-btns' });

        let reCacheBtn = this.getReCacheBtn();
        if (reCacheBtn) navBtnsContainer.append(reCacheBtn);

        const mobileBtn = this.getMobileBtn();
        if (mobileBtn) navBtnsContainer.append(mobileBtn);

        const goUpBtn = html('a', {
            innerHTML: '&#11014;&#65039;',
            classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-goup-btn'
        });
        goUpBtn.classList.toggle('tomczuk-hidden', !window.scrollY);


        goUpBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo(0, 0);
        });


        navBtnsContainer.append(goUpBtn);

        nav.container.append(navBtnsContainer);
        this.rightPanel.container.primary.append(nav);
    }

    getReCacheBtn() {
        const allowed = this.forbid([], 'reCacheBtn');
        if (!allowed) return null;
        const reCacheBtn = html('a', {
            classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-recache-btn',
            innerHTML: '&#128260;'
        });

        reCacheBtn.addEventListener('click', async e => {
            const basicUrl = window.location.href.match(/^https?:\/\/[^\/]*/);
            try { await fetch(basicUrl + '/?ReCache=1'); } catch (e) { }
            window.location.reload();
        });

        return reCacheBtn;
    }

    getMobileBtn() {
        const allowed = this.forbid([], 'mobileBtn');
        if (!allowed) return null;

        const mobileBtn = html('a', {
            innerHTML: '&#128241;',
            classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-mobile-btn'
        });

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
                try { await fetch(basicUrl + '/?Theme=Mobile'); } catch (e) { }
                window.location.reload(true);
            } else {
                mobileBtn.classList.remove('tomczuk-mobile-mode');
                sessionStorage.tomczukMobileMode = 'false';
                try { await fetch(basicUrl + '/?Theme='); } catch (e) { }

                window.location.reload(true);
            }
        });

        return mobileBtn;
    }

    productBox() {
        const allowed = this.forbid([], 'productBox');
        if (!allowed) return;

        let model = this.ctrl.productModel();
        if (isDev() && !model) model = '9788382158106';
        if (!model) return;

        const productBox = box('Produkt');
        const input = selfCopyInput({ value: model });
        productBox.container.append(input);

        const btnsContainer = html('div', { classes: 'tomczuk-product-btns-container tomczuk-row-btns' });
        if (!isCBA()) btnsContainer.append(btn({ value: 'cba', url: `https://cba.kierus.com.pl/?p=EditProduct&load=*${model}` }));
        if (!isTK()) btnsContainer.append(btn({ value: 'tk', url: `https://www.taniaksiazka.pl/Szukaj/q-${model}` }));
        if (!isBEE()) btnsContainer.append(btn({ value: 'bee', url: `https://www.bee.pl/Szukaj/q-${model}?pf-size=24&pf-page=1` }))


        const comingBasketsUrlBtn = this.comingBasketsUrlBtn(model);

        productBox.container.append(btnsContainer);

        if (comingBasketsUrlBtn) productBox.container.append(comingBasketsUrlBtn);

        this.rightPanel.container.primary.append(productBox);
    }

    comingBasketsUrlBtn(model) {
        const allowed = this.allow('handlowy', 'comingBasketsUrlBtn');
        if (!allowed) return null;
        return btn({ value: 'Jadące koszyki', url: arrivingBasketsUrl(model) });
    }

    async productListBox() {
        const productListBox = box('Lista produktów');
        const btnsContainer = html('div', { classes: 'tomczuk-product-btns-container tomczuk-row-btns' });
        const copyListBtn = html('a', { innerHTML: '&#128203;', classes: 'tomczuk-btn tomczuk-copy-product-list' });
        const modifyListBtn = html('a', { innerHTML: '&#128200;', classes: 'tomczuk-btn tomczuk-modify-product-list' });

        if (storage('productListMode') == true) {
            modifyListBtn.classList.add('tomczuk-product-list-mode');
            this.ctrl.modifyProductList(true);
        } else {
            modifyListBtn.classList.remove('tomczuk-product-list-mode');
            this.ctrl.modifyProductList(false);
        }

        modifyListBtn.addEventListener('click', async e => {
            if (!modifyListBtn.classList.contains('tomczuk-product-list-mode')) {
                modifyListBtn.classList.add('tomczuk-product-list-mode');
                storage('productListMode', 'true');
                this.ctrl.modifyProductList(true);
            } else {
                modifyListBtn.classList.remove('tomczuk-product-list-mode');
                storage('productListMode', 'false');
                this.ctrl.modifyProductList(false);
            }
        });

        copyListBtn.addEventListener('click', e => {
            e.preventDefault();
            copyListBtn.classList.add('tomczuk-hidden');
            setTimeout(() => {
                copyListBtn.classList.remove('tomczuk-hidden');
            }, 1200);
            navigator.clipboard.writeText(this.ctrl.objToXls(this.ctrl.productList()));
        });

        productListBox.container.append(btnsContainer);
        btnsContainer.append(copyListBtn);
        btnsContainer.append(modifyListBtn);
        this.rightPanel.container.primary.append(productListBox);
    };


    salesBox() {
        const allowed = this.allow([
            'handlowy'
        ], 'salesBox')
        if (!allowed) return;

        let model = this.ctrl.productModel();
        if (isDev() && !model) model = '9788382158106';
        if (model) {
            console.log('powinno działać');
            const salesBox = box('Sprzedaż');
            const resultBox = html('div', { classes: 'tomczuk-sales-result-box'});
            getSellReportForModel(model, resultBox);
            salesBox.append(resultBox);

            this.rightPanel.container.secondary.append(salesBox);
        }
    }
}

class HTMLBuilder {

}

class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.cfg = this.getCfg();
        if (this.cfg.access === false) return;

        this.cfg.productListContainerElement = document.querySelector(this.cfg.productListContainerSelector);
        this.cfg.productListElementsArray = [...this.cfg.productListContainerElement?.querySelectorAll(this.cfg.productListElementSelector) ?? []];
        this.getBoxesArray();
        console.log(this.cfg);
    }

    getCfg() {
        return {
            access: false,
            productListContainerSelector: null,
            productListContainerElement: null,
            productListElementSelector: null,
            productListElementsArray: [],
            productBoxSelector: null,
            productBoxesArray: [],
            fetchRequired: false,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return null },
            modelSelector: null,
            getModel: async function (modelElement) { return null; }
        };
    }

    getBoxesArray() {
        this.cfg.productBoxesArray = [...document.querySelectorAll(this.cfg.productBoxSelector) ?? []];
        if(this.cfg.mutationObserverRequired == false) return this.cfg.productBoxesArray;

        const callback = async function(mutationsList) {
            for(const mutation of mutationsList) {
                if(mutation.type !== 'childList') return;
                let neededNodes = [...mutation.target.querySelectorAll(CONFIG.app.ctrl.cfg.productBoxSelector)]
                if(neededNodes.length === 0) return;
                CONFIG.app.ctrl.cfg.productBoxesArray = [...new Set([
                    ...neededNodes,
                    ...CONFIG.app.ctrl.cfg.productBoxesArray
                ])];

                await CONFIG.app.ctrl.modifyProductList(storage('productListMode'));
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true, subtree: true });
    }
   
    async modifyProductList(show = true) {
        if(this.cfg.access === false) return null;
        
        let list = this.cfg.productBoxesArray;
        for(let el of list) {
            if(el.modifiedBox === true) {
                el.parentElement.querySelector('.tomczuk-product-info-box').classList.toggle('tomczuk-hidden', !show);
                continue;
            }
            this.cfg.getModel(el).then(model => {
                el.modifiedBox = true;
                let infoBox = html('div', { classes: 'tomczuk-product-info-box' });
                el.before(infoBox);
                let url = model ? `https://cba.kierus.com.pl/?p=EditProduct&load=*${model}` : '';
                infoBox.append(html('a', { classes: 'tomczuk-box-child', textContent: `cba: ${model}`, href: url }));
                infoBox.classList.toggle('tomczuk-hidden', !show);
            });
        }
        return list;
    }

    mainContainerSelectors() {
        return null;
    }

    spaceForPanel() {
        let selectors = this.mainContainerSelectors();
        let selector = (!Array.isArray(selectors)) 
            ? selectors 
            : selectors.find(sel => document.querySelector(sel));

        if (!selector) return null;
        let container = document.querySelector(selector);
        if (!container) return null;

        return ((noPx(window.getComputedStyle(document.body).width) - container.clientWidth) / 2 - 10);
    }

    productModel(dom = null) {
        return null;
    }

    redirectFromSearchPage() {
        if (!this.isSearchPage()) return;
        const searchText = this.searchText();
        const url = this.searchedElementUrl(searchText);
        if (!url) return;
        window.location.href = url;
    }

    isSearchPage() { }
    searchText() { }
    searchedElementUrl() { }

    objToXls(obj) {
        let models = Object.keys(obj).filter(model => model !== 'keys');

        let string = "model\t" + obj.keys.join("\t");
        for (let model of models) {
            string += `\n${model}`;
            for (let key of obj.keys) {
                let value = obj[model][key];
                if (key === 'price') value = value.replace('.', ',');
                string += `\t${value}`;
            }
        }
        return string;
    }

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: [
                'mobileBtn',
                'reCacheBtn'
            ]
        }
    }

    showFeature(feature) {
        const { accepted, forbidden } = this.featuresPermissions();

        if (forbidden.length > 0) {
            if (forbidden.find(el => el === feature)) return false;
            else return true;
        }

        if (accepted.length > 0) {
            if (accepted.find(el => el === feature)) return true;
            else return false;
        }
        return true;
    }
}

class TKController extends Controller {
    getCfg() {
        return {
            access: true,
            productListContainerSelector: 'ul#pagi-slide',
            productListContainerElement: null,
            productListElementSelector: 'li',
            productListElementsArray: [],
            productBoxSelector: '.product-container',
            productBoxesArray: [],
            fetchRequired: false,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a[data-model]',
            getModel: async function (modelElement) {
                return modelElement.querySelector(this.modelSelector)?.dataset.model;
            }
        }
    };

    mainContainerSelectors() {
        if (sessionStorage.tomczukMobileMode === 'true') return '#header > .container';
        return 'header#top';
    }

    productModel(dom = null) {
        if (!dom) dom = document;

        let meta = dom.querySelector('meta[itemprop="productID"]');
        if (!meta) return null;

        let model = meta.getAttribute('content');
        if (!model) return null;
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

    productList() {
        let els = this.cfg.productListElementsArray;

        let products = {};
        products.keys = ['title', 'price', 'discount', 'category', 'author', 'availability', 'url'];
        for (let prod of els) {
            let obj = {};
            let a = prod.querySelector('a[data-model]');
            if (!a) continue;
            const model = a.dataset.model;

            obj.url = a.href;
            obj.title = a.dataset.name;
            obj.category = a.dataset.category;
            obj.price = a.dataset.price;

            const avail = prod.querySelector('.product-availability-wrapper');
            obj.availability = avail ? avail.textContent.trim() : '';

            const discount = prod.querySelector('.product-discount');
            obj.discount = discount ? discount.textContent.trim() : '-';

            const authors = prod.querySelector('.product-authors');

            obj.author = '';
            if (authors) {
                let authorList = authors.querySelectorAll('a');
                if (!authorList) break;

                authorList = [...authorList];

                let authorString = authorList.map(a => a.textContent.trim()).join(', ');

                obj.author = authorString;
            }

            products[model] = obj;
        }
        if (Object.keys(products).length == 0) return null;
        return products;
    }

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: []
        };
    }
}

class CMController extends Controller {
    getCfg() {
        return {
            access: true,
            productListContainerSelector: '#SearchProdDiv tbody',
            productListContainerElement: null,
            productListElementSelector: '#RowResultsWhite',
            productListElementsArray: [],
            productBoxSelector: 'a[data-model].cmp_m_prod_tytul',
            productBoxesArray: [],
            fetchRequired: false,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a[data-model].cmp_m_prod_tytul',
            getModel: async function (modelElement) {
                return modelElement?.dataset.model;
            }
        }
    };

    mainContainerSelectors() {
        return [
            'header#top',
            'header > div.container.clearfix'
        ];
    }

    productModel() {
        let meta = document.querySelector('meta[itemprop="productID"]');
        return meta ? meta.getAttribute('content') : null;
    }
}

class CBAController extends Controller {

}

class AllegroController extends Controller {
    mainContainerSelectors() {
        return 'div[data-role="header-primary-bar"]';
    }

    productModel() {
        let boxes = [];
        let desc = boxes.push(document.querySelector('div[data-box-name="Container Description"]'));
        if (!desc) return null;

        boxes.push(document.querySelector('div[data-box-name="Container Parameters"]'));
        boxes.push(desc);

        let string = boxes.map(el => el.innerText).join('');
        string = string.replaceAll(/[\s\-]/g, '').match(/[^\d](\d{13})[^\d]/);
        return string.length === 0 ? null : string[1];
    }
}

class BEEController extends Controller {
    mainContainerSelectors() {
        if (sessionStorage.tomczukMobileMode === 'true') return '#header .container';
        return '#header .container';
    }

    getCfg() {
        return {
            access: true,
            productListContainerSelector: 'div.product_list.row',
            productListContainerElement: null,
            productListElementSelector: '.product-container',
            productListElementsArray: [],
            productBoxSelector: '.product-container',
            productBoxesArray: [],
            fetchRequired: false,
            mutationObserverRequired: true,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a[data-model]',
            getModel: async function (modelElement) {
                return modelElement.querySelector(this.modelSelector)?.dataset.model;
            }
        }
    };

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
        const searchedElement = document.querySelector(`a[data-model="${searchText}"]`);
        if (!searchedElement) return false;
        return searchedElement.href;
    }

    getSelectorsForProductList() {
        return { list: '.product_list', container: '.li.ajax_block_product' };
    }

    productList() {
        let ul = document.querySelectorAll('div.row div.product_list');
        if (!ul) return null;
        ul = [...ul].filter(div => !div.classList.contains('products'));

        if (ul.length === 1) ul = ul[0];
        else return null;

        let els = ul.querySelectorAll('.product-container');
        if (!els) return null;
        els = [...els].filter(div => !div.classList.contains('productlike-adzone'));

        let products = {};
        products.keys = ['name', 'price', 'discount', 'category', 'brand', 'size', 'availability', 'url'];
        for (let prod of els) {
            let obj = {};
            let a = prod.querySelector('a.product-name[data-model]');
            if (!a) continue;
            const model = a.dataset.model;

            obj.url = a.href ? a.href : '-';
            obj.category = a.dataset.category ? a.dataset.category : '-';
            obj.price = a.dataset.price ? a.dataset.price : '-';
            let [brand, name, size] = [
                a.querySelector('.products-title-prefix'),
                a.querySelector('.products-title-name'),
                a.querySelector('.products-title-suffix')
            ];

            obj.brand = brand ? brand.textContent : '-';
            obj.name = name ? name.textContent : '-';
            obj.size = size ? size.textContent : '-';

            let avail = prod.querySelector('.product-available');
            obj.availability = avail ? avail.textContent : '';

            const discount = prod.querySelector('.product-discount');
            obj.discount = discount ? discount.textContent.trim() : '-';

            products[model] = obj;
        }

        return products;
    }

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: []
        };
    }

}

class FantastyczneSwiatyController extends Controller {
    mainContainerSelectors() {
        return [
            '.page div.header.container',
            '#header > div.container.clearfix'
        ];
    }

    productModel() {
        let match = document.body.innerText.match(/Model:\s+([\d\w@_]{3,30})/);
        if(!match) return null;
        if(match.length < 2) return null;
        let model = match[1];
        return model;
    }

    getCfg() {
        return {
            access: true,
            productListContainerSelector: '.category-products .products-grid',
            productListContainerElement: null,
            productListElementSelector: 'li.item',
            productListElementsArray: [],
            productBoxSelector: '.item-area',
            productBoxesArray: [],
            fetchRequired: false,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a.product-image img',
            getModel: async function(modelElement) {
                let el =  modelElement.querySelector(this.modelSelector);
                if(!el) return null;
                let match = el.dataset?.src?.match(/\/([^\/]{3,30})\.jpg/i);
                if(!match) return null;
                if(match.length < 2) return null;
                let model = match[1];
                return model;
            }
        }
    };
}

class BonitoController extends Controller {
    mainContainerSelectors() { return 'body > div.container'; }

    productModel() {
        let meta = document.querySelector('meta[property="og:upc"]');
        if (!meta) return null;

        let ean = meta.getAttribute('content');
        if (!ean) return null;
        return ean;
    }
}

class WKController extends Controller {
    mainContainerSelectors() { return '.blog-header > div.container'; }

    productModel() {
        let tds = document.querySelectorAll('table.shop_attributes > tbody > tr > td');
        if (!tds) return null;
        tds = [...tds].map(el => el.innerText.replaceAll('-', '').trim());
        let text = tds.find(el => el.match(/^\d{13,}$/));
        if (!text) return null;

        return text;
    }
}

class GandalfController extends Controller {
    mainContainerSelectors() { return '.top-menu > .container:not(.infoheader)'; }

    productModel() {
        let list = document.querySelector('div#product-details.details-list');

        if (!list) return null;

        list = list.querySelectorAll('li > span.nowrap');
        if (!list.length) return null;
        list = [...list];
        let el = list.find(el => el.textContent === 'ISBN:');
        return el.nextElementSibling.textContent.trim() || null;
    }
}

class SwiatKsiazkiController extends Controller {
    mainContainerSelectors() { return '.header.content'; }

    productModel() {
        let meta = document.querySelector('meta[itemprop="gtin13"]')
        if (!meta) return null;

        let content = meta.getAttribute('content');
        if (!content) return null;
        return content;
    }
}

class TantisController extends Controller { 
    mainContainerSelectors() { return '.header-main'; }

    getCfg() {
        return {
            access: true,
            productListContainerSelector: '#productGridRow .product-list-grid',
            productListContainerElement: null,
            productListElementSelector: '.product-box .card-body',
            productListElementsArray: [],
            productBoxSelector: '.product-box .card-body',
            productBoxesArray: [],
            fetchRequired: true,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return listElement.querySelector('a')?.href },
            modelSelector: 'a[data-model]',
            getModel: async function (modelElement) {
                let url = this.fetchUrl(modelElement);
                let dom = await fetchPageDOM(url);
                let model = CONFIG.app.ctrl.productModel(dom);
                return model;
            }
        }
    };

    productModel(dom = null) {
        if (!dom) dom = document;
        let json = dom.head.querySelector('script[type="application/ld+json"]');
        if (!json) return null;

        json = JSON.parse(json.textContent);
        if (!json) return null;
        if (!json.hasOwnProperty('@graph')) return null;
        json = json['@graph'];
        if (!json.hasOwnProperty('5')) return null;
        json = json['5'];
        if (!json.hasOwnProperty('@id')) return null;
        return json['@id'];
    }

    async productList() {
        let { list, container } = this.getSelectorsForProductList();
        let elems = [...document.querySelectorAll(`${list} ${container}`)];
        for (let elem of elems) {
            let url = elem.querySelector('a').href;
            let dom = await fetchPageDOM(url);
        }
    }
}

class CzytamController extends Controller {
    mainContainerSelectors() { return '#header-logo'; }

    productModel() {
        let details = document.querySelector('div.show-for-medium-up div#opis blockquote.size-12');
        if (!details) return null;

        let elements = details.querySelectorAll('span');
        if (!elements.length) return null;
        elements = [...elements];
        let element = elements.find(el => el.textContent.match(/paskowy|isbn/i));
        return element.nextElementSibling.textContent.trim() || null;
    }
}

class MatrasController extends Controller {
    mainContainerSelectors() { return 'header.mainHeader'; }

    productModel() {
        let infoBox = document.querySelector('div.content div.colsInfo');
        if (!infoBox) return null;

        let model = infoBox.innerText.replaceAll('-', '').match(/[^\d](\d{13})[^\d]?/);

        if (model.length === 0) return null;
        return model[1];
    }
}

class BasicController extends Controller {

}

//-------------------------------------------------------------- STORAGE

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

//-------------------------------------------------------------- STORAGE

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
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        let regexed = value.match(/(\d+\.?\d*)px/i);
        if (!regexed) throw new Error('Błędny argument dla funkcji noPx');
        regexed = regexed[1];
        if (regexed.match(/\./)) regexed = parseFloat(regexed);
        else regexed = parseInt(regexed);
        return regexed;
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
    if (!el.classList.contains('tomczuk')) el.classList.add('tomczuk');
    return el;
}

function box(title) {
    const box = html('div', { classes: 'tomczuk-box' })
    const titleDiv = html('div', { classes: 'tomczuk-box-title', });
    titleDiv.append(html('div', { classes: 'tomczuk-box-title-arrow', innerHTML: '&#9660;' }));
    titleDiv.append(html('div', { classes: 'tomczuk-box-title-text', textContent: title }));

    const container = html('div', { classes: 'tomczuk-box-container' });
    const arrow = titleDiv.querySelector('.tomczuk-box-title-arrow');
    box.container = container;
    box.append(titleDiv, container);


    let minimizeOptName = title.toLowerCase() + '-boxMinimized';
    if (storage(minimizeOptName) == true) {
        titleDiv.classList.add('minimized');
        container.classList.add('tomczuk-minimized-box');
        arrow.classList.add('arrow-minimized');
    }

    titleDiv.addEventListener('click', e => {
        e.stopPropagation();
        arrow.classList.toggle('arrow-minimized');
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

function selfCopyInput({ value, classes = '', id = null }) {
    if (!value) throw new Exception("Atrybut 'value' jest wymagany");
    classes = classes ? classes + ' tomczuk-self-input' : 'tomczuk-self-input';
    const input = html('input', { value, classes, id });

    input.addEventListener('click', () => {
        navigator.clipboard.writeText(value).then(() => {
            const delayClassName = 'tomczuk-self-input-copying';
            input.value = 'KOPIUJĘ...';
            input.disabled = true;
            input.classList.add(delayClassName);

            setTimeout(() => {
                input.value = value;
                input.select();
                input.disabled = false;
                input.classList.remove(delayClassName);
            }, 500);

        });
    });

    return input;
}

async function getReport(url) {
    let finalOptions = { method: 'get', credentials: 'include', mode: 'cors' };

    let html = await fetch(url, finalOptions);
    let buffer = await html.arrayBuffer();
    let text = new TextDecoder('iso-8859-2').decode(buffer);
    let dom = new DOMParser().parseFromString(text, 'text/html');
  	let rawReport = dom.querySelector('textarea#SqlReport').value;
    return rawReport;
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

function getSellReportForModel(model, box) {
    // let endDate = new Date();
    // let startDate = new Date();
    // startDate.setDate(startDate.getDate() - parseInt(14));
    // startDate = startDate.toLocaleDateString('fr-CA');
    // endDate = endDate.toLocaleDateString('fr-CA');
    // let sellUrl = 'https://cba.kierus.com.pl/?p=ShowSqlReport&r=ilosc+zamowionych+produktow+i+unikalnych+zamowien&lista_produktow=' + model
    //     + '&data_od=' + startDate
    //     + '&data_do=' + endDate + '&promo=&sklep=-1&source=-1&csv=0';

    // let report = await getReport(sellUrl);

    let report = [1,2,3,4,5,6,7,8,9,10,11,12,13].join("\t");
    let reportArr = report.split("\t");

    box.innerHTML = '';
    box.innerHTML += reportArr[3] + ' szt. / ' + reportArr[4] + " zam.<br>";
    box.innerHTML +="Sprzedaż dzienna: <strong>" + reportArr[3] + '</strong><br>';
    box.innerHTML += 'Śr. cena sprz: <strong>' + String((parseFloat(reportArr[5]) / parseFloat(reportArr[3])).toFixed(2)).replace('.',',') + '</strong> zł<br>';
    box.innerHTML += 'Stan: <strong>' + reportArr[9] + '</strong><br>';
    box.innerHTML += '<span style="color: red;">Zapas na <strong>' + reportArr[3] + '</strong> dni</span><br>';
    box.innerHTML += '<span style="color:green;">Zapotrz. (14 dni): <strong>' + reportArr[3] + '</strong></span><br>';
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

function showGoUpBtn() {
    const btn = document.querySelector('.tomczuk-goup-btn');
    if (!btn) return false;
    let scrollVal = window.scrollY;
    btn.classList.toggle('tomczuk-hidden', !scrollVal);
}

function setInitListeners() {
    let rightPanel = CONFIG.rightPanel;
    document.addEventListener('click', e => {
        if (e.target.closest('.tomczuk-right-panel')) return;
        rightPanel.adjustWidth();
    });

    window.addEventListener('resize', e => { rightPanel.adjustWidth(); });

    document.addEventListener('scroll', showGoUpBtn);
    document.addEventListener('resize', showGoUpBtn);

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            setTimeout(() => {
                rightPanel.classList.add('tomczuk-click-through');
                setTimeout(() => {
                    rightPanel.classList.remove('tomczuk-click-through');
                }, 3000);
            }, 150);
        };
    });
}

function basicInit(department) {
    if (!isDev()) useTomczukToolbarStyles();
    const app = new App(department);
    app.ctrl.redirectFromSearchPage();
    setInitListeners();
    app.getInvisibleBtn();
    return app;
}


//START APP


(async function main() {
    let app = basicInit('handlowy');
    CONFIG.app = app;
    if (!app) return;
    console.log('tomczukToolKit - Running...');
    app.navBox();
    app.productBox();
    app.salesBox();
    let productList = await app.productListBox();
})();