// This script processes the idiom list given in index.html
// into flat text that can be understood by the fortune tool.

// To see the output, open index.html in a web browser, press F12
// to show the inspector tools, and check the console logs.

function replaceBodyContentWithFormattedQuotes() {
    body = document.getElementsByTagName("body")[0];
    if (!body) { return; }

    pre = document.createElement("pre");
    pre.innerText = formatQuotes(extractQuotes());
    console.log(pre.innerText);

    body.innerHTML = "";
    body.appendChild(pre);
}

// In general, each idiom is associated with an <ul><li> element on the page.
// Iterate through the children of the body element and generate an array
// of dictionaries, one for each idiom. Each dictionary has keys `text`
// (the idiom itself) and `explanation` (the meaning of the idiom; may
// be undefined).
function extractQuotes() {
    body = document.getElementsByTagName("body")[0];

    quotes = [];

    // For each immediate child of the of body element
    Array.from(body.children)
        .map(
            element => {
                switch (element.tagName) {
                    // If this is a <ul> element, then create new idiom dictionaries
                    // for each of the children.
                    case ("UL"):
                        Array.from(element.children)
                            .map(
                                child =>
                                    quotes.push(processQuoteText(child.innerText))
                            );
                        break;
                    // If this is a <dl> element, then it comprises the explanation
                    // for the previous quote, so augment the end of the `quotes` array
                    // accordingly.
                    case ("DL"):
                        Array.from(element.children)
                            .map(
                                child =>
                                    augmentExplanation(quotes[quotes.length - 1], child.innerText)
                            );
                        break;
                    default:
                        console.warn("I was not prepared for a tag named", element.tagName);
                        break;
                }
            }
        );

    return quotes;
}

// Process one of the <li> elements. Some quotes have just the quote text
// in a <ul><li> element, and the explanation in a subsequent <dl><dd> element. 
// Others have "text: explanation" embedded inside an <li> element.
// This function handles both cases.
function processQuoteText(innerText) {
    split = innerText.split(":");
    if (
        (split.length > 1) &&
        // Some of the idioms have a trailing colon but *no* explanation
        (split[1].trim().length > 0)
    ) {
        return {
            text: split[0].trim(),
            explanation: endWithPeriod(split[1].trim())
        };
    } else {
        return {
            text: endWithPeriod(innerText.trim())
        }
    }
}

// Take a an idiom dictionary and augment it with its explanation.
// This is for the idioms that have the explanation in a <dl><dd> element.
function augmentExplanation(quote, newExplanation) {
    // Some of the idioms have a <dl><dd> element but it is empty
    if (newExplanation.trim().length < 1) { return; }
    newExplanation = endWithPeriod(newExplanation.trim());
    if (quote.explanation) {
        quote.explanation = quote.explanation + `\n` + newExplanation;
    } else {
        quote.explanation = newExplanation
    }
}

// Appends a period to the end of the string if it doesn't have one already
// Some of the explanations are missing a period
function endWithPeriod(str) {
    return str.substr(-1) == "." ? str : str + ".";
}

// Print the array of idioms as flat text for fortune.
function formatQuotes(quotes) {
    return quotes
        .filter(q => q.explanation)
        .map(q => `“${q.text}”\n    ${q.explanation}\n%\n`)
        .join("");
}
