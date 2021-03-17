import Dom from "../controllers/Dom";

let _state = {
  title: "Contact",
  scrollHeight: 4 * window.innerHeight,
};
let _dom = null;

const template = () => `
    <span>Contact</span>
`;

const Contact = {
  init() {
    return `<section id="contact" class="content"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    if (_dom === null) {
      _dom = document.querySelector("#contact");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }

    Dom.print(_dom, template());
    Contact._afterRender();
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
  IOHandler() {},
};

export default Contact;
