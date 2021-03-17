import Dom from "../controllers/Dom";

let _state = {};
let _dom = null;

const template = () => `
    <span>Introduction</span>
`;

const Introduction = {
  init() {
    return `<section id="introduction" class="content"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    if (_dom === null) {
      _dom = document.querySelector("#introduction");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }

    Dom.print(_dom, template());
  },
  IOHandler() {},
};

export default Introduction;
