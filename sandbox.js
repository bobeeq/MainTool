let debounce = function(callback, delay = 3000) {
    console.debug('funkcja debounce wywołana teraz!');
    let time = 'init';
    return function(...args) {
        console.debug(time);
        clearTimeout(time);
        time = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}
let cb = (...args) => console.debug('DEBOUNCE ODPALONY' + args.join());

let dupa = debounce(cb);

let dupsko = html('button', {textContent: 'gogogo'});
document.body.append(dupsko);
dupsko.addEventListener('click', e => {
    dupa(' raz dwa trzy');
});
