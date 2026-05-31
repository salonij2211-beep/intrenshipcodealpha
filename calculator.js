const display =
document.getElementById("display");

function appendValue(value)
{
display.value += value;
}

function clearDisplay()
{
display.value = "";
}

function deleteLast()
{
display.value =
display.value.slice(0,-1);
}

function calculate()
{
try{
display.value =
eval(display.value);
}
catch{
display.value = "Error";
}
}

document.addEventListener(
"keydown",
function(e)
{
const key = e.key;

if(
"0123456789+-*/.%".includes(key)
)
{
appendValue(key);
}

if(key==="Enter")
{
calculate();
}

if(key==="Backspace")
{
deleteLast();
}

if(key==="Escape")
{
clearDisplay();
}
});