module.exports.default = function(opts){
    let delimiter = opts.delimiter
    let delimiterRegex

    /* Ensure that the delimiter search variable is a non-empty string. */
    if (opts.search.length && (typeof opts.search === "string" || /^\d/.test(parseFloat(opts.search)))) {
        /* Since the search is performed as a Regex (see below), we escape the string's Regex meta-characters. */
        delimiter = opts.search.toString().replace(/[-[\]{,}(.)*+?|^$\\\/]/g, "\\$&");

        /* Note: This matches the apostrophe+s of the phrase's possessive form: {PHRASE's}. */
        /* Note: This will not match text that is part of a compound word (two words adjoined with a dash), e.g. "front" won't match inside "front-end". */
        /* Note: Based on the way the search algorithm is implemented, it is not possible to search for a string that consists solely of punctuation characters. */
        /* Note: By creating boundaries at Latin alphabet ranges instead of merely spaces, we effectively match phrases that are inlined alongside any type of non-Latin-letter,
           e.g. word|, word!, ♥word♥ will all match. */
        delimiterRegex = new RegExp("(?:^|[^-" + characterRanges.latinLetters + "])(" + delimiter + "('s)?)(?![-" + characterRanges.latinLetters + "])", "i");
    } else {
        /* Normalize the string's case for the delimiter switch check below. */
        if (typeof delimiter === "string") {
            delimiter = delimiter.toLowerCase();
        }

        switch (delimiter) {
            case "all":
                /* Matches every character then later sets spaces to "white-space: pre-line" so they don't collapse. */
                delimiterRegex = /(.)/;
                break;

            case "letter":
            case "char":
            case "character":
                /* Matches every non-space character. */
                /* Note: This is the slowest delimiter. However, its slowness is only noticeable when it's used on larger bodies of text (of over 500 characters) on <=IE8.
                   (Run Blast with opts.debug=true to monitor execution times.) */
                delimiterRegex = /(\S)/;
                break;

            case "word":
                /* Matches strings in between space characters. */
                /* Note: Matches will include any punctuation that's adjoined to the word, e.g. "Hey!" will be a full match. */
                /* Note: Remember that, with Blast, every HTML element marks the start of a brand new string. Hence, "in<b>si</b>de" matches as three separate words. */
                delimiterRegex = /\s*(\S+)\s*/;
                break;

            case "sentence":
                /* Matches phrases either ending in Latin alphabet punctuation or located at the end of the text. (Linebreaks are not considered punctuation.) */
                /* Note: If you don't want punctuation to demarcate a sentence match, replace the punctuation character with {{ASCII_CODE_FOR_DESIRED_PUNCTUATION}}. ASCII codes: .={{46}}, ?={{63}}, !={{33}} */
                delimiterRegex = /(?=\S)(([.]{2,})?[^!?]+?([.…!?]+|(?=\s+$)|$)(\s*[′’'”″“")»]+)*)/;
                /* RegExp explanation (Tip: Use Regex101.com to play around with this expression and see which strings it matches):
                   - Expanded view: /(?=\S) ( ([.]{2,})? [^!?]+? ([.…!?]+|(?=\s+$)|$) (\s*[′’'”″“")»]+)* )
                   - (?=\S) --> Match must contain a non-space character.
                   - ([.]{2,})? --> Match may begin with a group of periods.
                   - [^!?]+? --> Grab everything that isn't an unequivocally-terminating punctuation character, but stop at the following condition...
                   - ([.…!?]+|(?=\s+$)|$) --> Match the last occurrence of sentence-final punctuation or the end of the text (optionally with left-side trailing spaces).
                   - (\s*[′’'”″“")»]+)* --> After the final punctuation, match any and all pairs of (optionally space-delimited) quotes and parentheses.
                */
                break;

            case "element":
                /* Matches text between HTML tags. */
                /* Note: Wrapping always occurs inside of elements, i.e. <b><span class="blast">Bolded text here</span></b>. */
                delimiterRegex = /(?=\S)([\S\s]*\S)/;
                break;

            /*****************
               Custom Regex
            *****************/

            default:
                /* You can pass in /your-own-regex/. */
                if (delimiter instanceof RegExp) {
                    delimiterRegex = delimiter;
                } else {
                    console.log(NAME + ": Unrecognized delimiter, empty search string, or invalid custom Regex. Aborting.");
                }
        }
    }

    return {
        delimiter,
        delimiterRegex
    }
}
