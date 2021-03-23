const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading

function loading() {}
{
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new Quotes
function newQuotes() {
  loading();
  //Pick a random quote from apiquotes query
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;

  // Check if author field is blank replace it with unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // After setting quote hidden
  complete();
}

// Get Quotes from Api
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    //Catch Error here
  }
}

//Tweet Code
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuotes);

// on load
getQuotes();
