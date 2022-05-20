// ==UserScript==
// @name     tomczukToolKit
// @version  1
// @grant    none
// ==/UserScript==

// ========================== GLOBAL ==========================

HTMLElement.prototype.qs = function(sel) { return this.querySelector(sel); }
HTMLElement.prototype.qsa = function(sel) { return [...this.querySelectorAll(sel)]; }
var run = true;
var app;

// ========================== GLOBAL ==========================


function useTomczukToolbarStyles() {
    let style = html('style');
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
            max-height: 160px;
            pointer-events: inherit;
            transition: .5s;
        }
        
        .tomczuk-box-container.tomczuk-minimized-box {
            transition: .8s cubic-bezier(0, 1, 0, 1);
            pointer-events: none;
            opacity: 0;
            max-height: 0;
        }
        
        .tomczuk-sales-box > .tomczuk-box-container {
            background-color: #000;
            margin: 3px;
            padding: 4px;
						display: block;
            border-radius: 5px;
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
        
        .tomczuk-sale-control-panel-container {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }
        
        .tomczuk-input-ctrl {
            all: initial!important;
            background-color: white!important;
            transform: scale(1.2)!important;
            padding: 2px!important;
            margin: 5px 20px!important;
            text-align: center!important;
            border-radius: 3px!important;
						-webkit-appearance: auto!important;
     				-moz-appearance: auto!important;
          	appearance: auto!important;
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
						margin: 3px 1px;
        }
        
        .tomczuk-product-info-box.tomczuk-hidden {
            display: none;
        }
        
        .tomczuk-product-info-box > .tomczuk-box-child {
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
    let head = qs('head');
    if(head) head.append(style);
}

class App {
    testMode = true;

    constructor(department) {
        app = this;
        app.department = department;
        app.storage = new Storage();

        switch (true) {
            case isCBA():
                app.ctrl = new CBAController;
                break;
            case isTK():
          	case isCurrentPage('tk.dev.kierushop'):
                app.ctrl = new TKController;
                break;
            case isBEE():
                app.ctrl = new BEEController;
                break;
            case isCurrentPage('fantastyczneswiaty.pl'):
                app.ctrl = new FantastyczneSwiatyController;
                break;
            case isCurrentPage('bonito.pl'):
                app.ctrl = new BonitoController;
                break;
            case isCurrentPage('nowe.bonito.pl'):
                app.ctrl = new NoweBonitoController;
                break;
            case isCurrentPage('gandalf.com.pl'):
                app.ctrl = new GandalfController;
                break;
            case isCurrentPage('swiatksiazki.pl'):
                app.ctrl = new SwiatKsiazkiController;
                break;
            case isCurrentPage('tantis.pl'):
                app.ctrl = new TantisController;
                break;
            case isCurrentPage('czytam.pl'):
                app.ctrl = new CzytamController;
                break;
            case isCurrentPage('wydawnictwokobiece.pl'):
                app.ctrl = new WKController;
                break;
            case isCurrentPage('czarymary.pl'):
                app.ctrl = new CMController;
                break;
            case isCurrentPage('allegro.pl/oferta'):
                app.ctrl = new AllegroController;
                break;
            case isCurrentPage('matras.pl'):
                app.ctrl = new MatrasController;
                break;
            case isCurrentPage('lubimyczytac.pl'):
                app.ctrl = new LubimyCzytacController;
                break;
            default:
                app.ctrl = new BasicController;
        }

        app.getRightPanel();
    }

    allow(departments, feature) {
        return (departments.includes(app.department) && app.ctrl.native.showFeature(feature));
    }

    forbid(departments, feature) {
        return (!departments.includes(app.department) && app.ctrl.native.showFeature(feature));
    }

    getRightPanel() {
        let rightPanel = html('div', { classes: 'tomczuk-right-panel' });
        app.rightPanel = rightPanel;

        rightPanel.adjustWidth = () => {
            if (rightPanel.classList.contains('tomczuk-pinned')) return;
            let panelWidth = 400;
            let minSpace = 30;
            let space = app.ctrl.native.spaceForPanel();
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
            app.storage.set('panelToggler', 'pinned')
        }

        rightPanel.unpin = () => {
            rightPanel.classList.remove('tomczuk-pinned');
            rightPanel.fullWidth();
            app.storage.set('panelToggler', 'unpinned');
        }

        if (app.storage.get('panelToggler') == 'pinned') {
            rightPanel.pin();
        } else rightPanel.adjustWidth();

        let timeOutId;
        rightPanel.addEventListener('mouseleave', () => {
            if (rightPanel.classList.contains('tomczuk-pinned')) return;
            timeOutId = setTimeout(() => {
                rightPanel.adjustWidth();
            }, 800);
        });

        rightPanel.addEventListener('mouseover', () => clearTimeout(timeOutId));

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

        app.getHeader();
        app.makeUtilityContainer();
        document.body.append(rightPanel);
        return rightPanel;
    }

    getInvisibleBtn() {
        let btn = html('a', { classes: 'tomczuk-invisible-btn tomczuk-invisible' });
        if (app.storage.get('rightPanelInvisible') == false) {
            app.rightPanel.classList.remove('tomczuk-invisible');
            btn.innerHTML = '&#128317;';
        } else {
            app.rightPanel.classList.add('tomczuk-invisible');
            app.storage.set('rightPanelInvisible', 'true');
            btn.innerHTML = '&#128316;';
        }

        btn.addEventListener('click', () => {
            app.rightPanel.classList.toggle('tomczuk-invisible');
            if (app.rightPanel.classList.contains('tomczuk-invisible')) {
                btn.innerHTML = '&#128316;';
                app.storage.set('rightPanelInvisible', 'true');
            } else {
                btn.innerHTML = '&#128317;'
                app.storage.set('rightPanelInvisible', 'false');
            }
        });

        app.rightPanel.after(btn);
    }

    makeUtilityContainer() {
        const container = html('div', { classes: 'tomczuk-utility-container' });
        container.primary = html('div', { classes: 'tomczuk-primary' });
        container.secondary = html('div', { classes: 'tomczuk-secondary' });
        container.append(container.primary, container.secondary);
        app.rightPanel.append(container);
        app.rightPanel.container = container;
    }

    getHeader() {
        const header = html('div', { classes: 'tomczuk-right-panel-header' });
        header.append(html('div', { textContent: '.tomczukToolKit', classes: 'tomczuk-right-panel-header-title' }));
        const panelToggler = app.getPanelToggler(app.storage.get('panelToggler'));

        header.prepend(panelToggler);
        app.rightPanel.append(header);
        app.rightPanel.header = header;
    }

    getPanelToggler(pinned) {
        const panelToggler = html('div', { classes: 'tomczuk-panel-toggler', innerHTML: '&#128204;' });
        const activeClass = 'tomczuk-active';

        if (pinned == 'pinned') panelToggler.classList.add(activeClass);

        panelToggler.addEventListener('click', () => {
            if (panelToggler.classList.contains(activeClass)) {
                app.rightPanel.unpin();
                panelToggler.classList.remove(activeClass);
            } else {
                app.rightPanel.pin();
                panelToggler.classList.add(activeClass);
            }
        });
        return panelToggler;
    }

    navBox() {
        const allowed = app.forbid([], 'navBox');

        if (!allowed) return;

        let nav = box('Nawigacja');
        const navBtnsContainer = html('div', { classes: 'tomczuk-nav-btns-container tomczuk-row-btns' });

        let reCacheBtn = app.getReCacheBtn();
        if (reCacheBtn) navBtnsContainer.append(reCacheBtn);

        const mobileBtn = app.getMobileBtn();
        if (mobileBtn) navBtnsContainer.append(mobileBtn);

        const goUpBtn = html('a', {
            innerHTML: '&#11014;&#65039;',
            classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-goup-btn'
        });
        goUpBtn.classList.toggle('tomczuk-hidden', ! window.scrollY);

        goUpBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo(0, 0);
        });

        navBtnsContainer.append(goUpBtn);

        nav.container.append(navBtnsContainer);
        app.rightPanel.container.primary.append(nav);
    }

    getReCacheBtn() {
        const allowed = app.forbid([], 'reCacheBtn');
        if (!allowed) return null;
        const reCacheBtn = html('a', {
            classes: 'tomczuk-btn tomczuk-nav-btn tomczuk-recache-btn',
            innerHTML: '&#128260;'
        });

        reCacheBtn.addEventListener('click', async () => {
            const basicUrl = window.location.href.match(/^https?:\/\/[^\/]*/);
            try { await fetch(basicUrl + '/?ReCache=1'); } catch (e) { }
            window.location.reload();
        });

        return reCacheBtn;
    }

    getMobileBtn() {
        const allowed = app.forbid([], 'mobileBtn');
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
        mobileBtn.addEventListener('click', async () => {
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
        const allowed = app.forbid([], 'productBox');
        if (!allowed) return;

        let model = app.ctrl.data.model;
        if (isDev() && !model) model = '9788382158106';
        if (!model) return;

        const productBox = box('Produkt');
        const input = selfCopyInput({ value: model });
        productBox.container.append(input);

        const btnsContainer = html('div', { classes: 'tomczuk-product-btns-container tomczuk-row-btns' });
        if (!isCBA()) btnsContainer.append(btn({ value: 'cba', url: `https://cba.kierus.com.pl/?p=EditProduct&load=*${model}` }));
        if (!isTK()) btnsContainer.append(btn({ value: 'tk', url: `https://www.taniaksiazka.pl/Szukaj/q-${model}` }));
        if (!isBEE()) btnsContainer.append(btn({ value: 'bee', url: `https://www.bee.pl/Szukaj/q-${model}?pf-size=24&pf-page=1` }))

        const comingBasketsUrlBtn = app.comingBasketsUrlBtn(model);
        productBox.container.append(btnsContainer);
        if (comingBasketsUrlBtn) productBox.container.append(comingBasketsUrlBtn);
        app.rightPanel.container.primary.append(productBox);
    }

    comingBasketsUrlBtn(model) {
        const allowed = app.allow('handlowy', 'comingBasketsUrlBtn');
        if (!allowed) return null;
        return btn({ value: 'Jadące koszyki', url: arrivingBasketsUrl(model) });
    }

    async productListBox() {
        const allowed = app.forbid([], 'productListBox');
        if (!allowed) return;
        
        const productListBox = box('Lista produktów');
        const btnsContainer = html('div', { classes: 'tomczuk-product-btns-container tomczuk-row-btns' });
        const copyListBtn = html('a', { innerHTML: '&#128203;', classes: 'tomczuk-btn tomczuk-copy-product-list' });
        const modifyListBtn = html('a', { innerHTML: '&#128200;', classes: 'tomczuk-btn tomczuk-modify-product-list' });

        if (app.storage.get('productListMode') == true) {
            modifyListBtn.classList.add('tomczuk-product-list-mode');
            app.ctrl.modifyProductList(true);
        } else {
            modifyListBtn.classList.remove('tomczuk-product-list-mode');
            app.ctrl.modifyProductList(false);
        }

        modifyListBtn.addEventListener('click', async () => {
            if (!modifyListBtn.classList.contains('tomczuk-product-list-mode')) {
                modifyListBtn.classList.add('tomczuk-product-list-mode');
                app.storage.set('productListMode', 'true');
                app.ctrl.modifyProductList(true);
            } else {
                modifyListBtn.classList.remove('tomczuk-product-list-mode');
                app.storage.set('productListMode', 'false');
                app.ctrl.modifyProductList(false);
            }
        });

        copyListBtn.addEventListener('click', e => {
            e.preventDefault();
            copyListBtn.classList.add('tomczuk-hidden');
            setTimeout(() => {
                copyListBtn.classList.remove('tomczuk-hidden');
            }, 1200);
            navigator.clipboard.writeText(objToXls(app.ctrl.productList()));
        });

        productListBox.container.append(btnsContainer);
        btnsContainer.append(copyListBtn);
        btnsContainer.append(modifyListBtn);
        app.rightPanel.container.primary.append(productListBox);
    };

    salesBox() {
        const allowed = app.allow([
            'handlowy',
        ], 'salesBox');
        if ( ! allowed || ! app.ctrl.data.model) return;
        
        const salesBox = box('Sprzedaż');
        salesBox.classList.add('tomczuk-sales-box');
        salesBox.container.controlPanel = app.getSalesControlPanel();
        salesBox.container.append(salesBox.container.controlPanel);
        app.rightPanel.container.primary.append(salesBox);
        app.rightPanel.container.primary.salesBox = salesBox;
        getSaleReportForProduct();
    }

    getSalesControlPanel() {
        let container = html('div', {
            classes: 'tomczuk-sale-control-panel-container',
        });
        container.append(html('span', {innerText: 'wstecz'}));
        container.append(html('span', {innerText: 'dni'}));

        let delayInput = html('input', {
            type: 'number',
            min: '-1',
            value: app.storage.get('saleReportDelay') ?? '0',
            classes: 'tomczuk-input-ctrl tomczuk-delay'
        });
        delayInput.addEventListener('click', () => delayInput.select());
        delayInput.addEventListener('change', getSaleReportForProduct);
        container.append(delayInput);

        let durationInput = html('input', {
            type: 'number',
            min: '0',
            value: app.storage.get('saleReportDuration') ?? '14',
            step: '7',
            classes: 'tomczuk-input-ctrl tomczuk-duration'
        });
        durationInput.addEventListener('click', () => durationInput.select());
        durationInput.addEventListener('change', getSaleReportForProduct);
        container.append(durationInput);

        return container;
    }
}

class NativeCtrl {
    constructor(controller) {
        this.ctrl = controller;
    }

    async init() {
        this.ctrl.cfg = this.basicCfg();
        this.ctrl.data = this.basicData();
        this.overrideCfg();
        this.ctrl.cfg.productsListsCfg = this.ctrl.getProductsListsCfg();
        this.addDebugConsole();
        if (this.ctrl.cfg.access === false) return;

        this.ctrl.data.model = await this.ctrl.productModel();
        if (isDev() && ! this.ctrl.data.model) this.ctrl.data.model = '9788382158106';


        this.runListsObserver();

        this.ctrl.data.productListContainer = qs(this.ctrl.cfg.productListContainerSelector);
        
        this.ctrl.data.productListElements = this.ctrl.data.productListContainer
            ?.qsa(this.ctrl.cfg.productListElementSelector);
        
        this.getProductBoxes();
        this.ctrl.data.productList = this.getDataFromProductList();
        await this.ctrl.getReportForProductList(2,0);
        this.ctrl.adjustListElements();
    }

    /**
     * Startowe ustawienia konfiguracyjne dla każdego Controllera
     */
    basicCfg() {
        return {
            testMode: true,
            access: true,
            fetchRequired: false,
            mutationBreakTime: 300,
            lowStockColorsCfg: [
                {
                    lowerThan: 3,
                    css: {
                        background: 'tomato',
                        color: 'black'
                    } 
                }, {
                    lowerThan: 5,
                    css: {
                        background: 'salmon',
                        color: 'black'
                    }
                }, {
                    lowerThan: 10,
                    css: {
                        background: 'pink',
                        color: 'black'
                    }
                }, {
                    lowerThan: null,
                    css: {
                        background: 'green',
                        color: 'black'
                    }
                }
            ],
            lowStockColorsElem: document.body,
            fetchUrl: function (listElement) { return null },
            modelSelector: null,
            getModel: async function (modelElement) { return null; },
        };
    }

    basicData() {
        return {
            model: null,
            productListsMap: new Map(),
            lastMutationTime: 0
        }
    }

    /**
     * Nadpisuje Konfigurację z Native konfiguracją z Controllera.
     * @see basicCfg
     * @see Controller.cfg
     * @see TKController.cfg
     */
    overrideCfg() {
        let cfg = this.ctrl.getCfg();
        for(let setting of Object.keys(cfg)) {
            this.ctrl.cfg[setting] = cfg[setting];
        }
    }

    /** @TODO
     * 
     */
    runListsObserver() {
        log('loadNewBoxes');
        let observer = new MutationObserver(entries => {
            if(entries.some(entry => entry.addedNodes.length > 0)) {
                this.ctrl.data.lastMutationTime = Date.now();
                // log(entries);
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});

        
        let checkLastMutation = setInterval(() => {
            let diff = Date.now() - this.ctrl.data.lastMutationTime;
            // log('Checking mutations... diff: ' + diff);
            if(diff >= this.ctrl.cfg.mutationBreakTime) {
                clearInterval(checkLastMutation);
                observer.disconnect();
                log(`It's time to work. ` +
                ((Date.now() - this.ctrl.data.startupTime)/1000).toFixed(2) + 's');
                log('From start to last mutation: ' + ((this.ctrl.data.lastMutationTime - this.ctrl.data.startupTime) / 1000).toFixed(2) + 's');
                //this.loadNewBoxes();
            }
        }, 300);
    }

    loadNewBoxes() {
        log('Loading New Boxes');
    }
    /** @DELETE
     * 
     */
    getProductBoxes() {
        this.ctrl.data.productBoxes = qsa(this.ctrl.cfg.productBoxSelector) ?? [];
        if(this.ctrl.cfg.mutationObserverRequired == false) return this.ctrl.cfg.productBoxes;

        const callback = async function(mutationsList) {
            for(const mutation of mutationsList) {
                if(mutation.type !== 'childList') return;
                let neededNodes = mutation.target.qsa(app.ctrl.cfg.productBoxSelector)
                if(neededNodes.length === 0) return;
                app.ctrl.data.productBoxes = [...new Set([
                    ...neededNodes,
                    ...app.ctrl.data.productBoxes
                ])];

                await app.ctrl.modifyProductList(app.storage.get('productListMode'));
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true });
    }
    
    addDebugConsole() {
        if( ! app.testMode) return;
        log('odpalam konsolę');
        let consoleBox = html('div', {
            style: `
                position: fixed;
                z-index: 999999;
                background: rgba(40,40,40,.85);
                color: white;
                top: -50vh;
                left: 0;
                overflow-y: scroll;
                height: 45vh;
                width: calc(100vw - 20px);
                padding: 0;
                transition: 320ms ease-in;
            `
        });
        document.addEventListener('keyup', e => {
            if(e.key == '`') {
                if(consoleBox.style.top == '0px') consoleBox.style.top = '-50vh';
                else consoleBox.style.top = '0px';
            }
        });
        document.body.append(consoleBox);
        app.console = consoleBox;
    }

    log(text, color = 'white') {
        if( ! app.testMode) return;
        let span = html('span', { style: `
            display:block;
            padding: 1px;
            font-size: 14px;
            border-bottom: 1px solid #222;
            color: ${color};
        `, textContent: (new Date()).toLocaleTimeString() + '___: ' + text});
        app.console.prepend(span);
    }
    
    spaceForPanel() {
        let selectors = this.ctrl.mainContainerSelectors();
        let selector = (!Array.isArray(selectors)) 
            ? selectors 
            : selectors.find(sel => qs(sel));

        if (!selector) return null;
        let container = qs(selector);
        if (!container) return null;

        return ((noPx(window.getComputedStyle(document.body).width) - container.clientWidth) / 2 - 10);
    }
    /** @DELETE
     * 
     */
    getDataFromProductList() {
        if(this.ctrl.data.productBoxes.length === 0) return null;
        
        let data = new Map();
        for(let box of this.ctrl.data.productBoxes) {
            let singleProductData = this.ctrl.getDataFromSingleProductBox(box);
            if( ! singleProductData) continue;
            let model = singleProductData.get('model');
            if( ! model) continue;
            singleProductData.delete('model');
            if( ! data.labels) data.labels = [...singleProductData.keys()];

            singleProductData.set('element', box.parentElement);
            data.set(model, singleProductData);
        }

        return data;
    }

    paintLowStockElem(stockForDays) {
        let element = this.ctrl.cfg.lowStockColorsElem ?? null;
        if( ! element) return null;
        let cfg = this.ctrl.cfg?.lowStockColorsCfg;
        if( ! cfg) return null;
        for(let days of cfg) {
            if(stockForDays < days.lowerThan) {
                for(let property of Object.keys(days.css)) {
                    element.style[property] = days.css[property];
                }
            }
        }
        log(element);
        return element;
    }

    redirectFromSearchPage() {
        if ( ! this.ctrl.isSearchPage()) return;
        const url = this.ctrl.searchedElementUrl(this.ctrl.searchText());
        if (url) window.location.href = url;
    }

    showFeature(feature) {
        const { accepted, forbidden } = this.ctrl.featuresPermissions();
        if (forbidden.length > 0) return ! forbidden.find(el => el === feature);
        if (accepted.length > 0) return accepted.find(el => el === feature);
        return true;
    }
}

class Controller {
    constructor() {
        this.native = new NativeCtrl(this);
        this.native.init();
    }

    log(text, color = 'white') {this.native.log(text, color);}

    getCfg() {
        return {};
    }
    /** @TODO
     * 
     */
    getProductsListsCfg() {
        return {
            standard: {
                selectors: {
                    container: 'article.book-list.xs-hidden',
                    box: 'ul.toggle-view > li'
                },
                getModel: function (el) {
                    return el.qs('[data-model]')?.dataset.model;
                },
                adjust: function (el) {
                    el.style.background = 'salmon';
                },
                build: function(el) {
                    el.style.border = '2px solid black';
                }
            }
        }
    }

    adjustListElements() {
        return null;
    }
   /** @DELETE
    * 
    */
    async modifyProductList(show = true) {
        if(this.cfg.access === false) return null;
        
        let list = this.data.productBoxes;
        for(let el of list) {
            if(el.modifiedBox === true) {
                el.parentElement.qs('.tomczuk-product-info-box').classList.toggle('tomczuk-hidden', !show);
                continue;
            }
            this.cfg.getModel(el).then(model => {
                el.modifiedBox = true;
                let infoBox = html('div', { classes: 'tomczuk-product-info-box' });
                el.before(infoBox);
                let url = model ? `https://cba.kierus.com.pl/?p=EditProduct&load=*${model}` : '';
                infoBox.append(html('a', { classes: 'tomczuk-box-child', textContent: 'idź do cba', href: url }));
                let btn = html('button', {innerText: `kopiuj: ${model}`, style: 'font-size: .8rem; cursor: pointer;'});
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    navigator.clipboard.writeText(model);
                    btn.disabled = true;
                    setTimeout(() => { btn.disabled = false; }, 500);
                });
                infoBox.append(btn);
                infoBox.classList.toggle('tomczuk-hidden', !show);
            });
        }
        return list;
    }
    /** @DELETE
     * 
     */
    async getReportForProductList(duration, delay) {
        let models = [...this.data.productList?.keys()];
        let url = 'https://cba.kierus.com.pl/?p=ShowSqlReport&r=ilosc+zamowionych+produktow+i+unikalnych+zamowien';
        let reqBody = new FormData();
        let [startDate, endDate] = prepareDates(duration, delay);
        reqBody.append('lista_produktow', models.join("\r\n"));
        reqBody.append('data_od', startDate);
        reqBody.append('data_do', endDate);
        reqBody.append('promo', '');
        reqBody.append('sklep', '-1');
        reqBody.append('source', '-1');
        reqBody.append('csv', '0');

        // let report = await getReport(url, { method: 'post', body: reqBody });
        let report = [{
            tytul: "Żabki grają w łapki. Maluszki ćwiczą rączki, nóżki i paluszki",
            model: "9788382404036",
            ean: "9788382404036",
            ilosc_zamowionych: "251",
            ilosc_unikalnych_zamowien: "227",
            wartosc_produktow: "6548.5100",
            wartosc_zamowien: "39086.6200",
            ilosc_zamowionych_w_promocji: "239",
            wartosc_produktow_w_promocji: "6202.3800",
            na_mag_i_zapas: "92",
            w_koszykach_z_zapasu: "0",
            w_kolejce: "106",
            na_mag_i_zapas_z_kolejka: "198"
          }, {
            tytul: "Najszczęśliwsza książka pod chmurką",
            model: "9788382511468",
            ean: "9788382511468",
            ilosc_zamowionych: "251",
            ilosc_unikalnych_zamowien: "227",
            wartosc_produktow: "6548.5100",
            wartosc_zamowien: "39086.6200",
            ilosc_zamowionych_w_promocji: "239",
            wartosc_produktow_w_promocji: "6202.3800",
            na_mag_i_zapas: "92",
            w_koszykach_z_zapasu: "0",
            w_kolejce: "106",
            na_mag_i_zapas_z_kolejka: "198"
        }];

        if( ! Array.isArray(report) || report.length === 0) return null;
        for(let row of report) {
            this.data.productList.get(row.model)?.set('saleReport', row);
        }
    }

    getDataFromSingleProductBox(box) {
        return null;
    }

    mainContainerSelectors() {
        return null;
    }

    productModel(dom = null) {
        return null;
    }

    isSearchPage() { return null; }
    searchText() { return null; }
    searchedElementUrl() { return null; }

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: [
                'mobileBtn',
                'reCacheBtn',
                'productListBox'
            ]
        }
    }
}

