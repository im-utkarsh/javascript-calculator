const noChangeBtns = document.querySelectorAll(".input .no-change");
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const multiply = document.querySelector(".multiply");
const equal = document.querySelector(".equal");

noChangeBtns.forEach((ele) => {
    ele.addEventListener("click", (e) => addNoChangeVal(e.target.innerHTML));
});

clear.addEventListener("click", () => (display.innerHTML = "&nbsp;"));
multiply.addEventListener("click", () => addNoChangeVal("*"));
equal.addEventListener("click", compute);

document.addEventListener("keydown", (e) => {
    if (
        (e.key >= "0" && e.key <= "9") ||
        e.key == "(" ||
        e.key == ")" ||
        e.key == "*" ||
        e.key == "-" ||
        e.key == "+" ||
        e.key == "%" ||
        e.key == "/" ||
        e.key == "."
    )
        addNoChangeVal(e.key);
    else if (e.key == "Backspace") {
        if (display.innerHTML.length == 1) {
            display.innerHTML = "&nbsp;";
        } else
            display.innerHTML = display.innerHTML.substring(
                0,
                display.innerHTML.length - 1
            );
    } else if (e.key == "X" || e.key == "x") addNoChangeVal("*");
    else if (e.key == "Escape" || e.key == "Delete")
        display.innerHTML = "&nbsp;";
    else if (e.key == "Enter") compute();
    console.log(e.key);
});

function compute() {
    let expression = display.innerHTML;
    if (expression == "&nbsp;") return;
    try {
        if (expression.includes("(") || expression.includes(")"))
            expression = handleBraces(expression);
        display.innerHTML = Function(`return (${expression})`)();
        // display.innerHTML = eval(expression);    // use this instead
    } catch (error) {
        console.log(error);
        alert("Invalid Expression...");
        display.innerHTML = "&nbsp;";
    }
}

function addNoChangeVal(val) {
    if (display.innerHTML == "&nbsp;") display.innerHTML = val;
    else display.innerHTML += val;
}

function handleBraces(expression) {
    expression = expression.replace(/(?<!^)(?<!\*)(?<!\()\(/gm, "*(");
    expression = expression.replace(/\)(?!\*)(?!\))(?<!$)/gm, ")*");
    console.log(expression);
    return expression;
}
