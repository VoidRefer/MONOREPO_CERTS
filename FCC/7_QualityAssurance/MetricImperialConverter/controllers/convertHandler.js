const { expect } = require("chai");

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // Extract non-letter
    const numberRegex = /^[^a-zA-Z]+/;
    const match = input.match(numberRegex);
    
    if (!match) return 1; // Default to 1 if no number
    
    result = match[0];
    if (result.includes("/")) {
      const numbers = result.split("/");
      if (numbers.length !== 2) return "invalid number";
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) return "invalid number";
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    // Extract letter
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (!match) return "invalid unit";

    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    const unit = match[0];

    if (!validUnits.includes(unit.toLowerCase())) return "invalid unit";

    
    
    return unit.toLowerCase() === "l" ? "L" : unit.toLowerCase();;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const unitMap = {
      "gal" : "L",
      "L"   : "gal",
      "mi"  : "km",
      "km"  : "mi",
      "lbs" : "kg",
      "kg"  : "lbs"
    };

    result = unitMap[initUnit === "L" ? initUnit : initUnit.toLowerCase()] || "invalid unit";
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const unitNames = {
      "gal" : "gallons",
      "L"   : "liters",
      "mi"  : "miles",
      "km"  : "kilometers",
      "lbs" : "pounds",
      "kg"  : "kilograms"
    };
    
    result = unitNames[unit === "L" ? unit : unit.toLowerCase()] || "invalid unit";

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
    case "gal":
      result = initNum * galToL;
      break;
    case "l":
      result = initNum / galToL;
      break;
    case "mi":
      result = initNum * miToKm;
      break;
    case "km":
      result = initNum / miToKm;
      break;
    case "lbs":
      result = initNum * lbsToKg;
      break;
    case "kg":
      result = initNum / lbsToKg;
      break;
    default:
      throw new Error("invalid unit");
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return "invalid number and unit";
    }
    if (initNum === "invalid number") {
      return "invalid number";
    }
    if (initUnit === "invalid unit") {
      return "invalid unit";
    }

    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };
  
}

module.exports = ConvertHandler;
