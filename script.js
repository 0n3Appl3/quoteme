var quoteParam = "quote";
var personParam = "person";
var o;

// Different background colours.
var colours = ["#85FFC7", "#F9E383", "#F8A692", "#77B5FB", "#ADBBFF", "#ADF092", "#DDDCEB"];
// Special characters that are used to be decoded.
var chars = ["%20", "%3C", "%3E", "%27", "%22"];
var charsFixed = [" ", "&lt;", "&gt;", "&apos;", "&quot;"];

// Display quote and paste most recent quote entry in text boxes.
window.onload = function() {
    o = new Object();
    saveInput();
    displayQuote();
}

// Add the user entry to the website URL and refresh page.
function submitInput() {
    var location = window.location + "";
    var locParams = "";

    var quote = document.getElementById(quoteParam);
    var person = document.getElementById(personParam);

    // Remove previous user entry.
    if (location.indexOf("?") != -1) {
        location = location.slice(0, location.indexOf("?"));
    }
    // Update user entry to the website URL.
    locParams = location + "?" + quoteParam + "=" + quote.value + "&" + personParam + "=" + person.value;
    window.location.href = locParams;
}

// Save the user entry to the associative array and display on the text boxes.
function saveInput() {
    var loc = window.location + "";
    var parameters = loc.substring(loc.indexOf("?") + 1);
    const parametersArray = parameters.split("&"); // Split different entries into the array.
    var parameterValues = [];

    var quote = document.getElementById(quoteParam);
    var person = document.getElementById(personParam);

    for (var i = 0; i < parametersArray.length; i++) {
        var index = parametersArray[i];
        // Fix missing characters from the URL.
        for (var j = 0; j < chars.length; j++) {
            index = index.replaceAll(chars[j], charsFixed[j]);
        }
        // Add cleaned data into the array.
        parameterValues.push(index.substring(index.indexOf("=") + 1));
    }
    // Add to the associative array.
    o[quoteParam] = parameterValues[0];
    o[personParam] = parameterValues[1];   
    // Add entry to the text boxes.
    quote.value = decodeSymbols(parameterValues[0]);
    person.value = decodeSymbols(parameterValues[1]);
}

// Display quote information on the quote preview.
function displayQuote() {
    var background = document.getElementById("canvas");
    var quoteText = document.getElementById(quoteParam + "Text");
    var personText = document.getElementById(personParam + "Text");
    // Pick a random background colour.
    var colourIndex = Math.floor(Math.random() * colours.length);

    // Update the quote preview.
    canvas.style.backgroundColor = colours[colourIndex];
    quoteText.innerHTML = o[quoteParam];
    personText.innerHTML = o[personParam];
}

// Download the quote as an image to the computer.
function download() {
    html2canvas(document.getElementById("canvas")).then(canvas => {
        downloadURI(canvas.toDataURL(), "quote.png");
    });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}

// Decode HTML symbols.
function decodeSymbols(text) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}