const calculator = require("../lab2_mocha_test/app/calculator.js")
const assert = require('assert');
const { isTypedArray } = require("util/types");

//Pass test for add
describe("add", function(){
    it('should return 7 when passed 5 and 2', () => {
        assert.strictEqual(calculator.add(5,2), 7);
    });
});
//Failed test for add
describe('add', function(){
    it('should return 8 when passed 5 and 2', () => {
        assert.strictEqual(calculator.add(5, 2), 8);
    });
});

//Passed test for sub
describe("sub", function(){
    it('should return 3 when passed 5 and 2', () => {
        assert.strictEqual(calculator.sub(5,2), 3);
    });
});

//Failed test for sub
describe('sub', function(){
    it('should return 5 when passed 5 and 2', () => {
        assert.strictEqual(calculator.sub(5, 2), 5);
    });
});

//Passed test for mul
describe("mul", function(){
    it('should return 10 when passed 5 and 2', () => {
        assert.strictEqual(calculator.mul(5,2), 10);
    });
});

//Failed test for mul
describe('mul', function(){
    it('should return 12 when passed 5 and 2', () => {
        assert.strictEqual(calculator.mul(5, 2), 12);
    });
});

//Passed test for div
describe("div", function(){
    it('should return 5 when passed 10 and 2', () => {
        assert.strictEqual(calculator.div(10,2), 5);
    });
});

//Failed test for div
describe('div', function(){
    it('should return 2 when passed 10 and 2', () => {
        assert.strictEqual(calculator.div(10, 2), 2);
    });
});
