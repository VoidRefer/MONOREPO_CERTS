const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    constructor () {
        this.americanToBritish = {
            ...americanOnly,
            ...americanToBritishSpelling,
            ...americanToBritishTitles
        };

        this.britishToAmerican = {
            ...britishOnly,
            ...this.reverseObject(americanToBritishSpelling),
            ...this.reverseObject(americanToBritishTitles),
        };
    }

    reverseObject(obj) {
        const reversed = {};
        for (const [key, value] of Object.entries(obj)) {
            reversed[value] = key;
        }
        return reversed;
    }

    translateTime(text, direction) {
        const timeRegex = direction === "american-to-british"
            ? /(\d{1,2}):(\d{2})/g // Matches american format
            : /(\d{1,2}).(\d{2})/g // Matches british format
        
        return text.replace(timeRegex, (match, p1, p2) => {
            const separator = direction === "american-to-british" ? "." : ":";
            return `<span class="highlight">${p1}${separator}${p2}</span>`
        })
    }
    
    translate(text, direction="american-to-british") {
        const dictonary = direction === "american-to-british"
            ? this.americanToBritish
            : this.britishToAmerican;

        let translated = text;

        for (const [key, value] of Object.entries(dictonary)) {
            const regex = new RegExp(`\\b${key}(?=[\\s,.])`, "gi");
            translated = translated.replace(regex, match => {
                const replacement = match[0] === match[0].toUpperCase()
                    ? value[0].toUpperCase() + value.slice(1)
                    : value;
                return `<span class="highlight">${replacement}</span>`;
            });
        }

        translated = this.translateTime(translated, direction);

        return translated;
    }
}

module.exports = Translator;