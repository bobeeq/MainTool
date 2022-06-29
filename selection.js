// ==UserScript==
// @name     selection
// @version  1
// @grant    none
// ==/UserScript==
var currClick;
var current;

document.addEventListener('mousedown', e => currClick = e);

document.addEventListener('selectionchange', e => {
    console.debug(e);
    if( ! document.getSelection().toString()) {
        current.remove();
        current = undefined;
        return;
    }
    let txt = document.getSelection();
    showBox(currClick, txt);
})


// window.addEventListener('contextmenu', e => {
//     if(e.button === 2 && e.ctrlKey) e.preventDefault();
// });

// window.addEventListener('mousedown', e => {
//     const selection = window.getSelection();
//     console.debug(selection);
//     if(e.button === 0) {
//         current.remove();
//         current = undefined;
//     }

//     if(e.button !== 2 || ! e.ctrlKey ) return;
//     console.debug(e);
//     if(selection.toString()) {
//         e.preventDefault();
//         e.target.style.userSelect = 'auto';
//         let els = e.target.querySelectorAll('*')
//         if(els.length) [...els].map(e => e.style.userSelect = 'auto');
//         txt = selection.toString();
//         console.debug(txt);
//         txt = txt.replaceAll(/[^0-9a-zęóąśłżźćń\s]/ig, ' ').replaceAll(/\s+/g, ' ').trim();
//         showBox(e, txt);
//     }
// });

// window.addEventListener('mouseup', e => {
//     if(e.button !== 2 || ! e.ctrlKey ) return;
//     const selection = window.getSelection();
    
//     if( ! selection.toString()) {
//         console.debug('nie ma selecta, jadziem');
//         e.preventDefault();
//         let txt = '';
//         selection.modify('extend', 'left', 'word');
//         txt += selection.toString();
//         selection.modify('extend', 'right', 'word');
//         txt += selection.toString();
//         txt = txt.replaceAll(/[^0-9a-zęóąśłżźćń\s]/ig, ' ').replaceAll(/\s+/g, ' ').trim();
//         selection.removeAllRanges();
//         showBox(e, txt);
//     } else {
//         selection.removeAllRanges();
//     }
//     return false;
// });


function showBox(event, txt) {
    if(current) {
        current.remove();
        current = undefined;
    }

    console.debug(event);

    current = document.createElement('div');
    current.style.position = 'absolute';
    current.style.color = 'black';
    current.style.zIndex = '9999999999';
    current.style.top = `${event.pageY + 15}px`;
    current.style.left = `${event.pageX + 5}px`;
    current.style.backgroundColor = `white`;
    current.style.padding = `10px`;
    current.style.border = `1px solid black`;
    document.body.append(current);

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
    current.append(title);
    a('TK', `https://www.taniaksiazka.pl/Szukaj/q-${txt}`);
    a('Google', `https://www.google.com/search?client=firefox-b-d&q=${txt}`);
    a('Bee', `https://www.bee.pl/Szukaj/q-${txt}`);
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
    current.append(el);
}