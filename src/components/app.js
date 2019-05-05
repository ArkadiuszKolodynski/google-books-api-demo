import "../css/styles.scss";
import "url-polyfill";
import Book from "./book";
import Spinner from "./spinner";

class App {
  /**
   * @param  {int} maxResults
   */
  constructor(maxResults) {
    this.baseUrl = new URL("https://www.googleapis.com/books/v1/volumes");
    this.elements = this.getElements();
    this.maxResults = maxResults || 10;
    this.spinner = new Spinner();
    this.startIndex = 0;
  }

  onScrollHandler = _event => {
    const content = this.elements["content"];
    if (content.offsetHeight + content.scrollTop + 1 >= content.scrollHeight) {
      content.onscroll = undefined;
      this.toogleSpinner();
      this.startIndex += this.maxResults;
      this.getData();
    }
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const content = this.elements["content"];
    this.value = event.target[0].value;
    if (this.value !== "") {
      content.innerHTML = "";
      content.onscroll = undefined;
      this.toogleSpinner();
      this.startIndex = 0;
      this.getData();
    }
  };

  getData() {
    const content = this.elements["content"];
    const url = this.baseUrl;
    url.search = new URLSearchParams(this.getParams());
    fetch(url.href)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        this.toogleSpinner();
        if (json.totalItems > 0) {
          if (json.totalItems - this.startIndex >= 10) {
            content.onscroll = this.onScrollHandler;
          }
          if (json.items) {
            for (const item of json.items) {
              content.insertAdjacentHTML(
                "beforeend",
                new Book(
                  item.volumeInfo.title,
                  item.volumeInfo.imageLinks
                    ? item.volumeInfo.imageLinks.thumbnail
                    : null,
                  item.volumeInfo.description
                ).render()
              );
            }
          }
        } else {
          content.insertAdjacentText("beforeend", "No items found!");
        }
      })
      .catch(err => {
        console.log(err);
        this.toogleSpinner();
        this.content.insertAdjacentHTML(
          "beforeend",
          "<span>There was an error: " +
            err.message +
            "</span><br><span>Please reload the page</span>"
        );
      });
  }

  getElements() {
    return {
      searchForm: document.getElementById("searchForm"),
      searchInput: document.getElementById("searchInput"),
      content: document.getElementById("content")
    };
  }

  getParams() {
    return {
      q: `intitle:${this.value}`,
      startIndex: this.startIndex,
      maxResults: this.maxResults,
      projection: "lite"
    };
  }

  toogleSpinner() {
    const content = this.elements["content"];
    const spinner = this.spinner;
    if (content.contains(spinner)) {
      content.removeChild(spinner);
    } else {
      content.insertAdjacentElement("beforeend", spinner);
    }
  }

  main() {
    this.elements["searchInput"].focus();

    this.elements["searchForm"].onsubmit = this.onSubmitHandler;
    this.elements["content"].onscroll = this.onScrollHandler;
  }
}

export default App;
