import createDelimiters from 'createDelimiters'
import getText from 'getText'
import processElements from 'processElements'

module.exports = class {

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
            debug: options.debug || false
        }

        // create delimiters
        const processedDelimiters = this.createDelimiters()
        this.processedDelimiter = processedDelimiters.delimiter
        this.processedDelimiterRegex = processedDelimiters.delimiterRegex

        // map through elements
        this.processedElements = this.processElements()

        console.log(this)

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
