
/**
 * @jest-environment jsdom
 */
 import "regenerator-runtime/runtime";
 
 test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  const getTripData = require('../client/js/geoNamesData')

describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getTripData() function", () => {
       
           expect(getTripData).toBeDefined();
})});