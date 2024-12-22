'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input || ""; // Default to empty string if input is undefined
    
    try {
      // Extract the numerical value and unit
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (initNum === "invalid number" && initUnit === "invalid unit") {
        return res.json("invalid number and unit");
      }
      if (initNum === "invalid number") {
        return res.json("invalid number");
      }
      if (initUnit === "invalid unit") {
        return res.json("invalid unit");
      }
      
      // Get converted value and unit
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      // Get description string
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      // Respond with json
      res.json({
        initNum,
        initUnit, 
        returnNum,
        returnUnit,
        string
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
};