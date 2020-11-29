import "../styles/main.scss";
import Book from "./book";
import Spinner from "./spinner";

class App {
  /**
   *
   * @param {number} maxResults
   */
  constructor(maxResults) {
    this.baseUrl = new URL("https://www.googleapis.com/books/v1/volumes");
    this.elements = this.getElements();
    this.maxResults = maxResults || 10;
    this.spinner = new Spinner();
    this.startIndex = 0;
  }
  /**
   *
   * @returns {object}
   */
  getElements() {
    return {
      searchForm: document.getElementById("searchForm"),
      searchInput: document.getElementById("searchInput"),
      content: document.getElementById("content"),
    };
  }

  main() {
    this.elements.searchInput.focus();
    this.elements.searchForm.onsubmit = this.onSubmitHandler;
    this.elements.content.onscroll = this.onScrollHandler;
  }

  /**
   *
   * @param {SubmitEvent} event
   */
  onSubmitHandler = async (event) => {
    event.preventDefault();
    const content = this.elements.content;
    this.value = event.target[0].value;
    if (this.value !== "") {
      content.innerHTML = "";
      content.onscroll = undefined;
      this.toogleSpinner();
      this.startIndex = 0;
      await this.getData();
    }
  };

  /**
   *
   * @param {ScrollEvent} event
   */
  onScrollHandler = async (_event) => {
    const content = this.elements.content;
    if (content.offsetHeight + content.scrollTop + 1 >= content.scrollHeight) {
      content.onscroll = undefined;
      this.toogleSpinner();
      this.startIndex += this.maxResults;
      await this.getData();
    }
  };

  async getData() {
    try {
      this.baseUrl.search = this.getSearchParams();
      const response = await fetch(this.baseUrl);
      if (response.ok) {
        const payload = await response.json();
        this.toogleSpinner();
        if (payload.totalItems > 0) {
          this.insertBooks(payload);
        } else {
          content.insertAdjacentText("beforeend", "No items found!");
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      this.handleFetchingBooksError(err);
    }
  }

  /**
   *
   * @param {any} payload
   */
  insertBooks(payload) {
    if (payload.totalItems - this.startIndex >= 10) {
      this.elements.content.onscroll = this.onScrollHandler;
    }
    if (payload.items) {
      for (const item of payload.items) {
        this.elements.content.insertAdjacentElement(
          "beforeend",
          new Book(
            item.volumeInfo.title,
            item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
            item.volumeInfo.description
          )
        );
      }
    }
  }

  /**
   *
   * @param {Error} error
   */
  handleFetchingBooksError(error) {
    console.error(error);
    this.toogleSpinner();
    this.elements.content.insertAdjacentHTML(
      "beforeend",
      `<span>There was an error: ${error.message}</span>
      <br>
      <span>Please reload the page</span>`
    );
  }

  /**
   *
   * @returns {URLSearchParams}
   */
  getSearchParams() {
    return new URLSearchParams({
      q: `intitle:${this.value}`,
      startIndex: this.startIndex,
      maxResults: this.maxResults,
      projection: "lite",
    });
  }

  toogleSpinner() {
    const content = this.elements.content;
    if (content.contains(this.spinner)) {
      content.removeChild(this.spinner);
    } else {
      content.insertAdjacentElement("beforeend", this.spinner);
    }
  }
}

export default App;
