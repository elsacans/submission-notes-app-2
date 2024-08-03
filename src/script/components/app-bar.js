class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        .app-bar {
        margin: 50px;
        display: flex;
        align-items: center;
        height: 100px;

        gap: 1rem;
        }

        .brand-name {
        font-size: 45px;
        }
        
        .app-bar img {
        width: 75px;
        padding-left: 15px;
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
        <div class= "app-bar">
            <h1 class="brand-name">Notes App</h1>
            <img src="3025547-removebg-preview.png">    
        </div>
        `;
  }
}

customElements.define("app-bar", AppBar);