class TKController extends Controller {
    getCfg() {
        return {
            access: true,
            productListContainerSelector: '.container.with-below-header',
            productListElementSelector: '.product-container',
            productBoxSelector: '.product-container',
            fetchRequired: false,
            mutationObserverRequired: true,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a[data-model]',
            getModel: async function (modelElement) {
                return modelElement.qs(this.modelSelector)?.dataset.model;
            }
        }
    }

    adjustListElements() {
        this.data.productListElements.map(e => e.style.height = 'auto');
        this.data.productBoxes.map(e => e.style.height = 'auto');
    }

    mainContainerSelectors() {
        return sessionStorage.tomczukMobileMode === 'true' ? '#header > .container' : 'header#top';
    }

    productModel(dom = null) {
        if (!dom) dom = document.body;
        return dom.qs('meta[itemprop="productID"]')?.getAttribute('content');
    }

    isSearchPage() {
        return isCurrentPage('taniaksiazka.pl/Szukaj/q-');
    }

    searchText() {
        return qs('div.text.search-results.text-with-border > strong')?.textContent;
    }

    searchedElementUrl(searchText) {
        return qs(`a[data-model="${searchText}"]`)?.href;
    }

    productList() {
        let products = {};
        products.keys = ['title', 'price', 'discount', 'category', 'author', 'availability', 'url'];
        for (let prod of this.data.productListElements) {
            let obj = {};
            let a = qs('a[data-model]', prod);
            if (!a) continue;
            const model = a.dataset.model;

            obj.url = a.href;
            obj.title = a.dataset.name;
            obj.category = a.dataset.category;
            obj.price = a.dataset.price;

            const avail = prod.qs('.product-availability-wrapper');
            obj.availability = avail ? avail.textContent.trim() : '';

            const discount = prod.qs('.product-discount');
            obj.discount = discount ? discount.textContent.trim() : '-';

            const authors = prod.qs('.product-authors');

            obj.author = '';
            if (authors) {
                let authorList = authors.qsa('a');
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

    getDataFromSingleProductBox(box) {
        let data = new Map();
        let model = box.qs('[data-model]')?.dataset.model;
        if( ! model) return null;

        data.set('model', model);

        let price = box.qs('[data-price]')?.dataset.price;
        if(price) price = price.replace('.', ',');
        data.set('cena_nasza', price);

        let retail = box.qs('.product-main-bottom span del:last-child')?.innerText;
        if(retail) retail = retail.replace('.',',').replace(/[^\d,]+/, '');
        else retail = price;
        data.set('cena_okladkowa', retail);

        let title = box.qs('[data-name]')?.dataset.name;
        data.set('tytul', title);

        let authors = box.qsa('.product-authors a');
        let author = authors.length === 0 ? null : authors.map(el => el.innerText.trim()).join(', ');

        data.set('autor', author);

        return data;
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
            productListElementSelector: '#RowResultsWhite',
            productBoxSelector: 'a[data-model].cmp_m_prod_tytul',
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
        let meta = qs('meta[itemprop="productID"]');
        return meta ? meta.getAttribute('content') : null;
    }

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: []
        };
    }
}

class CBAController extends Controller {
    productModel() {
        return qs('input[name="products_model"]')?.value.trim();
    }

