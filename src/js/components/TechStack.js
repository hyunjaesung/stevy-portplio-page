import Dom from "../controllers/Dom";

let _state = {
  title: "Tech",
  scrollHeight: 4 * window.innerHeight,
};
let _dom = null;

const template = () => `
    <span>TechStack</span>
`;

const TechStack = {
  init() {
    return `<section id="techstack" class="content"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    if (_dom === null) {
      _dom = document.querySelector("#techstack");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }

    Dom.print(_dom, template());
    TechStack._afterRender();
  },
  set state(obj) {
    _state = {
      ...obj,
    };
  },
  get state() {
    return _state;
  },
  _afterRender() {
    _dom.style.height = _state.scrollHeight + "px";
  },
  scrollHandler() {},
};

export default TechStack;
