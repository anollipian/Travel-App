/** * @jest-environment jsdom */
const getTripData = require('../client/js/geoNamesData')

describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getTripData() function", () => {
       
           expect(getTripData).toBeDefined();
})});