    mainContainerSelectors() {
        return 'document > center > table';
    }

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: [
                'mobileBtn',
                'reCacheBtn',
                'productListBox'
            ]
        }
    }
}

class AllegroController extends Controller {
    mainContainerSelectors() {
        return 'div[data-role="header-primary-bar"]';
    }

    productModel() {
        let boxes = qsa(
            '[data-box-name="Parameters"] div[data-role="app-container"] ul li div div ul li'
        );

        for(let box of boxes) {
            let matches = box.innerText.match(/kod\s*producenta\:?\s*(\d+)/i);
            if(matches) return matches[1];
        }
        let description = qs('[data-box-name="Container Description"]');
        if( ! description) return null;

        let ean = description.innerText.match(/(?=ean)?(?=[\s\:\-]*)(\d{13,18})/i);
        if(ean && ean.length > 1) return ean[1];

        return null;
    }

    featuresPermissions() {
        let permissions = super.featuresPermissions();
        permissions.forbidden.push('productListBox');
        return permissions;
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
            productListElementSelector: '.product-container',
            productBoxSelector: '.product-container',
            fetchRequired: false,
            mutationObserverRequired: true,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a[data-model]',
            getModel: async function (modelElement) {
                return modelElement.qs(this.modelSelector)?.dataset.model;
            }
        }
    };

    productModel() {
        return qs('meta[itemprop="productID"]')?.getAttribute('content');
    }

    isSearchPage() {
        return isCurrentPage('bee.pl/Szukaj/q-');
    }

    searchText() {
        return window.location.href.match(/Szukaj\/q\-([^\?]*)/i)[1] ?? null;
    }

    searchedElementUrl(searchText) {
        return qs(`a[data-model="${searchText}"]`)?.href;
    }

    getSelectorsForProductList() {
        return { list: '.product_list', container: '.li.ajax_block_product' };
    }

    productList() {
        let ul = qsa('div.row div.product_list')
                .filter(div => !div.classList.contains('products'))[0] ?? null;
        if(! ul) return null;

        let els = qsa('product-container', ul);
        if (!els) return null;
        els = els.filter(div => !div.classList.contains('productlike-adzone'));

        let products = {};
        products.keys = ['name', 'price', 'discount', 'category', 'brand', 'size', 'availability', 'url'];
        for (let prod of els) {
            let obj = {};
            let a = qs('a.product-name[data-model]', prod);
            if (!a) continue;
            const model = a.dataset.model;

            obj.url = a.href ?? '-';
            obj.category = a.dataset.category ?? '-';
            obj.price = a.dataset.price ?? '-';

            obj.brand = a.qs('.products-title-prefix')?.textContent;
            obj.name = a.qs('.products-title-name')?.textContent;
            obj.size = a.qs('.products-title-suffix')?.textContent;

            obj.availability = prod.qs('.product-available')?.textContent;

            const discount = qs('.product-discount', prod);
            obj.discount = discount?.textContent.trim();

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
        return document.body.innerText.match(/Model:\s+([\d\w@_]{3,30})/)[1] ?? null;
    }

    getCfg() {
        return {
            access: true,
            productListContainerSelector: '.category-products .products-grid',
            productListElementSelector: 'li.item',
            productBoxSelector: '.item-area',
            fetchRequired: false,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return null },
            modelSelector: 'a.product-image img',
            getModel: async function(el) {
                let modelEl = qs(this.modelSelector, el);
                return modelEl?.dataset?.src?.match(/\/([^\/]{3,30})\.jpg/i)[1] ?? null;
            }
        }
    };

    featuresPermissions() {
        return {
            accepted: [],
            forbidden: []
        };
    }
}

