import Dom from "../controllers/Dom";
import { SECTION_HEIGHT_PRESET } from "../constants";
import macImage from "../../images/macintoshi.png";

let _state = {
  title: "Project",
  scrollHeight: SECTION_HEIGHT_PRESET[2] * window.innerHeight,
  views: [
    {
      title: "test45345545455",
      summary:
        "sdfdfdfdsfdffdsdsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfdfdfdfdsf",
      techStack: ["react"],
      level: "enter",
      description:
        "sdfdfdfdsfdfdfdsfdfdfdsfsddsfdfdfsfsfdfdfdsfsddsfdfdfsfsfsddsfdfdfsfdff",
      result: "sdfdfdfddf",
    },
    {
      title: "test45345545455",
      summary:
        "sdfdfdfdsfdffdsdsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfdfdfdfdsf",
      techStack: ["react"],
      level: "enter",
      description:
        "sdfdfdfdsfdfdfdsfdfdfdsfsddsfdfdfsfsfdfdfdsfsddsfdfdfsfsfsddsfdfdfsfdff",
      result: "sdfdfdfddf",
    },
    {
      title: "test45345545455",
      summary:
        "sdfdfdfdsfdffdsdsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfdfdfdfdsf",
      techStack: ["react"],
      level: "enter",
      description:
        "sdfdfdfdsfdfdfdsfdfdfdsfsddsfdfdfsfsfdfdfdsfsddsfdfdfsfsfsddsfdfdfsfdff",
      result: "sdfdfdfddf",
    },
    {
      title: "test45345545455",
      summary:
        "sdfdfdfdsfdffdsdsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfddsfdffdsfdfdfdfdfdsf",
      techStack: ["react"],
      level: "enter",
      description:
        "sdfdfdfdsfdfdfdsfdfdfdsfsddsfdfdfsfsfdfdfdsfsddsfdfdfsfsfsddsfdfdfsfdff",
      result: "sdfdfdfddf",
    },
  ],
};
let _dom = null;

const monitorContentsTemplate = ({ title, summary }) => `
<div class="mac_content">
  <div class="title">
    <div class="line_container" style="margin-right:20px;">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <span>${title}</span>
    <div class="line_container" style="margin-left:20px;">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
  <div class="summary">
      <div>
        <div class="summary_title">${title}</div>
        <div class="summary_content">
          <p>
          ${summary}
          </p>
        </div>
      </div>
  </div>
</div>
`;

const template = ({ views }) => `
    <div class="projects_container">
      <div class="mac_container">
        <img class="mac_img">
        <div class="mac_monitor_container">
          <div class="mac_contents_container">
            ${monitorContentsTemplate(views[0])}
          </div>
          <div class="mac_arrow_container">
            <button class="mac_monitor_arrow_left">
              <span class="arrow arrow-left"></span>
            </button>
            <button class="mac_monitor_arrow_right">
              <span class="arrow arrow-right"></span>
            </button>
          </div>
          <button class="mac_monitor_search">
            <i class="fas fa-search 5x"></i>
          </button>
        </div>
      </div>
    </div>
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

    Dom.print(_dom, template(_state));
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
    _dom.querySelector(".mac_img").src = macImage;
  },
  scrollHandler() {},
};

export default Projects;
