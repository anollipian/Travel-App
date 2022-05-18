/**
 * @jest-environment jsdom
 */

import "regenerator-runtime/runtime";

const validateDates = require('../client/js/setDate')

describe("Testing the setting Date functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the validateDates() function", () => {
       
           expect(validateDates).toBeDefined();
})});