class BonitoController extends Controller {
    mainContainerSelectors() { return 'body > div.container'; }

    productModel() {
        return qs('meta[itemprop="gtin"]')?.getAttribute('content');
    }
}

class NoweBonitoController extends Controller {
    mainContainerSelectors() { return 'body > div.container'; }

    productModel() {
        return qs('meta[property="og:upc"]')?.getAttribute('content');
    }
}

class LubimyCzytacController extends Controller {
    mainContainerSelectors() { return 'body > div.content > header > .container'; }

    productModel() {
        return qs('meta[property="books:isbn"]')?.getAttribute('content');
    }
}

class WKController extends Controller {
    mainContainerSelectors() { return '.blog-header > div.container'; }

    productModel() {
        return qsa('table.shop_attributes > tbody > tr > td')
            ?.map(el => el.innerText.replaceAll('-', '').trim()).find(el => el.match(/^\d{13,}$/));
    }
}

class GandalfController extends Controller {
    mainContainerSelectors() { return '.top-menu > .container:not(.infoheader)'; }

    productModel() {
        return qs('div#product-details.details-list')
            ?.qsa('li > span.nowrap')
            ?.find(el => el.textContent === 'ISBN:')
            ?.nextElementSibling
            ?.textContent.trim();
    }
}

class SwiatKsiazkiController extends Controller {
    mainContainerSelectors() { return '.header.content'; }

