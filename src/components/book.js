import * as img from "../images/no-cover.jpg";

class Book {
  /**
   *
   * @param  {string} title
   * @param  {string} src
   * @param  {string} desc
   * @param  {number} descMaxLength
   * @returns {HTMLElement}
   */
  constructor(title, src, desc, descMaxLength) {
    this.title = title || "No title";
    this.src = this.replaceHttpWithHttps(src) || img;
    this.desc = desc || "This book has no description yet";
    this.descMaxLength = descMaxLength || 15;

    return document.createRange().createContextualFragment(
      `<div class="card mb-4 mx-auto">
         <img class="mx-auto w-50" src="${this.src}" alt="${this.title}">
         <div class="card-body">
          <h4 class="card-title">${this.title}</h4>
          <p class="card-text text-muted">${this.shortenDesc(this.desc)}</p>
         </div>
       </div>`
    ).firstChild;
  }

  /**
   *
   * @param {string} src
   * @returns {string}
   */
  replaceHttpWithHttps(src) {
    if (src && !src.startsWith("https")) {
      src = "https" + src.substr(4);
    }
    return src;
  }

  /**
   *
   * @param  {string} description
   */
  shortenDesc(description) {
    let desc = description.split(" ");
    if (desc.length > this.descMaxLength) {
      desc = desc.slice(0, this.descMaxLength);
      desc[this.descMaxLength - 1] += "...";
    }
    return desc.join(" ");
  }
}

export default Book;
