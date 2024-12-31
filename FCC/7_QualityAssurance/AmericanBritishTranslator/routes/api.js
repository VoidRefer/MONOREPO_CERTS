'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // finish
      const { text, locale } = req.body;

      // Check missing fields
      if ( text === undefined || locale === undefined) return res.json( {error: "Required field(s) missing"} );
      
      // Check empty text
      if (!text) return res.json( {error: "No text to translate"} );

      // Validate locale
      const validLocales = ["american-to-british", "british-to-american"];
      if (!validLocales.includes(locale)) return res.json( {error: "Invalid value for locale field"} );

      const normalizedText = text.charAt(0).toUpperCase() + text.slice(1);
      const translation = translator.translate(normalizedText, locale);
      
      if (translation === text) return res.json( {text, translation: "Everything looks good to me!"} );

      res.json({text, translation})
      
    });
};
