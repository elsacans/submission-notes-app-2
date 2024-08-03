class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
        display: block;
        }
        
        div {
        padding: 20px;
        text-align: center;
        }
        `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="text-footer">
        NotesApp Elsa Aprilia Suciaty &copy; 2024
        </div>
        `;
  }
}

customElements.define("footer-bar", FooterBar);