    productModel() {
        return qs('meta[itemprop="gtin13"]')?.getAttribute('content');
    }
}

class TantisController extends Controller { 
    mainContainerSelectors() { return '.header-main'; }

    getCfg() {
        return {
            access: true,
            productListContainerSelector: '#productGridRow .product-list-grid',
            productListElementSelector: '.product-box .card-body',
            productBoxSelector: '.product-box .card-body',
            fetchRequired: true,
            mutationObserverRequired: false,
            fetchUrl: function (listElement) { return listElement.qs('a')?.href },
            modelSelector: 'a[data-model]',
            getModel: async function (modelElement) {
                let url = this.fetchUrl(modelElement);
                let dom = await fetchPageDOM(url);
                let model = app.ctrl.productModel(dom);
                return model;
            }
        }
    };

    productModel(dom = null) {
        if(!dom) dom = document;
        let json = dom.head.qs('script[type="application/ld+json"]')?.textContent;
        json = json ? JSON.parse(json) : null;
        if(
            ! json
            || ! json.hasOwnProperty('@graph')
            || ! Array.isArray(json['@graph'])
        ) return null;
        json = json['@graph'].pop();
        return json['@id'] ?? null;
    }
}

class CzytamController extends Controller {
    mainContainerSelectors() { return 'body > header > div.container:first-child'; }

