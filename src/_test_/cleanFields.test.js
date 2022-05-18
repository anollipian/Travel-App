/**
 * @jest-environment jsdom
 */

import "regenerator-runtime/runtime";

const clearfield = require('../client/js/cleanFields')

describe("Testing the clearfield functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing theclearfield() function", () => {
       
           expect(clearfield).toBeDefined();
})});