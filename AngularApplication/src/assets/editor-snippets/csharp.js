define("ace/snippets/csharp",["require","exports","module"], function(require, exports, module) {
"use strict";
exports.snippetText = 'snippet sim\n' +
  '\tpublic static int Main(string[] args) {\n' +
  '\t\t${1}\n' +
  '\t\treturn 0;\n' +
  '\t} \n' +
  'snippet simc\n' +
  '\tpublic class Application {\n' +
  '\t\tpublic static int Main(string[] args) {\n' +
  '\t\t\t${1}\n' +
  '\t\t\treturn 0;\n' +
  '\t\t}\n' +
  '\t}\n' +
  '# if condition\n' +
  'snippet if\n' +
  '\tif (${1}) {\n' +
  '\t\t${2}\n' +
  '\t} \n' +
  'snippet el\n' +
  '\telse {\n' +
  '\t\t${1}\n' +
  '\t} \n' +
  '# ternary conditional\n' +
  'snippet t\n' +
  '\t${1} ? ${2} : ${3}\n' +
  'snippet ?\n' +
  '\t${1} ? ${2} : ${3}\n' +
  '# do while loop\n' +
  'snippet do\n' +
  '\tdo {\n' +
  '\t\t${2}\n' +
  '\t} while (${1});\n' +
  '# while loop\n' +
  'snippet while\n' +
  '\twhile (${1}) {\n' +
  '\t\t${2}\n' +
  '\t}\n' +
  '# for loop\n' +
  'snippet for\n' +
  '\tfor (int ${1:i} = 0; $1 < ${2:count}; $1${3:++}) {\n' +
  '\t\t${4}\n' +
  '\t}\n' +
  '# foreach\n' +
  'snippet foreach\n' +
  '\tforeach (var ${1:entry} in ${2}) {\n' +
  '\t\t${3}\n' +
  '\t}\n' +
  'snippet each\n' +
  '\tforeach (var ${1:entry} in ${2}) {\n' +
  '\t\t${3}\n' +
  '\t}\n' +
  '# interfaces\n' +
  'snippet interface\n' +
  '\tpublic interface ${1:`Filename()`} {\n' +
  '\t\t${2}\n' +
  '\t}\n' +
  '# class bodies\n' +
  'snippet class\n' +
  '\tpublic class ${1:`Filename()`} {\n' +
  '\t\t${2}\n' +
  '\t}\n' +
  '# constructor\n' +
  'snippet ctor\n' +
  '\tpublic ${1:`Filename()`}() {\n' +
  '\t\t${2}\n' +
  '\t}\n' +
  '# properties - auto properties by default.\n' +
  '# default type is int with layout get / set.\n' +
  'snippet prop\n' +
  '\t${1:public} ${2:int} ${3:} { get; set; }${4}\n' +
  'snippet p\n' +
  '\t${1:public} ${2:int} ${3:} { get; set; }${4}\n' +
  'snippet p+\n' +
  '\tpublic ${1:int} ${2:} { get; set; }${3}\n' +
  'snippet p+&\n' +
  '\tpublic ${1:int} ${2:} { get; internal set; }${3}\n' +
  'snippet p+|\n' +
  '\tpublic ${1:int} ${2:} { get; protected set; }${3}\n' +
  'snippet p+-\n' +
  '\tpublic ${1:int} ${2:} { get; private set; }${3}\n' +
  'snippet p&\n' +
  '\tinternal ${1:int} ${2:} { get; set; }${3}\n' +
  'snippet p&|\n' +
  '\tinternal ${1:int} ${2:} { get; protected set; }${3}\n' +
  'snippet p&-\n' +
  '\tinternal ${1:int} ${2:} { get; private set; }${3}\n' +
  'snippet p|\n' +
  '\tprotected ${1:int} ${2:} { get; set; }${3}\n' +
  'snippet p|-\n' +
  '\tprotected ${1:int} ${2:} { get; private set; }${3}\n' +
  'snippet p-\n' +
  '\tprivate ${1:int} ${2:} { get; set; }${3}\n' +
  '# property - bool\n' +
  'snippet pi\n' +
  '\t${1:public} int ${2:} { get; set; }${3}\n' +
  'snippet pi+\n' +
  '\tpublic int ${1} { get; set; }${2}\n' +
  'snippet pi+&\n' +
  '\tpublic int ${1} { get; internal set; }${2}\n' +
  'snippet pi+|\n' +
  '\tpublic int ${1} { get; protected set; }${2}\n' +
  'snippet pi+-\n' +
  '\tpublic int ${1} { get; private set; }${2}\n' +
  'snippet pi&\n' +
  '\tinternal int ${1} { get; set; }${2}\n' +
  'snippet pi&|\n' +
  '\tinternal int ${1} { get; protected set; }${2}\n' +
  'snippet pi&-\n' +
  '\tinternal int ${1} { get; private set; }${2}\n' +
  'snippet pi|\n' +
  '\tprotected int ${1} { get; set; }${2}\n' +
  'snippet pi|-\n' +
  '\tprotected int ${1} { get; private set; }${2}\n' +
  'snippet pi-\n' +
  '\tprivate int ${1} { get; set; }${2}\n' +
  '# property - bool\n' +
  'snippet pb\n' +
  '\t${1:public} bool ${2:} { get; set; }${3}\n' +
  'snippet pb+\n' +
  '\tpublic bool ${1} { get; set; }${2}\n' +
  'snippet pb+&\n' +
  '\tpublic bool ${1} { get; internal set; }${2}\n' +
  'snippet pb+|\n' +
  '\tpublic bool ${1} { get; protected set; }${2}\n' +
  'snippet pb+-\n' +
  '\tpublic bool ${1} { get; private set; }${2}\n' +
  'snippet pb&\n' +
  '\tinternal bool ${1} { get; set; }${2}\n' +
  'snippet pb&|\n' +
  '\tinternal bool ${1} { get; protected set; }${2}\n' +
  'snippet pb&-\n' +
  '\tinternal bool ${1} { get; private set; }${2}\n' +
  'snippet pb|\n' +
  '\tprotected bool ${1} { get; set; }${2}\n' +
  'snippet pb|-\n' +
  '\tprotected bool ${1} { get; private set; }${2}\n' +
  'snippet pb-\n' +
  '\tprivate bool ${1} { get; set; }${2}\n' +
  '# property - string\n' +
  'snippet ps\n' +
  '\t${1:public} string ${2:} { get; set; }${3}\n' +
  'snippet ps+\n' +
  '\tpublic string ${1} { get; set; }${2}\n' +
  'snippet ps+&\n' +
  '\tpublic string ${1} { get; internal set; }${2}\n' +
  'snippet ps+|\n' +
  '\tpublic string ${1} { get; protected set; }${2}\n' +
  'snippet ps+-\n' +
  '\tpublic string ${1} { get; private set; }${2}\n' +
  'snippet ps&\n' +
  '\tinternal string ${1} { get; set; }${2}\n' +
  'snippet ps&|\n' +
  '\tinternal string ${1} { get; protected set; }${2}\n' +
  'snippet ps&-\n' +
  '\tinternal string ${1} { get; private set; }${2}\n' +
  'snippet ps|\n' +
  '\tprotected string ${1} { get; set; }${2}\n' +
  'snippet ps|-\n' +
  '\tprotected string ${1} { get; private set; }${2}\n' +
  'snippet ps-\n' +
  '\tprivate string ${1} { get; set; }${2}\n' +
  '# members - void\n' +
  'snippet m\n' +
  '\t${1:public} ${2:void} ${3:}(${4:}) {\n' +
  '\t\t${5:}\n' +
  '\t}\n' +
  'snippet m+\n' +
  '\tpublic ${1:void} ${2:}(${3:}) {\n' +
  '\t\t${4:}\n' +
  '\t}\n' +
  'snippet m&\n' +
  '\tinternal ${1:void} ${2:}(${3:}) {\n' +
  '\t\t${4:}\n' +
  '\t}\n' +
  'snippet m|\n' +
  '\tprotected ${1:void} ${2:}(${3:}) {\n' +
  '\t\t${4:}\n' +
  '\t}\n' +
  'snippet m-\n' +
  '\tprivate ${1:void} ${2:}(${3:}) {\n' +
  '\t\t${4:}\n' +
  '\t}\n' +
  '# members - int\n' +
  'snippet mi\n' +
  '\t${1:public} int ${2:}(${3:}) {\n' +
  '\t\t${4:return 0;}\n' +
  '\t}\n' +
  'snippet mi+\n' +
  '\tpublic int ${1:}(${2:}) {\n' +
  '\t\t${3:return 0;}\n' +
  '\t}\n' +
  'snippet mi&\n' +
  '\tinternal int ${1:}(${2:}) {\n' +
  '\t\t${3:return 0;}\n' +
  '\t}\n' +
  'snippet mi|\n' +
  '\tprotected int ${1:}(${2:}) {\n' +
  '\t\t${3:return 0;}\n' +
  '\t}\n' +
  'snippet mi-\n' +
  '\tprivate int ${1:}(${2:}) {\n' +
  '\t\t${3:return 0;}\n' +
  '\t}\n' +
  '# members - bool\n' +
  'snippet mb\n' +
  '\t${1:public} bool ${2:}(${3:}) {\n' +
  '\t\t${4:return false;}\n' +
  '\t}\n' +
  'snippet mb+\n' +
  '\tpublic bool ${1:}(${2:}) {\n' +
  '\t\t${3:return false;}\n' +
  '\t}\n' +
  'snippet mb&\n' +
  '\tinternal bool ${1:}(${2:}) {\n' +
  '\t\t${3:return false;}\n' +
  '\t}\n' +
  'snippet mb|\n' +
  '\tprotected bool ${1:}(${2:}) {\n' +
  '\t\t${3:return false;}\n' +
  '\t}\n' +
  'snippet mb-\n' +
  '\tprivate bool ${1:}(${2:}) {\n' +
  '\t\t${3:return false;}\n' +
  '\t}\n' +
  '# members - string\n' +
  'snippet ms\n' +
  '\t${1:public} string ${2:}(${3:}) {\n' +
  '\t\t${4:return "";}\n' +
  '\t}\n' +
  'snippet ms+\n' +
  '\tpublic string ${1:}(${2:}) {\n' +
  '\t\t${3:return "";}\n' +
  '\t}\n' +
  'snippet ms&\n' +
  '\tinternal string ${1:}(${2:}) {\n' +
  '\t\t${3:return "";}\n' +
  '\t}\n' +
  'snippet ms|\n' +
  '\tprotected string ${1:}(${2:}) {\n' +
  '\t\t${3:return "";}\n' +
  '\t}\n' +
  'snippet ms-\n' +
  '\tprivate string ${1:}(${2:}) {\n' +
  '\t\t${3:return "";}\n' +
  '\t}\n' +
  '# structure\n' +
  'snippet struct\n' +
  '\tpublic struct ${1:`Filename()`} {\n' +
  '\t\t${2}\n' +
  '\t}\n' +
  '# enumeration\n' +
  'snippet enum\n' +
  '\tpublic enum ${1} {\n' +
  '\t\t${2}\n' +
  '\t}\n' +
  '# preprocessor directives\n' +
  'snippet #if\n' +
  '\t#if\n' +
  '\t\t${1}\n' +
  '\t#endif\n' +
  '# inline xml documentation\n' +
  'snippet ///\n' +
  '\t/// <summary>\n' +
  '\t/// ${1}\n' +
  '\t/// </summary>\n' +
  'snippet <p\n' +
  '\t<param name="${1}">${2:$1}</param>${3}\n' +
  'snippet <ex\n' +
  '\t<exception cref="${1:System.Exception}">${2}</exception>${3}\n' +
  'snippet <r\n' +
  '\t<returns>${1}</returns>{${2}\n' +
  'snippet <s\n' +
  '\t<see cref="${1}"/>${2}\n' +
  'snippet <rem\n' +
  '\t<remarks>${1}</remarks>${2}\n' +
  'snippet <c\n' +
  '\t<code>${1}</code>${2}';
exports.scope = "csharp";

});
