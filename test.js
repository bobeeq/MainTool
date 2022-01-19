fetch('https://www.taniaksiazka.pl/Szukaj/q-9788367069595').then(res => res.text()).then(text => {
    let dom = new DOMParser().parseFromString(text, 'text/html');
    console.log(dom);
});