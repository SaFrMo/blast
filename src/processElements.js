import getText from 'getText'
import traverseDOM from 'traverseDOM'

export default (elements, opts) => {
    return elements.map(elem => {

        // get text contents
        const text = getText(elem)

        // prep wrapping tag
        let tag = opts.tag || 'span'
        /* If the browser throws an error for the provided element type (browers whitelist the letters and types of the elements they accept), fall back to using "span". */
        try {
            document.createElement(tag);
        } catch (error) {
            tag = "span";

            if (opts.debug) console.log(NAME + ": Invalid tag supplied. Defaulting to span.");
        }

        // ###
        // TODO: Reimplement reversing?
        // /* Unless a consecutive opts.search is being performed, an element's existing Blast call is reversed before proceeding. */
        // if ($this.data(NAME) !== undefined && ($this.data(NAME) !== "search" || opts.search === false)) {
        //     reverse(el, opts);
        //
        //     if (opts.debug) console.log(NAME + ": Removed element's existing Blast call.");
        // }
        // ###

        // ###
        // TODO: Reimplement?
        /* Store the current delimiter type so that it can be compared against on subsequent calls (see above). */
        //$this.data(NAME, opts.search !== false ? "search" : opts.delimiter);
        // ###

        // set up aria attribute
        if (opts.aria) {
            elem.setAttribute("aria-label", text)
        }

        // ###
        // TODO: Reimplement tag stripping?
        // ###

        /* For reference purposes when reversing Blast, assign the target element a root class. */
        elem.classList.add('blast-root');

        /* Initiate the DOM traversal process. */
        if (opts.debug) console.time('blast');
        traverseDOM(elem, opts);
        if (opts.debug) console.timeEnd('blast');

        // ###
        // TODO: Reimplement reversal?
        /* If false is passed in as the first parameter, reverse Blast. */
        // } else if (options === false && $this.data(NAME) !== undefined) {
        //     reverse($this, opts);
        // }
        // ###

        // ###
        // TODO: Reimplement?
        /**************
           Debugging
        **************/

        /* Output the full string of each wrapper element and color alternate the wrappers. This is in addition to the performance timing that has already been outputted. */
        // if (opts.debug) {
        //     $.each(Element.wrappers, function(index, element) {
        //         console.log(NAME + " [" + opts.delimiter + "] " + this.outerHTML);
        //         this.style.backgroundColor = index % 2 ? "#f12185" : "#075d9a";
        //     })
        // }
        // ###

        return elem
    })
}
