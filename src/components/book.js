import * as img from "../images/no-cover.jpg";

class Book {
  /**
   * @param  {string} title
   * @param  {string} src
   * @param  {string} desc
   */
  constructor(title, src, desc) {
    this.title = title || "No title";
    this.src = src || img;
    this.desc = desc || "This book has no description yet";

    this.descLength = 15;
  }
  /**
   * @param  {string} description
   */
  shortenDesc(description) {
    let desc = description.split(" ");
    if (desc.length > this.descLength) {
      desc = desc.slice(0, this.descLength);
      desc.push("...");
    }
    return desc.join(" ");
  }

  render() {
    const title = this.title;
    const src = this.src;
    const desc = this.shortenDesc(this.desc);

    return `
      <div class="card mb-4 mx-auto">
        <img class="card-img-top mx-auto" src="${src}" alt="${title}">
        <div class="card-body">
          <h4 class="card-title">${title}</h4>
          <p class="card-text text-muted">${desc}</p>
        </div>
      </div>
      `;
  }
}

export default Book;
