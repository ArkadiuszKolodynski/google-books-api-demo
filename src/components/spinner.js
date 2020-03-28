class Spinner {
  constructor() {
    return document.createRange().createContextualFragment(
      ` <div id="spinner" class="my-3 text-center">
          <div
            class="spinner-border"
            style="width: 3rem; height: 3rem;"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>`.trim()
    ).firstElementChild;
  }
}

export default Spinner;
