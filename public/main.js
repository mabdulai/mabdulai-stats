const stat = (selector, value) => {
  document.querySelector(`[data-stat=${selector}]`).innerHTML = value;
};

const markupBook = ({ name, author }) => `
  <div class="book">
    &ldquo;${name}&rdquo;, ${author}
  </div>
`;

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

fetch("/graphql", {
  method: "POST",
  body: JSON.stringify({ query }),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    if (json.data) {
      // Tweets
      if (typeof json.data.tweets === "number") {
        stat("tweets", json.data.tweets.toLocaleString());
      }
      // Commits
      if (typeof json.data.commits === "number") {
        stat("commits", json.data.commits.toLocaleString());
      }
      // Book
      if (json.data.books) {
        fillBooks(json.data.books);
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });
