const stat = (selector, value) => {
  document.querySelector(`[data-stat=${selector}]`).innerHTML = value;
};

const fillBooks = (books) => {
  const container = document.querySelector("[data-books-container]");
  container.innerHTML = "";

  books.forEach((book) => {
    const html = markupBook(book);
    const template = document.createElement("template");
    template.innerHTML = html;
    container.appendChild(template.content.firstElementChild);
  });
};

const query = `
  query LocalQuery {
    tweets
  }`;

fetch("https://mabdulai-stats-m08q7p17w.vercel.app/", {
  method: "POST",
  body: JSON.stringify({ query }),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json.data);
    if (json.data) {
      // Tweets
      if (typeof json.data.tweets === "number") {
        stat("tweets", json.data.tweets.toLocaleString());
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });
