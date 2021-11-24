let quoteParam = "quote";
let personParam = "person";
let o;

// Different background colours.
let colours = ["#85FFC7", "#F9E383", "#F8A692", "#77B5FB", "#ADBBFF", "#ADF092", "#DDDCEB"];

// Display quote and paste most recent quote entry in text boxes.
window.onload = function() {
    let location = window.location + "";
    o = new Object();

    // Display preview if there is user entry.
    if (location.indexOf("?") != -1) {
        saveInput();
        displayQuote();   
    }
}

// Add the user entry to the website URL and refresh page.
function submitInput() {
    let location = window.location + "";
    let locParams = "";

    let quote = document.getElementById(quoteParam);
    let person = document.getElementById(personParam);

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
    let loc = window.location + "";
    let parameters = loc.substring(loc.indexOf("?") + 1);
    const parametersArray = parameters.split("&"); // Split different entries into the array.
    let parameterValues = [];

    let quote = document.getElementById(quoteParam);
    let person = document.getElementById(personParam);

    for (let i = 0; i < parametersArray.length; i++) {
        let index = parametersArray[i];
        // Fix missing characters from the URL.
        index = decodeURI(index);
        // Add cleaned data into the array.
        parameterValues.push(index.substring(index.indexOf("=") + 1));
    }
    // Add to the associative array.
    o[quoteParam] = parameterValues[0];
    o[personParam] = parameterValues[1];   
    // Add entry to the text boxes.
    quote.value = parameterValues[0];
    person.value = parameterValues[1];
}

// Display quote information on the quote preview.
function displayQuote() {
    let background = document.getElementById("canvas");
    let quoteText = document.getElementById(quoteParam + "Text");
    let personText = document.getElementById(personParam + "Text");
    // Pick a random background colour.
    let colourIndex = Math.floor(Math.random() * colours.length);

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
    let link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}