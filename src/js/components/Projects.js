import Dom from "../controllers/Dom";
let _state = {
  title: "Project",
  scrollHeight: 4 * window.innerHeight,
};
let _dom = null;

const template = () => `
    <span>Projects</span>
`;

const Projects = {
  init() {
    return `<section id="projects" class="content"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    if (_dom === null) {
      _dom = document.querySelector("#projects");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }

    Dom.print(_dom, template());
    Projects._afterRender();
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

export default Projects;