    productModel() {
        return qs('#schemaimage')?.getAttribute('content')?.match(/\d{13,18}/)[0] ?? null;
    }
}

class MatrasController extends Controller {
    mainContainerSelectors() { return 'header.mainHeader'; }

    productModel() {
        return qs('div.content div.colsInfo')?.innerText
            .replaceAll('-', '').match(/[^\d](\d{13})[^\d]?/)[1] ?? null;
    }
}

class BasicController extends Controller {
}

class Storage {
    constructor() {
        if(window.localStorage) {
            this.type = 'localStorage';
        } else if(window.sessionStorage) {
            this.type = 'sessionStorage';
        } else {
            this.type = null;
            this.storage = null;
        }

        if(this.type && !window[this.type].getItem('tomczukToolKit')) {
            window[this.type].setItem('tomczukToolKit', '');
        }
    }

    str() {
        if( ! this.type) return undefined;
        return window[this.type].getItem('tomczukToolKit') ?? '';
    }

    set(key, value) {
        if( ! this.type) return false;
        let keyVal = `${key}=${value}`;
        if(this.str().length === 0) {
            window[this.type].setItem('tomczukToolKit', keyVal);
            return;
        }
        let match = this.str().match(new RegExp(`(.*)(${key}=[^=&]+)(.*)`, 'i'));
        if( ! match) {
            window[this.type].setItem(
                'tomczukToolKit',
                window[this.type].getItem('tomczukToolKit') + `&${keyVal}`
            );
        } else {
            match.shift();
            match[1] = keyVal;
            window[this.type].setItem('tomczukToolKit', match.join(''));
        }
    }
    
