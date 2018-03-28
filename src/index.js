import createDelimiters from './createDelimiters'
import getText from './getText'
import processElements from './processElements'
import traverseDOM from './traverseDOM'

export default class {

    constructor(el, options = {}){

        // build array of target elements
        this.elements = []
        if( typeof el == 'string' ){
            this.elements = Array.from(document.querySelectorAll(el))
        } else {
            this.elements = [el]
        }

        // set up defaults
        this.opts = {
            returnGenerated: options.returnGenerated || true,
            delimiter: options.delimiter || 'word',
            tag: options.tag || 'span',
            search: options.search || false,
            customClass: options.customClass || '',
            generateIndexID: options.generateIndexID || false,
            generateValueClass: options.generateValueClass || false,
            // stripHTMLTags: options.stripHTMLTags || false, // not yet supported
            aria: options.hasOwnProperty('aria') ? options.aria : true,
            debug: options.debug || false,

            // new options for vanilla version
            name: options.name || 'blast'
        }

        // set up Element
        Element = {
            /* The index of each wrapper element generated by blasting. */
            blastedIndex: 0,
            /* Whether we're just entering this node. */
            nodeBeginning: false,
            /* Keep track of the elements generated by Blast so that they can (optionally) be pushed onto the jQuery call stack. */
            wrappers: Element.wrappers || []
        }

        // create delimiters
        const processedDelimiters = this.createDelimiters()
        this.opts.processedDelimiter = processedDelimiters.delimiter
        this.opts.processedDelimiterRegex = processedDelimiters.delimiterRegex

        // initial element processing
        this.processedElements = this.processElements()

        // DOM traversal
        if (this.opts.debug) console.time('blast');
        this.processedElements.map(elem => {
            traverseDOM(elem, this.opts);
        })
        if (this.opts.debug) console.timeEnd('blast');

    }

    createDelimiters(opts = null){
        return createDelimiters(opts || this.opts)
    }

    getText(el){
        return getText(el)
    }

    processElements(elements = null, opts = null){
        return processElements(elements || this.elements, opts || this.opts)
    }
}
