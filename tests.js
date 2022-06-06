class Test {
    constructor() {
        this.getTestCases();
    }

    testToPrice() {
        let test = new Case();
        test.input([222, '1.38u', '0,2802', '2.13', 42.227, '33,11 zł']);
        test.output(['222,00zł', '1,38zł', '0,28zł', '2,13zł', '42,22zł', '33,11zł']);
        for(let [input, output] of test.loop()) {
            let after = toPrice(input);
            if(after !== output) {
                this.error('testToPrice', input, output, after);
            }
        }
    }

    testCountDiscount() {
        let prod = new Product();
        let test = new Case;
        test.input([
            [30, 40],
            [22.99, 45],
            [30.11, 42.88],
            [35, 32],
            [33.11]
        ]);
        test.output([
            '25%',
            '49%',
            '30%',
            '-',
            '-'
        ]);

        for(let [[price, retail], discount] of test.loop()) {
            let prod = new Product;
            prod.setPrice(price);
            prod.setRetail(retail);
            prod.countDiscount();
            if(prod.discount !== discount)
                this.error('testCountDiscount', `${price} i ${retail}`, discount, prod.discount);
        }
    }

    testPriceToFloat() {
        let test = new Case();
        test.input([222, '1.38u', '0,2802', '2.13', 42.227, '33,11 zł', '23d5']);
        test.output([222, 1.38, 0.28, 2.13, 42.22, 33.11, 23]);
        for(let [input, output] of test.loop()) {
            let after = priceToFloat(input);
            if(after !== output) {
                this.error('priceToFloat', input, output, after);
            }
        }
    }




    error(funcName, variable, shouldBe, is) {
        throw new Error(`Error in: ${funcName}, with variable: ${variable}. Should be: ${shouldBe}, is ${is}`);
    }

    getTestCases() {
        this.testCases = Object
                        .getOwnPropertyNames(Object.getPrototypeOf(this))
                        .filter(property => /^test/.test(property));
    }

    run() {
        this.testCases.forEach(test => {
            this[test]();
        });
        console.debug(`%c${this.testCases.length} TESTS PASSED.`, 'color:green;font-size:2rem;');
    }
}

class Case {
    input(array) {
        this.inputs = array; 
    }

    output(array) {
        this.outputs = array;
    }

    getPair() {
        return [this.inputs.pop(), this.outputs.pop()];
    }

    loop() {
        let result = [];
        for(let i in this.inputs) {
            result.push([this.inputs[i], this.outputs[i]]);
        }

        return result;
    }
}

let TestObj = new Test();
TestObj.run();


let a = new Product('9788366555037');
// a.title = 'statek titanic';
log(a);