    get(key) {
        if( ! this.type) return false;
        let match = this.str()?.match(new RegExp(`(?:${key}\=)([^=&]+)`, 'i'));
        if(match) match = match[1];
        if(match === null) return null;
        if(match === 'true') return true;
        if(match === 'false') return false;
        if(/^\d+$/.test(match)) return parseInt(match);
        if(/^\d+\.\d+$/.test(match)) return parseFloat(match);
        return match;
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
    return Boolean(window.location.href.match(new RegExp(page, 'ig')));
}

function log(message, type = 0) {
    if(type === 1) console.error(message);
    if(type === 0) console.debug(message);
}

function isTK() { return isCurrentPage('taniaksiazka.pl'); }

function isCBA() { return isCurrentPage('cba.kierus.com.pl'); }

function isBEE() { return isCurrentPage('bee.pl'); }

function isDev() {
    return qs('meta[env="dev"]')?.getAttribute('env') == 'dev';
}

function arrivingBasketsUrl(model) {
    return `https://cba.kierus.com.pl/?p=SupplierBasket&a=Filter&sp=0&stm=&stl=&edtm=&edtl=&dtm=&dtl=&SbkStatus=unreceived&SbkOrderBy=Id&SbkViewBy=DESC&opiekun=&product_filter=${model}&doc_filter=&Magazine=-1&DocumentFilter=0`;
}

function px(value) { return value + 'px' }

function noPx(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        let regexed = value.match(/(\d+\.?\d*)px/i)[1] ?? null;
        if (!regexed) throw new Error('Błędny argument dla funkcji noPx');
        return regexed.match(/\./) ? parseFloat(regexed) : parseInt(regexed);
    }
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

function html(tag, attributes = {}) {
    const el = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key !== 'classes') el[key] = value;
        else {
            let classes = value.split(' ');
            if (!classes.length) continue;

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
    const arrow = titleDiv.qs('.tomczuk-box-title-arrow');
    box.container = container;
    box.append(titleDiv, container);


    let minimizeOptName = title.toLowerCase() + 'BoxMinimized';
    if (app.storage.get(minimizeOptName) == true) {
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

        if (titleDiv.classList.contains('minimized')) app.storage.set(minimizeOptName, 'true');
        else app.storage.set(minimizeOptName, 'false');
    });
    return box;
}

function btn({ value, url }) {
    let attributes = {};
    if (value) attributes.textContent = value;
    attributes.classes = 'tomczuk-btn';
    if (url) attributes.href = url;
    return html('a', attributes);
}

