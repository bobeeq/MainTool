class Test {
    constructor() {
        this.getTestCases();
    }

    testToPrice() {
        log('testToPrice()');
        let testPrices = [222, '1.38u', '0,2802', '2.13', 42.227, '33,11 zł'];
        let shouldBe = ['222,00zł', '1,38zł', '0,28zł', '2,13zł', '42,22zł', '33,11zł'];
        let after = testPrices.map(toPrice);

        for(let i in testPrices) {
            if(after[i] !== shouldBe[i]) 
                this.error('testToPrice', testPrices[i], shouldBe[i], after[i]);
        }
    }

    testCountDiscount() {
        let prod = new Product();
        let price = '30,00zł';
        let retail = '40,00zł';
        prod.addPrice(price);
        prod.addRetail(retail);
        prod.countDiscount();
        if(prod.discount !== '25%')
            this.error('testCountDiscount', `${price} i ${retail}`, '25%', prod.discount);
    }

    testPriceToFloat() {
        let price = '38,99zł';
        let newPrice = priceToFloat(price);
        if(newPrice !== 38.99)
            this.error('testPriceToFloat', price, 38.99, newPrice );
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
    }
}

let TestObj = new Test();
TestObj.run();