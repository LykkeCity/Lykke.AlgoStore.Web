define("algo-store-monokai",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "algo-store-monokai";
exports.cssText = ".algo-store-monokai .ace_gutter {\
background-color: #3c3c3c;\
color: #8F908A\
}\
.algo-store-monokai .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.algo-store-monokai {\
background-color: #272822;\
color: #F8F8F2\
}\
.algo-store-monokai .ace_cursor {\
color: #F8F8F0\
}\
.algo-store-monokai .ace_marker-layer .ace_selection {\
background: #49483E\
}\
.algo-store-monokai.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.algo-store-monokai .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.algo-store-monokai .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
}\
.algo-store-monokai .ace_marker-layer .ace_active-line {\
background: #69693a;\
}\
.algo-store-monokai .ace_gutter-active-line {\
background-color: #272727\
}\
.algo-store-monokai .ace_marker-layer .ace_selected-word {\
border: 1px solid #49483E\
}\
.algo-store-monokai .ace_invisible {\
color: #52524d\
}\
.algo-store-monokai .ace_entity.ace_name.ace_tag,\
.algo-store-monokai .ace_keyword,\
.algo-store-monokai .ace_meta.ace_tag,\
.algo-store-monokai .ace_storage {\
color: #F92672\
}\
.algo-store-monokai .ace_punctuation,\
.algo-store-monokai .ace_punctuation.ace_tag {\
color: #fff\
}\
.algo-store-monokai .ace_constant.ace_character,\
.algo-store-monokai .ace_constant.ace_language,\
.algo-store-monokai .ace_constant.ace_numeric,\
.algo-store-monokai .ace_constant.ace_other {\
color: #AE81FF\
}\
.algo-store-monokai .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.algo-store-monokai .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.algo-store-monokai .ace_support.ace_constant,\
.algo-store-monokai .ace_support.ace_function {\
color: #66D9EF\
}\
.algo-store-monokai .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.algo-store-monokai .ace_storage.ace_type,\
.algo-store-monokai .ace_support.ace_class,\
.algo-store-monokai .ace_support.ace_type {\
font-style: italic;\
color: #66D9EF\
}\
.algo-store-monokai .ace_entity.ace_name.ace_function,\
.algo-store-monokai .ace_entity.ace_other,\
.algo-store-monokai .ace_entity.ace_other.ace_attribute-name,\
.algo-store-monokai .ace_variable {\
color: #A6E22E\
}\
.algo-store-monokai .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.algo-store-monokai .ace_string {\
color: #E6DB74\
}\
.algo-store-monokai .ace_comment {\
color: #75715E\
}\
.algo-store-monokai .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}\
.ace_scrollbar-v, .ace_scrollbar-h {\n" +
  "    display: none;\n" +
  "  }";

var dom = require("ace/lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
