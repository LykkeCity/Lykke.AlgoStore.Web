define("algo-store-eclipse",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
"use strict";

exports.isDark = false;
exports.cssText = ".algo-store-eclipse .ace_gutter {\
background-color: #f7f8f9;\
border-right: 1px solid rgb(159, 159, 159);\
color: #3f4d60;\
}\
.algo-store-eclipse .ace_print-margin {\
width: 1px;\
background: #ebebeb;\
}\
.algo-store-eclipse {\
background-color: #FFFFFF;\
color: black;\
}\
.algo-store-eclipse .ace_fold {\
background-color: rgb(60, 76, 114);\
}\
.algo-store-eclipse .ace_cursor {\
color: black;\
}\
.algo-store-eclipse .ace_storage,\
.algo-store-eclipse .ace_keyword,\
.algo-store-eclipse .ace_variable {\
color: rgb(127, 0, 85);\
}\
.algo-store-eclipse .ace_constant.ace_buildin {\
color: rgb(88, 72, 246);\
}\
.algo-store-eclipse .ace_constant.ace_library {\
color: rgb(6, 150, 14);\
}\
.algo-store-eclipse .ace_function {\
color: rgb(60, 76, 114);\
}\
.algo-store-eclipse .ace_string {\
color: rgb(42, 0, 255);\
}\
.algo-store-eclipse .ace_comment {\
color: rgb(113, 150, 130);\
}\
.algo-store-eclipse .ace_comment.ace_doc {\
color: rgb(63, 95, 191);\
}\
.algo-store-eclipse .ace_comment.ace_doc.ace_tag {\
color: rgb(127, 159, 191);\
}\
.algo-store-eclipse .ace_constant.ace_numeric {\
color: darkblue;\
}\
.algo-store-eclipse .ace_tag {\
color: rgb(25, 118, 116);\
}\
.algo-store-eclipse .ace_type {\
color: rgb(127, 0, 127);\
}\
.algo-store-eclipse .ace_xml-pe {\
color: rgb(104, 104, 91);\
}\
.algo-store-eclipse .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.algo-store-eclipse .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.algo-store-eclipse .ace_meta.ace_tag {\
color:rgb(25, 118, 116);\
}\
.algo-store-eclipse .ace_invisible {\
color: #ddd;\
}\
.algo-store-eclipse .ace_entity.ace_other.ace_attribute-name {\
color:rgb(127, 0, 127);\
}\
.algo-store-eclipse .ace_marker-layer .ace_step {\
background: rgb(255, 255, 0);\
}\
.algo-store-eclipse .ace_active-line {\
background: rgb(194, 222, 255);\
}\
.algo-store-eclipse .ace_gutter-active-line {\
background-color : #DADADA;\
}\
.algo-store-eclipse .ace_marker-layer .ace_selected-word {\
border: 1px solid rgb(181, 213, 255);\
}\
.algo-store-eclipse .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
} \
.ace_scrollbar-v, .ace_scrollbar-h {\n" +
  "    display: none;\n" +
  "  }";

exports.cssClass = "algo-store-eclipse";

var dom = require("ace/lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
