console.debug('%cTEST', 'color: red');

function qs(sel) { return document.querySelector(sel) };

function qsa(sel) { return [...document.querySelectorAll(sel)]; }

HTMLElement.prototype.qs = function(sel) { return this.querySelector(sel); }

HTMLElement.prototype.qs = function(sel) { return [...this.querySelectorAll(sel)]; }
