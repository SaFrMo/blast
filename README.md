Vanilla version of [Blast.js](http://velocityjs.org/blast/). Blast text apart to make it manipulable.

## Quickstart

```sh
npm install blast-vanilla
```

```js
import Blast from 'blast-vanilla'

new Blast('.selector', { /* options */ })
```

## API
Options:

```js
new Blast('.selector', {
    returnGenerated: true,      
    delimiter: 'word',          // separate according to this delimiter
                                // 'character', 'word', 'sentence', or 'element'
    tag: 'span',                // wrapper for separated elements
    search: false,              // value to search for and wrap
    customClass: '',            // class to attach to wrappers
    aria: true,                 // generate aria attributes to keep accessibility
    debug: false,               // print extra debug info

    // new options for vanilla version
    name: 'blast'               // root elements will be called '${ name }-root'

    // present in original Blast.js, not yet supported in vanilla
    // generateIndexID: false,
    // generateValueClass: false,
    // stripHTMLTags: options.stripHTMLTags || false,
})
```

## Original Docs
[velocityjs.org/blast/](http://velocityjs.org/blast/)

## Credits
Based on Blast.js, originally developed by Julian Shapiro.

====

[MIT License](LICENSE). © Julian Shapiro (http://twitter.com/shapiro).
