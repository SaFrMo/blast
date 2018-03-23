export const characterRanges = {
    latinPunctuation: "–—′’'“″„\"(«.…¡¿′’'”″“\")».…!?",
    latinLetters: "\\u0041-\\u005A\\u0061-\\u007A\\u00C0-\\u017F\\u0100-\\u01FF\\u0180-\\u027F"
}
export const Reg = {
    /* If the abbreviations RegEx is missing a title abbreviation that you find yourself needing to often escape manually, tweet me: @Shapiro. */
    abbreviations: new RegExp("[^" + characterRanges.latinLetters + "](e\\.g\\.)|(i\\.e\\.)|(mr\\.)|(mrs\\.)|(ms\\.)|(dr\\.)|(prof\\.)|(esq\\.)|(sr\\.)|(jr\\.)[^" + characterRanges.latinLetters + "]", "ig"),
    innerWordPeriod: new RegExp("[" + characterRanges.latinLetters + "]\.[" + characterRanges.latinLetters + "]", "ig"),
    onlyContainsPunctuation: new RegExp("[^" + characterRanges.latinPunctuation + "]"),
    adjoinedPunctuation: new RegExp("^[" + characterRanges.latinPunctuation + "]+|[" + characterRanges.latinPunctuation + "]+$", "g"),
    skippedElements: /(script|style|select|textarea)/i,
    hasPluginClass: new RegExp("(^| )" + 'blast' + "( |$)", "gi")
}

/* Escape likely false-positives of sentence-final periods. Escaping is performed by wrapping a character's ASCII equivalent in double curly brackets,
   which is then reversed (deencodcoded) after delimiting. */
export function encodePunctuation (text) {
    return text
            /* Escape the following Latin abbreviations and English titles: e.g., i.e., Mr., Mrs., Ms., Dr., Prof., Esq., Sr., and Jr. */
            .replace(exports.Reg.abbreviations, function(match) {
                return match.replace(/\./g, "{{46}}");
            })
            /* Escape inner-word (non-space-delimited) periods. For example, the period inside "Blast.js". */
            .replace(exports.Reg.innerWordPeriod, function(match) {
                return match.replace(/\./g, "{{46}}");
            });
}

/* Used to decode both the output of encodePunctuation() and punctuation that has been manually escaped by users. */
export function decodePunctuation (text) {
    return text.replace(/{{(\d{1,3})}}/g, function(fullMatch, subMatch) {
        return String.fromCharCode(subMatch);
    });
}
