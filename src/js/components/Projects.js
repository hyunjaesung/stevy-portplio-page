import Dom from "../controllers/Dom";
import { SECTION_HEIGHT_PRESET } from "../constants";
import macImage from "../../images/macintoshi.png";
import setScrollAnimate from "../utils/setScrollAnimate";

let _state = {
  title: "Project",
  scrollHeight: SECTION_HEIGHT_PRESET[2] * window.innerHeight,
  animate: [
    {
      query: ".projects_container",
      start: 0.1,
      finish: 0.85,
      info: [
        {
          trigger: [0.1, 0.2],
          property: "opacity",
          value: [0, 1],
        },
        {
          trigger: [0.2, 0.7],
          property: "opacity",
          value: [1, 1],
        },
        {
          trigger: [0.7, 0.9],
          property: "opacity",
          value: [1, 0],
        },
      ],
    },
  ],
  curViewIdx: 0,
  views: [
    {
      title: "리액트로 영화앱 만들기",
      summary: "리액트를 이용해서 영화앱을 만든 프로젝트",
      techStack: ["react"],
      level: "side",
      description: "리액트를 이용해서 영화앱을 만든 프로젝트",
      result: "리액트를 이용해서 영화앱을 만든 프로젝트",
      period: "3개월",
    },
    {
      title: "NodeJS로 영화앱 만들기",
      summary: "NodeJS로 영화앱 만든 프로젝트",
      techStack: ["react", "nodejs"],
      level: "enter",
      description: "NodeJS로 영화앱 만든 프로젝트 설명",
      result: "NodeJS로 영화앱 만든 프로젝트 결과",
      period: "3개월",
    },
    {
      title: "NestJS로 영화앱 만든 프로젝트",
      summary: "NestJS로 영화앱 만든 프로젝트, NestJS로 영화앱 만든 프로젝트",
      techStack: ["react"],
      level: "enter",
      description: "NestJS로 영화앱 만든 프로젝트의 설명",
      result: "NestJS로 영화앱 만든 프로젝트의 결과",
      period: "3개월",
    },
  ],
};
let _dom = null;

const monitorContentsTemplate = ({ title, summary, techStack, period }) => `
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
    <div class="projects_container" style="display:none;">
      <div class="mac_container" >
        <p style="font-size:2.5rem;font-weight:bold;color:gray;">
          제가 진행한 소중한 <strong>프로젝트</strong>들입니다
        </p>
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

const triggerSectionScrollAnimate = (sectionScrollRatio) => {
  setScrollAnimate(_dom, _state.animate, sectionScrollRatio);
};

const arrowEventHandler = (event) => {
  if (event.target.classList.contains("arrow")) {
    if (event.target.classList.contains("arrow-left")) {
      if (_state.curViewIdx > 0) {
        _state.curViewIdx = _state.curViewIdx - 1;
      } else {
        _state.curViewIdx = _state.views.length - 1;
      }
    } else if (event.target.classList.contains("arrow-right")) {
      if (_state.curViewIdx === _state.views.length - 1) {
        _state.curViewIdx = 0;
      } else {
        _state.curViewIdx = _state.curViewIdx + 1;
      }
    }

    const container = _dom.querySelector(".mac_contents_container");
    container.innerHTML = monitorContentsTemplate(
      _state.views[_state.curViewIdx]
    );
  }
};

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
    _dom
      .querySelector(".mac_arrow_container")
      .addEventListener("click", arrowEventHandler);
  },
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);
    });
  },
};

export default Projects;
