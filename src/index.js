const createDelimiters = require('./createDelimiters').default

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
            stripHTMLTags: options.stripHTMLTags || false,
            aria: options.hasOwnProperty('aria') ? options.aria : true,
            debug: options.debug || false
        }

        // run setup
        const processedDelimiters = this.createDelimiters()
        this.processedDelimiter = processedDelimiters.delimiter
        this.processedDelimiterRegex = processedDelimiters.delimiterRegex

        console.log(this)

    }

    createDelimiters(){
        return createDelimiters(this.opts)
    }
}
