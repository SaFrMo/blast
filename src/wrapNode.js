export default (node, opts) => {
    const wrapper = document.createElement(opts.tag);

    /* Assign the element a class of "blast". */
    wrapper.className = opts.name;

    /* If a custom class was provided, assign that too. */
    if (opts.customClass) {
        wrapper.className += ' ' + opts.customClass;

        /* If an opts.customClass is provided, generate an ID consisting of customClass and a number indicating the match's iteration. */
        if (opts.generateIndexID) {
            wrapper.id = opts.customClass + "-" + Element.blastedIndex;
        }
    }

    /* For the "all" delimiter, prevent space characters from collapsing. */
    if (opts.delimiter === "all" && /\s/.test(node.data)) {
        wrapper.style.whiteSpace = "pre-line";
    }

    /* Assign the element a class equal to its escaped inner text. Only applicable to the character and word delimiters (since they do not contain spaces). */
    if (opts.generateValueClass === true && !opts.search && (opts.delimiter === "character" || opts.delimiter === "word")) {
        var valueClass,
            text = node.data;

        /* For the word delimiter, remove adjoined punctuation, which is unlikely to be desired as part of the match -- unless the text
           consists solely of punctuation (e.g. "!!!"), in which case we leave the text as-is. */
        if (opts.delimiter === "word" && Reg.onlyContainsPunctuation.test(text)) {
            /* E: Remove punctuation that's adjoined to either side of the word match. */
            text = text.replace(Reg.adjoinedPunctuation, "");
        }

        valueClass = NAME + "-" + opts.delimiter.toLowerCase() + "-" + text.toLowerCase();

        wrapper.className += " " + valueClass;
    }

    /* Hide the wrapper elements from screenreaders now that we've set the target's aria-label attribute. */
    if (opts.aria) {
        wrapper.setAttribute("aria-hidden", "true");
    }

    wrapper.appendChild(node.cloneNode(false));

    return wrapper;
}
