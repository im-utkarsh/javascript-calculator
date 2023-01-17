# 🖩 JavaScript Calculator
Simple calculator created using javascript.  
<font size=6>[Live Demo](https://im-utkarsh.github.io/javascript-calculator/)</font>

## 💻Code
The main working includes first converting a input expression to executable format i.e handling braces. Its done using regex:
``` javascript
expression = expression.replace(/(?<!^)(?<!\*)(?<!\()\(/gm, "*(");
expression = expression.replace(/\)(?!\*)(?!\))(?<!$)/gm, ")*");
```
First regex checks for all '**(**' which are not at start position and not following a '(' and converts them to '**\*(**'. Similarly, second regex checks for all '**)**' which are not at end position and are not ahed of ')' and converts them to '**\*)**'.  
This way expression is converted to a valid expression.  
Finally this line of code is used to execute the final expression:
```javascript
// better to use eval(expression) here, since this introduces some serious security issues.
Function(`return (${expression})`)();
```
This is an anonymous function, we are just executing the argument (i.e the function body). This snippet will execute any javascript code sent as text in expression and hence introduces security issues.

## 📚References
Original Idea: https://harsh98trivedi.github.io/Simple-JavaScript-Calculator/