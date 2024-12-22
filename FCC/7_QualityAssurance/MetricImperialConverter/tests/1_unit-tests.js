const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("Convert Handler", function () {
        // #1
        test("should correctly read a whole number input", function () {
            assert.strictEqual(convertHandler.getNum("5kg"), 5);
        });
        // #2
        test("should correctly read a decimal number input", function () {
            assert.strictEqual(convertHandler.getNum("5.5kg"), 5.5);
        });
        // #3 
        test("should correctly read a fractional input", function () {
            assert.strictEqual(convertHandler.getNum("3/4kg"), 0.75);
        })
        // #4 
        test("should correctly read a fractional input with a decimal", function () {
            assert.strictEqual(convertHandler.getNum("3.6/2kg"), 1.8);
        })
        // #5 
        test("should correctly return an error on a double-fraction", function () {
            assert.strictEqual( convertHandler.getNum("2/3/4kg"), "invalid number");
        })
        // #6 
        test("should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
            assert.strictEqual(convertHandler.getNum("test"), 1);
        })
        // #7 
        test("should correctly read each valid input unit", function () {
            const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
            validUnits.forEach(unit => assert.strictEqual(convertHandler.getUnit(unit), unit));
        })
        // #8 
        test("should correctly return an error for an invalid input unit", function () {
            assert.strictEqual(convertHandler.getUnit("invalidUnit"), "invalid unit");
        })
        // #9 
        test("should return the correct return unit for each valid input unit", function () {
        const inputOutputMap = {
            "gal" : "L",
            "L"   : "gal",
            "mi"  : "km",
            "km"  : "mi",
            "lbs" : "kg",
            "kg"  : "lbs"
        };

        for (let input in inputOutputMap) {
            assert.strictEqual(convertHandler.getReturnUnit(input), inputOutputMap[input]);
        }
          
        })
        // #10 
        test("should correctly return the spelled-out string unit for each valid input unit.", function () {
            const unitSpelling = {
                "gal" : "gallons",
                "L"   : "liters",
                "mi"  : "miles",
                "km"  : "kilometers",
                "lbs" : "pounds",
                "kg"  : "kilograms"
            };

            for (let unit in unitSpelling) {
                assert.strictEqual(convertHandler.spellOutUnit(unit), unitSpelling[unit]);
            }
        })
        // #11
        test("should correctly convert gal to L", function () {
            assert.closeTo(convertHandler.convert(1, "gal"), 3.78541, 0.0001);
            assert.closeTo(convertHandler.convert(2, "gal"), 7.57082, 0.0001);
            assert.closeTo(convertHandler.convert(3, "gal"), 11.35623, 0.0001);
        })
        // #12
        test("should correctly convert L to gal", function () {
            assert.closeTo(convertHandler.convert(1, "L"), 0.26417, 0.0001);
            assert.closeTo(convertHandler.convert(2, "L"), 0.52834, 0.0001);
            assert.closeTo(convertHandler.convert(3, "L"), 0.79251, 0.0001);
        })
        // #13 
        test("should correctly convert mi to km", function () {
            assert.closeTo(convertHandler.convert(1, "mi"), 1.60934, 0.0001);
            assert.closeTo(convertHandler.convert(2, "mi"), 3.21868, 0.0001);
            assert.closeTo(convertHandler.convert(3, "mi"), 4.82802, 0.0001);
        })
        // #14 
        test("should correctly convert km to mi", function () {
            assert.closeTo(convertHandler.convert(1, "km"), 0.62137, 0.0001);
            assert.closeTo(convertHandler.convert(2, "km"), 1.24274, 0.0001);
            assert.closeTo(convertHandler.convert(3, "km"), 1.86411, 0.0001);
        })
        // #15
        test("should correctly convert lbs to kg", function () {
            assert.closeTo(convertHandler.convert(1, "lbs"), 0.45359, 0.0001);
            assert.closeTo(convertHandler.convert(2, "lbs"), 0.90718, 0.0001);
            assert.closeTo(convertHandler.convert(3, "lbs"), 1.36077, 0.0001);
        })
        // #16 
        test("should correctly convert kg to lbs", function () {
            assert.closeTo(convertHandler.convert(1, "kg"), 2.20462, 0.0001);
            assert.closeTo(convertHandler.convert(2, "kg"), 4.40924, 0.0001);
            assert.closeTo(convertHandler.convert(3, "kg"), 6.61387, 0.0001);
        })
    })
});