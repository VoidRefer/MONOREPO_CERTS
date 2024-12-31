const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();

const validLocales = ["american-to-british", "british-to-american"];

suite('Unit Tests', () => {
    suite("American to British", function () {
        test("Translate Mangoes are my favorite fruit. to British English", function () {
            const text = "Mangoes are my favorite fruit.";
            const locale = validLocales[0];
            const expected = "Mangoes are my <span class=\"highlight\">favourite</span> fruit.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate I ate yogurt for breakfast. to British English", function () {
            const text = "I ate yogurt for breakfast.";
            const locale = validLocales[0];
            const expected = "I ate <span class=\"highlight\">yoghurt</span> for breakfast.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate We had a party at my friend's condo. to British English", function () {
            const text = "We had a party at my friend's condo.";
            const locale = validLocales[0];
            const expected = "We had a party at my friend's <span class=\"highlight\">flat</span>.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate Can you toss this in the trashcan for me? to British English", function () {
            const text = "Can you toss this in the trashcan for me?";
            const locale = validLocales[0];
            const expected = "Can you toss this in the <span class=\"highlight\">bin</span> for me?";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate The parking lot was full. to British English", function () {
            const text = "The parking lot was full.";
            const locale = validLocales[0];
            const expected = "The <span class=\"highlight\">car park</span> was full.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
            const text = "Like a high tech Rube Goldberg machine.";
            const locale = validLocales[0];
            const expected = "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate To play hooky means to skip class or work. to British English", function () {
            const text = "To play hooky means to skip class or work.";
            const locale = validLocales[0];
            const expected = "To <span class=\"highlight\">bunk off</span> means to skip class or work.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate No Mr. Bond, I expect you to die. to British English", function () {
            const text = "No Mr. Bond, I expect you to die.";
            const locale = validLocales[0];
            const expected = "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate Dr. Grosh will see you now. to British English", function () {
            const text = "Dr. Grosh will see you now.";
            const locale = validLocales[0];
            const expected = "<span class=\"highlight\">Dr</span> Grosh will see you now.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    
        test("Translate Lunch is at 12:15 today. to British English", function () {
            const text = "Lunch is at 12:15 today.";
            const locale = validLocales[0];
            const expected = "Lunch is at <span class=\"highlight\">12.15</span> today.";
            assert.strictEqual(translator.translate(text, locale), expected);
        });
    });
    
    suite("British to American", function () {
        test("Translate We watched the footie match for a while. to American English", function () {
            const text = "We watched the footie match for a while.";
            const locale = validLocales[1];
            const expected = "We watched the <span class=\"highlight\">soccer</span> match for a while.";
            // <span class=\"highlight\">footie</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate Paracetamol takes up to an hour to work. to American English", function () {
            const text = "Paracetamol takes up to an hour to work.";
            const locale = validLocales[1];
            const expected = "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.";
            // <span class=\"highlight\">Tylenol </span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate First, caramelise the onions. to American English", function () {
            const text = "First, caramelise the onions.";
            const locale = validLocales[1];
            const expected = "First, <span class=\"highlight\">caramelize</span> the onions.";
            // <span class=\"highlight\">caramelize</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate I spent the bank holiday at the funfair. to American English", function () {
            const text = "I spent the bank holiday at the funfair.";
            const locale = validLocales[1];
            const expected = "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.";
            // <span class=\"highlight\">carnival</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate I had a bicky then went to the chippy. to American English", function () {
            const text = "I had a bicky then went to the chippy.";
            const locale = validLocales[1];
            const expected = "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.";
            // <span class=\"highlight\">fish-and-chip shop</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });
 
        test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
            const text = "I've just got bits and bobs in my bum bag.";
            const locale = validLocales[1];
            const expected = "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.";
            // <span class=\"highlight\">fanny pack</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
            const text = "The car boot sale at Boxted Airfield was called off.";
            const locale = validLocales[1];
            const expected = "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.";
            // <span class=\"highlight\">swap meet</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate Have you met Mrs Kalyani? to American English", function () {
            const text = "Have you met Mrs Kalyani?";
            const locale = validLocales[1];
            const expected = "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?";
            // <span class=\"highlight\">Mrs.</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });

        test("Translate Prof Joyner of King's College, London. to American English", function () {
            const text = "Prof Joyner of King's College, London.";
            const locale = validLocales[1];
            const expected = "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.";
            // <span class=\"highlight\">Prof.</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });
        
        test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
            const text = "Tea time is usually around 4 or 4.30.";
            const locale = validLocales[1];
            const expected = "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.";
            // <span class=\"highlight\">4:30</span>
            assert.strictEqual(translator.translate(text, locale), expected);
        });
        
    });
    
    suite("Highlighting Translations", function () {
        test("Highlight translation in Mangoes are my favorite fruit.", function () {
            const text = "Mangoes are my favorite fruit.";
            const translation = translator.translate(text, validLocales[0]);
            assert.include(translation, '<span class="highlight">');
        });
        test("Highlight translation in I ate yogurt for breakfast.", function () {
            const text = "I ate yogurt for breakfast.";
            const translation = translator.translate(text, validLocales[0]);
            assert.include(translation, '<span class="highlight">');
        });
        test("Highlight translation in We watched the footie match for a while.", function () {
            const text = "We watched the footie match for a while.";
            const translation = translator.translate(text, validLocales[1]);
            assert.include(translation, '<span class="highlight">');
        });
        test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
            const text = "Paracetamol takes up to an hour to work.";
            const translation = translator.translate(text, validLocales[1]);
            assert.include(translation, '<span class="highlight">');
        });
    });
});
