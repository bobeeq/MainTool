console.debug('%cTEST', 'color: red');



let move = { type: null, nums: [1,2,3]};

let mutate = () => {
    move.type = qs('select')?.selectedOptions[0]?.textContent;
    let index = rand(0,move.nums.length-1);
    let boxNum = move.nums[index];
    let currentElem = qs(`#box${boxNum}`);
    window[move.type](currentElem, index);
    for(let num of move.nums) {
        if(boxNum == num) {
            currentElem?.classList.add('changed');
        } else {
            qs(`#box${num}`)?.classList.remove('changed');
        }
    }
}

var deleteBox = (e, index) => {e.remove();  move.nums.splice(index,1)};
var changeText = e => e.textContent = rand(1,5413242);
var addChild = e => {
    let child = document.createElement('div');
    child.style.width = '20px';
    child.style.height = '20px';
    child.style.background = 'orange';
    child.style.margin = '10px';
    e.append(child);
}

var removeChild = e => e.lastChild?.remove();
qs('#addEl').addEventListener('click', mutate);


// let observer = new MutationObserver(entries => {
//     log(entries);
//     log(entries[0].addedNodes);
//     log(entries[0].removedNodes);
// });

// observer.observe(qs('#container'), { childList: true, subtree: true });
// document.body.append(html('input',{id: 'condition', value: 'true'}));
// document.body.append(html('input',{id: 'number', value: '99999999'}));