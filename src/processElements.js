import getText from 'getText'

export default (elements, opts) => {
    elements.map(elem => {
        const text = getText(elem)

        /*****************
           Housekeeping
        *****************/

        /* Unless a consecutive opts.search is being performed, an element's existing Blast call is reversed before proceeding. */
        // TODO: Reimplement?
        // if ($this.data(NAME) !== undefined && ($this.data(NAME) !== "search" || opts.search === false)) {
        //     reverse(el, opts);
        //
        //     if (opts.debug) console.log(NAME + ": Removed element's existing Blast call.");
        // }

        /* Store the current delimiter type so that it can be compared against on subsequent calls (see above). */
        //$this.data(NAME, opts.search !== false ? "search" : opts.delimiter);

        if (opts.aria) {
            elem.setAttribute("aria-label", text)
        }


    })
}
