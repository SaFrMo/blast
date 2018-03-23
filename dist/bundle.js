var OverlapWatch=function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.delimiter,r=void 0;if(e.search.length&&("string"==typeof e.search||/^\d/.test(parseFloat(e.search))))t=e.search.toString().replace(/[-[\]{,}(.)*+?|^$\\\/]/g,"\\$&"),r=new RegExp("(?:^|[^-"+characterRanges.latinLetters+"])("+t+"('s)?)(?![-"+characterRanges.latinLetters+"])","i");else switch("string"==typeof t&&(t=t.toLowerCase()),t){case"all":r=/(.)/;break;case"letter":case"char":case"character":r=/(\S)/;break;case"word":r=/\s*(\S+)\s*/;break;case"sentence":r=/(?=\S)(([.]{2,})?[^!?]+?([.…!?]+|(?=\s+$)|$)(\s*[′’'”″“")»]+)*)/;break;case"element":r=/(?=\S)([\S\s]*\S)/;break;default:t instanceof RegExp?r=t:console.log(NAME+": Unrecognized delimiter, empty search string, or invalid custom Regex. Aborting.")}return{delimiter:t,delimiterRegex:r}}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(0),i=function(e){return e&&e.__esModule?e:{default:e}}(s);e.exports=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};n(this,e),this.elements=[],this.elements="string"==typeof t?Array.from(document.querySelectorAll(t)):[t],this.opts={returnGenerated:r.returnGenerated||!0,delimiter:r.delimiter||"word",tag:r.tag||"span",search:r.search||!1,customClass:r.customClass||"",generateIndexID:r.generateIndexID||!1,generateValueClass:r.generateValueClass||!1,stripHTMLTags:r.stripHTMLTags||!1,aria:!r.hasOwnProperty("aria")||r.aria,debug:r.debug||!1};var a=this.createDelimiters();this.processedDelimiter=a.delimiter,this.processedDelimiterRegex=a.delimiterRegex,console.log(this)}return a(e,[{key:"createDelimiters",value:function(){return(0,i.default)(this.opts)}}]),e}()}]);
//# sourceMappingURL=bundle.js.map