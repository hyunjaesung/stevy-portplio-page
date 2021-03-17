import Dom from "../controllers/Dom";

let _state = {};
let _dom = null;

const template = () => `
    <span>Header</span>
`;

const Header = {
  init() {
    return `<section id="header" class="nav"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    console.log("header");
    if (_dom === null) {
      _dom = document.querySelector("#header");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }
    Dom.print(_dom, template());
  },
  IOHandler() {},
};

export default Header;
