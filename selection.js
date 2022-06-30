// ==UserScript==
// @name     selection
// @version  1
// @grant    none
// ==/UserScript==
var rawSelectedTxt = '';
var currentEl;

document.addEventListener('selectionchange', e => {
    let rawTxt = window.getSelection().toString();
    if( ! rawTxt) return;
    rawSelectedTxt = rawTxt;
});

document.addEventListener('mouseup', e => {
    if( ! window.getSelection().toString()) {
        if(e.altKey && e.button === 0) {
            txt = e.target.textContent.replaceAll(/[^0-9a-zęóąśłżźćń\s]/ig, ' ').replaceAll(/\s+/g, ' ').trim();
            showBox(e, txt);
        } else {
            if( 
                ! e.target.classList.contains('tomczuk-info-box') &&
                ! e.target.closest('.tomczuk-info-box')
            )
        	currentEl.remove();
            currentEl = undefined;
        }
    } else if(e.altKey) {
        let txt = rawSelectedTxt.replaceAll(/[^0-9a-zęóąśłżźćń\s]/ig, ' ').replaceAll(/\s+/g, ' ').trim();
        console.debug(txt);
        showBox(e, txt);
    } else {
        currentEl.remove();
        currentEl = undefined;
    }
});

async function showBox(event, txt) {
    if(currentEl) {
        currentEl.remove();
        currentEl = undefined;
    }

    currentEl = document.createElement('div');
    let cont = document.createElement('div');
    let left = document.createElement('div');
    left.classList.add('tomczuk-left');
    let right = document.createElement('div');
    cont.append(left, right);
    currentEl.append(cont);
    right.classList.add('tomczuk-right');
    right.style.padding = '12px';
    right.style.alignSelf = 'center';
    currentEl.classList.add('tomczuk-info-box');
    currentEl.style.position = 'absolute';
    currentEl.style.color = 'black';
    currentEl.style.zIndex = '9999999999';
    currentEl.style.top = `${event.pageY + 15}px`;
    currentEl.style.left = `${event.pageX + 5}px`;
    currentEl.style.backgroundColor = `white`;
    currentEl.style.padding = `10px`;
    currentEl.style.border = `1px solid black`;
    cont.style.display = 'flex';
    cont.style.alignItems = 'stretch';
    cont.style.justifyContent = 'center';
    cont.append(left, right);
    document.body.append(currentEl);

    let title = document.createElement('div');
    title.append(document.createElement('span'));
    title.append(document.createElement('span'));
    title.firstElementChild.textContent = 'wyszukaj: ';
    title.style.borderBottom = '1px dotted black';
    const search = title.querySelector('span:nth-child(2)')
    search.textContent = txt;
    if(search.textContent.length > 30) search.textContent = search.textContent.substring(0, 30) + '...';
    search.style.fontWeight = '800';
    search.style.color = 'blue';
    currentEl.prepend(title);
    let tkUrl = null;
    if(txt.match(/\d{11}(?:\d{2}(?:33)?|KS)/)) {
        let dom = await fetchPageDOM(`https://www.taniaksiazka.pl/Szukaj/q-${txt}`);
        let foundProducts = [...dom.querySelectorAll('.product-container')];
        if(foundProducts.length > 0) {
            let foundProduct;
            if(foundProducts.length === 1) {
                foundProduct = foundProducts[0];
            } else {
                for(let prod of foundProducts) {
                    if( ! prod.querySelector(`[data-model="${txt}"]`)) {
                        continue;
                    }
                    foundProduct = prod;
                    break;
                }
            }
            if( ! foundProduct) return;
            let productTitle = foundProduct.querySelector('[data-name]')?.dataset?.name;
            let imgSrc = foundProduct.querySelector('img[data-src]');
            tkUrl = foundProduct.querySelector('a[data-model]')?.getAttribute('href');
            tkUrl = `https://taniaksiazka.pl${tkUrl}`;
            if(imgSrc) {
                let imgEl = document.createElement('img');
                imgEl.src = imgSrc.dataset.src;
                right.append(imgEl);
            }
            let tit = document.createElement('div');
            tit.textContent = productTitle;
            currentEl.prepend(tit);
        }
    }
    a('TK', tkUrl ? tkUrl : `https://www.taniaksiazka.pl/Szukaj/q-${txt}`);
    a('Bee', `https://www.bee.pl/Szukaj/q-${txt}`);
  	a('LubimyCzytac', `https://lubimyczytac.pl/szukaj/ksiazki?phrase=${txt}`);
    a('Google', `https://www.google.com/search?client=firefox-b-d&q=${txt}`);
  	a('Wiki', `https://pl.wikipedia.org/w/index.php?search=${txt}`);
  	a('YouTube', `https://www.youtube.com/results?search_query=${txt}`);
}

function a(txt, url) {
    let el = document.createElement('a');
    el.href = url;
    el.textContent = txt;
    el.style.display = 'block';
    el.style.padding = '5px';
    el.addEventListener('mouseover', e => {
        el.style.backgroundColor = '#dedede';
        el.style.cursor = 'pointer';
    });
    el.addEventListener('mouseout', e => {
        el.style.backgroundColor = 'white';
    });
    currentEl.querySelector('.tomczuk-left')?.append(el);
}

//////////////////////////

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