define("ace/snippets/csharp",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = '## Access Modifiers\n\
snippet po\n\
	protected\n\
snippet pu\n\
	public\n\
snippet pr\n\
	private\n\
##\n\
## Class\n\
snippet cl\n\
	class ${1:Name} {\n\
	}\n\
snippet in\n\
	interface ${1} :${2:Parent} {\n\
	}\n\
snippet tc\n\
	public class ${1} : ${2:TestCase}\n\
##\n\
## Class Enhancements\n\
snippet ext\n\
	: \n\
snippet imp\n\
	:\n\
##\n\
## Comments\n\
snippet /*\n\
	/*\n\
	 * ${1}\n\
	 */\n\
##\n\
## Constants\n\
snippet co\n\
	static public const ${1:String} ${2:var} = ${3};${4}\n\
snippet cos\n\
	static public const String ${1:var} = "${2}";${3}\n\
##\n\
## Control Statements\n\
snippet case\n\
	case ${1}:\n\
		${2}\n\
snippet def\n\
	default:\n\
		${2}\n\
snippet el\n\
	else\n\
snippet elif\n\
	else if (${1}) ${2}\n\
snippet if\n\
	if (${1}) {\n\
	}\n\
snippet sw\n\
	switch (${1}) {\n\
		${2}\n\
	}\n\
##\n\
## Create a Method\n\
snippet m\n\
	${1:void} ${2:method}(${3})${4}\n\
##\n\
## Create a Variable\n\
snippet v\n\
	${1:string} ${2:var}${3: = null}${4};${5}\n\
##\n\
## Enhancements to Methods, variables, classes, etc.\n\
snippet ab\n\
	abstract\n\
snippet co\n\
	const\n\
snippet st\n\
	static\n\
snippet as\n\
	async\n\
##\n\
## Exception Handling\n\
snippet ca\n\
	catch(${1:Exception} ${2:e}) ${3}\n\
snippet thr\n\
	throw\n\
snippet ths\n\
	throws\n\
snippet try\n\
	try {\n\
		${3}\n\
	} catch(${1:Exception} ${2:e}) {\n\
	}\n\
snippet tryf\n\
	try {\n\
		${3}\n\
	} catch(${1:Exception} ${2:e}) {\n\
	} finally {\n\
	}\n\
##\n\
## Loops\n\
snippet enfor\n\
	for (${1} : ${2}) ${3}\n\
snippet for\n\
	for (int ${1}=0; ${1} < ${2}.Length; ${1}++;) {\n\
	}\n\
snippet wh\n\
	while (${1}) ${2}\n\
##\n\
## Main method\n\
snippet main\n\
	public static void Main (string[] args) {\n\
		${1:/* code */}\n\
	}\n\
##\n\
## Terminate Methods or Loops\n\
snippet re\n\
	return\n\
snippet br\n\
	break;\n\
##\n\
## Test Methods\n\
snippet t\n\
	public void test${1:Name}() throws Exception {\n\
		${2}\n\
	}\n\
snippet test\n\
	@Test\n\
	public void test${1:Name}() throws Exception {\n\
		${2}\n\
	}\n\
##\n\
## Methods\n\
snippet meth\n\
  public void ${1}()  {\n\
    throw new NotImplementedException();\n\
  }\n\
snippet vmeth\n\
  public virtual void ${1}()  {\n\
    throw new NotImplementedException();\n\
  }\n\
snippet smeth\n\
  public static void ${1}()  {\n\
    throw new NotImplementedException();\n\
  }\n\
##\n\
';
exports.scope = "csharp";

});
