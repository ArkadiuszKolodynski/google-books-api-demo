class Spinner {
  constructor() {
    return new DOMParser().parseFromString(template, "text/html").body
      .firstChild;
  }
}

const template = `
<div id="spinner" class="my-3 text-center">
    <div
        class="spinner-border"
        style="width: 3rem; height: 3rem;"
        role="status"
    >
    <span class="sr-only">Loading...</span>
    </div>
</div>
`;

export default Spinner;