function selfCopyInput({ value, classes = '', id = null }) {
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

async function getRawReport(url, additionalOptions = null) {
    let dom = await fetchPageDOM(url, additionalOptions);
  	return {
        labels: dom?.qs('textarea#LabelsNames')?.value,
        report: dom?.qs('textarea#SqlReport')?.value
    };
}

async function getReport(url, additionalOptions = null) {
    let {labels, report} = await getRawReport(url, additionalOptions);
    if( ! labels || ! report) return null;
    labels = labels.split("\t").map(label => label.toLowerCase().trim());
    let result = [];
    report.split("\n").forEach(row => {
        let obj = {};
        row.split("\t").forEach((value, i) => {
            if(/^\d{1,7}$/.test(value)) value = parseInt(value);
            else if(/^\d+\.\d+$/.test(value)) value = parseFloat(value).toFixed(2);
            obj[labels[i]] = value;
        });
        result.push(obj);
    });
    return result[0] ?? null;
}

async function getSalesBundleReport(models, duration = 14, delay = 0) {
    let reqBody = new FormData();
    reqBody.append('lista_modeli', models.join("\r\n"));
    reqBody.append('sklep', '2');
    reqBody.append('csv', '0');
    let [startDate, endDate] = prepareDates(duration, delay);
    let url = `https://cba.kierus.com.pl/?p=ShowSqlReport&r=ilosc+zamowionych+produktow+i+unikalnych+zamowien`;

    return await getReport(url, { method: 'post', body: reqBody });
}

async function getSaleReportForProduct(model = null, duration = null, delay = null) {
    if(model === null) model = app.ctrl.data.model;
    if(!model) return null;
    if(delay === null) delay = app.rightPanel?.qs('.tomczuk-delay')?.value;
    if(duration === null) duration =  app.rightPanel?.qs('.tomczuk-duration')?.value;
    if( ! delay || ! duration) return null;
    
    delay = parseInt(delay);
    duration = parseInt(duration);
    if(duration < 1) duration = 1;

    app.rightPanel.qs('.tomczuk-duration').value = duration;

    app.storage.set('saleReportDelay', delay);
    app.storage.set('saleReportDuration', duration);
    let [startDate, endDate] = prepareDates(duration, delay);
    let box = app.rightPanel.container.primary.salesBox.container.qs('.tomczuk-sale-report-container');
    if(!box) {
        box = html('div', {classes: 'tomczuk-sale-report-container'});
    }
    app.rightPanel.container.primary.salesBox.container.append(box);
    
    let sellUrl = `https://cba.kierus.com.pl/?p=ShowSqlReport&r=ilosc+zamowionych+produktow+i+unikalnych+zamowien&lista_produktow=${model}&data_od=${startDate}&data_do=${endDate}&promo=&sklep=-1&source=-1&csv=0`;
    let report = null;
	// let report = await getReport(sellUrl);
    if( ! report) {
        box.innerText = 'Nie mogę pobrać raportu.';
        return null;
    };
	box.innerHTML = '';
    
    box.innerHTML += report.ilosc_zamowionych + ' szt. / ' + report.ilosc_unikalnych_zamowien + " zam.<br>";
    
    box.innerHTML += "Sprzedaż dzienna: <strong>" + String(parseFloat(parseInt(report.ilosc_zamowionych) / duration).toFixed(1)).replace('.',',') + '</strong><br>';

    box.innerHTML += 'Śr. cena sprz: <strong>' + String((parseFloat(report.wartosc_produktow) / parseFloat(report.ilosc_zamowionych)).toFixed(2)).replace('.',',') + '</strong> zł<br>';

    box.innerHTML += 'Stan: <strong>' + report.na_mag_i_zapas_z_kolejka + '</strong><br>';
    //@todo: sprawdzić czy na_mag_i_zapas czy na_mag_i_zapas_z_kolejka
    log('na_mag_i_zapas?', 1);

    box.innerHTML += '<span style="color: red;">Zapas na <strong>' + parseFloat(report.na_mag_i_zapas_z_kolejka / parseFloat(parseInt(report.ilosc_zamowionych) / duration).toFixed(1)).toFixed(0) + '</strong> dni</span><br>';
    box.innerHTML += '<span style="color:green;">Zapotrz. (' + duration + ' dni): <strong>' + parseInt((parseFloat(parseInt(report.ilosc_zamowionych)/duration).toFixed(1)  * parseFloat(duration)) - parseFloat(report.na_mag_i_zapas_z_kolejka)) + '</strong></span><br>';
    if(duration != '14') box.innerHTML += '<span style="color:greenyellow;">Zapotrz. (14 dni): <strong>' + parseInt((parseFloat(parseInt(report.ilosc_zamowionych)/duration).toFixed(1)  * 14) - parseFloat(report.na_mag_i_zapas_z_kolejka)) + '</strong></span><br>';
}

function prepareDates(duration, delay) {
    let [startDate, endDate] = [new Date(), new Date()];
    startDate.setDate(startDate.getDate() - delay - duration);
    endDate.setDate(endDate.getDate() - delay);
    startDate = startDate.toLocaleDateString('fr-CA');
    endDate = endDate.toLocaleDateString('fr-CA');
    return [startDate, endDate];
}

function objToXls(obj) {
    let models = Object.keys(obj).filter(key => key !== 'keys');

    let string = "model\t" + obj.keys.join("\t");
    for (let model of models) {
        string += `\n${model}`;
        for (let key of obj.keys) {
            let value = obj[model][key];
            if (/^\d+\.\d+/.test(value)) value = value.replace('.', ',');
            string += `\t${value}`;
        }
    }
    return string;
}

async function fetchPageDOM(url, additionalOptions = null) {
    let finalOptions = { method: 'get', credentials: 'include', mode: 'cors' };

    if (additionalOptions) {
        for (property in additionalOptions) {
            finalOptions[property] = additionalOptions[property];
        }
    }
    log(['go report', url, finalOptions]);
    let html = await fetch(url, finalOptions);
    let buffer = await html.arrayBuffer();
    let text = new TextDecoder('iso-8859-2').decode(buffer);
    let dom = new DOMParser().parseFromString(text, 'text/html');
    return dom;
}

function qs(sel) { return document.querySelector(sel) };

function qsa(sel) { return [...document.querySelectorAll(sel)]; }

function showGoUpBtn() {
    qs('.tomczuk-goup-btn')?.classList.toggle('tomczuk-hidden', ! window.scrollY);
}

function setInitListeners() {
    let rightPanel = app.rightPanel;
    document.addEventListener('click', e => {
        if (e.target.closest('.tomczuk-right-panel')) return;
        rightPanel.adjustWidth();
    });

    window.addEventListener('resize', () => { rightPanel.adjustWidth(); });

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

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function basicInit(department) {
    if (!isDev()) useTomczukToolbarStyles();
    new App(department);
    app.ctrl.data.startupTime = Date.now();
    log('Start App: ' + app.ctrl.data.startupTime);
    app.ctrl.native.redirectFromSearchPage();
    setInitListeners();
    app.getInvisibleBtn();
}


//START APP


(async function(department = 'handlowy') {
    if(typeof run === 'undefined') return;
    await basicInit(department);
    log('tomczukToolKit - Running...');
    app.navBox();
    app.productBox();
    app.salesBox();
    await app.productListBox();
    log(app);
})();