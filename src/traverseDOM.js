import { encodePunctuation, decodePunctuation, Reg } from 'utils'
import wrapNode from 'wrapNode'

function traverseDOM (node, opts) {
    let matchPosition = -1
    let skipNodeBit = 0

    /* Only proceed if the node is a text node and isn't empty. */
    if (node.nodeType === 3 && node.data.length) {
        /* Perform punctuation encoding/decoding once per original whole text node (before it gets split up into bits). */
        if (Element.nodeBeginning) {
            /* For the sentence delimiter, we first escape likely false-positive sentence-final punctuation. For all other delimiters,
               we must decode the user's manually-escaped punctuation so that the RegEx can match correctly (without being thrown off by characters in {{ASCII}}). */
            node.data = (!opts.search && opts.delimiter === "sentence") ? encodePunctuation(node.data) : decodePunctuation(node.data);

            Element.nodeBeginning = false;
        }

        matchPosition = node.data.search(opts.processedDelimiterRegex);

        /* If there's a RegEx match in this text node, proceed with element wrapping. */
        if (matchPosition !== -1) {
            var match = node.data.match(opts.processedDelimiterRegex),
                matchText = match[0],
                subMatchText = match[1] || false;

            /* RegEx queries that can return empty strings (e.g ".*") produce an empty matchText which throws the entire traversal process into an infinite loop due to the position index not incrementing.
               Thus, we bump up the position index manually, resulting in a zero-width split at this location followed by the continuation of the traversal process. */
            if (matchText === "") {
                matchPosition++;
            /* If a RegEx submatch is produced that is not identical to the full string match, use the submatch's index position and text.
               This technique allows us to avoid writing multi-part RegEx queries for submatch finding. */
            } else if (subMatchText && subMatchText !== matchText) {
                matchPosition += matchText.indexOf(subMatchText);
                matchText = subMatchText;
            }

            /* Split this text node into two separate nodes at the position of the match, returning the node that begins after the match position. */
            var middleBit = node.splitText(matchPosition);

            /* Split the newly-produced text node at the end of the match's text so that middleBit is a text node that consists solely of the matched text. The other newly-created text node, which begins
               at the end of the match's text, is what will be traversed in the subsequent loop (in order to find additional matches in the containing text node). */
            middleBit.splitText(matchText.length);

            /* Over-increment the loop counter (see below) so that we skip the extra node (middleBit) that we've just created (and already processed). */
            skipNodeBit = 1;

            if (!opts.search && opts.delimiter === "sentence") {
                /* Now that we've forcefully escaped all likely false-positive sentence-final punctuation, we must decode the punctuation back from ASCII. */
                middleBit.data = decodePunctuation(middleBit.data);
            }

            /* Create the wrapped node. */
            var wrappedNode = wrapNode(middleBit, opts, Element.blastedIndex);
            /* Then replace the middleBit text node with its wrapped version. */
            middleBit.parentNode.replaceChild(wrappedNode, middleBit);

            /* Push the wrapper onto the Element.wrappers array (for later use with stack manipulation). */
            Element.wrappers.push(wrappedNode);

            Element.blastedIndex++;

            /* Note: We use this slow splice-then-iterate method because every match needs to be converted into an HTML element node. A text node's text cannot have HTML elements inserted into it. */
            /* TODO: To improve performance, use documentFragments to delay node manipulation so that DOM queries and updates can be batched across elements. */
        }
    /* Traverse the DOM tree until we find text nodes. Skip script and style elements. Skip select and textarea elements since they contain special text nodes that users would not want wrapped.
       Additionally, check for the existence of our plugin's class to ensure that we do not retraverse elements that have already been blasted. */
    /* Note: This basic DOM traversal technique is copyright Johann Burkard <http://johannburkard.de>. Licensed under the MIT License: http://en.wikipedia.org/wiki/MIT_License */
    } else if (node.nodeType === 1 && node.hasChildNodes() && !Reg.skippedElements.test(node.tagName) && !Reg.hasPluginClass.test(node.className)) {
        /* Note: We don't cache childNodes' length since it's a live nodeList (which changes dynamically with the use of splitText() above). */
        for (var i = 0; i < node.childNodes.length; i++) {
            Element.nodeBeginning = true;

            i += traverseDOM(node.childNodes[i], opts);
        }
    }

    return skipNodeBit;

}

export default traverseDOM
