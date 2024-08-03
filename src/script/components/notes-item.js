class NotesItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = {
    id: "NEED_ID",
    title: "NEED_TITLE",
    body: "NEED_BODY",
    createdAt: "NEED_CREATED_AT",
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  set notes(value) {
    this._notes = value;

    this.render();
  }

  get notes() {
    return this._notes;
  }

  _updateStyle() {
    this._style.textContent = `
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

        .container {
        margin: 50px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 1fr);
        gap: 50px;
        }

        .wrapper {
        display: grid;
        gap: 1rem;
        }
  
        .wrapper li {
        height: 250px;
        list-style: none;
        background: #FFF8DB;
        border-radius: 5px;
        padding: 15px 20px 20px;
        } 

        .add-box, .icon, .bottom-content, .settings .menu li, .popup, header {
        display: flex;
        align-items: center;
 
        justify-content: space-between;
        }

        .add-box {
        flex-direction: row;
        justify-content: space-around;
        cursor: pointer;
        }

        .add-box .icon {
            height: 100px;
            width: 100px;

            color: #7D8ABC;
            font-size: 40px;
            border-radius: 50%;
            border: 2px dashed #7D8ABC;
        }
        .icon {
            display: flex;
            justify-content: center;
        }

        .add-box .icon img {
            size: 100px;
        }

        .add-box p {
            color: #7D8ABC;
            font-weight: 500;
            margin-top: 20px;
            font-size: 24px;
        }
            
        .wrapper .note {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        }

        .note p {
        font-size: 22px;
        font-weight: 500;
        font-style:normal;
        }

        .note span {
        display: block;
        margin-top: 10px;
        color: #304463;
        font-size: 14px;
        font-style: italic;
        }

        .note .bottom-content {
        padding-left: 10px;;
        border-top: 1px solid #cccc;
        }

        .bottom-content span {
        color: #304463;
        font-size: 14px;
        }

        .bottom-content .settings i {
        color: #304463;
        font-size: 14px;
        cursor: pointer;
        }

        .settings {
        position: relative;
        }

        .settings .menu {
        position: absolute;
        bottom: 0;
        right: -5px;
        padding: 5px 0;
        
        border-radius: 4px;
        transform: scale(0);
        transform-origin: bottom right;
        box-shadow: 0 0 6px rgba(0,0,0,0.15);
        transition: transform 0.2s ease;
        background: #FFC7ED;
        }
        
        .settings.show .menu {
        transform: scale(1);
        }
        
        .settings .menu li {
        height: 25px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 0;
        padding: 17px 15px;
        justify-content: flex-start;
        background: #FFC7ED;
        }

        .menu li:hover {
        background: rgb(255, 171, 171);
        }

        .menu li i {
        padding-right: 5px;
        }
        `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="container">
            <div class="wrapper">
                <li class="add-box">
                    <div class="icon">
                        <i class="bi bi-file-earmark-plus"></i>
                    </div>
                    <p> Add new note</p>
                </li>
            </div>
        </div>`;
  }
}

customElements.define("notes-item", NotesItem);
