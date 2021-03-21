import Dom from "../../../js/controllers/Dom";
import { SECTION_HEIGHT_PRESET } from "../../../js/constants";
import macImage from "../../../images/macintoshi.png";
import testSrc from "../../../images/test.png";
import setScrollAnimate from "../../../js/utils/setScrollAnimate";
import {
  template,
  monitorContentsTemplate,
  infoContentsTemplate,
} from "./templates";
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
      imgSrc: macImage,
      thumbnailSrc: testSrc,
      summary: "리액트를 이용해서 영화앱을 만든 프로젝트",
      techStack: ["react", "redux", "typescript", "webpack"],
      level: "side",
      description:
        "<strong>리액트</strong>를 이용해서 <strong>영화앱</strong>을 만든 프로젝트리액트를 이용해서만든 프로젝트리액트를 이용해서만든 프로젝트리액트만든 프로젝트리액트를 이용해서만든 프로젝트리액트를 이용해서만든 프로젝트리액트를 이용해서만든 프로젝트리액트를 이용해서를 이용해서만든 프로젝트리액트를 이용해서만든 프로젝트리액트를 이용해서만든 프로젝트리액트를 이용해서 영화앱을 만든 프로젝트리액트를 이용해서 영화앱을 만든 프로젝트리액트를 이용해서 영화앱을 만든 프로젝트리액트를 이용해서 영화앱을 만든 프로젝트",
      period: "20.01.30 - 20.02.24",
      link: "https://www.naver.com",
      github: "https://www.github.com/hyunjaesung",
    },
    {
      title: "NodeJS로 영화앱 만들기",
      summary: "NodeJS로 영화앱 만든 프로젝트",
      imgSrc: testSrc,
      thumbnailSrc: testSrc,
      techStack: ["react", "nodejs"],
      level: "enter",
      description: "NodeJS로 영화앱 만든 프로젝트 설명",
      period: "3개월",
      link: "",
      github: "",
    },
    {
      title: "NestJS로 영화앱 만든 프로젝트",
      summary: "NestJS로 영화앱 만든 프로젝트, NestJS로 영화앱 만든 프로젝트",
      imgSrc: testSrc,
      thumbnailSrc: testSrc,
      techStack: ["react", "redux", "typescript", "webpack"],
      level: "enter",
      description: "NestJS로 영화앱 만든 프로젝트의 설명",
      period: "3개월",
      link: "",
      github: "",
    },
  ],
};
let _dom = null;

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

    const macContainer = _dom.querySelector(".mac_contents_container");
    macContainer.innerHTML = monitorContentsTemplate(
      _state.views[_state.curViewIdx]
    );
    const infoContainer = _dom.querySelector(".info_container");
    infoContainer.innerHTML = infoContentsTemplate(
      _state.views[_state.curViewIdx]
    );
  }
};

const modalOpenHandler = ({}) => {
  const infoContainer = _dom.querySelector(".info_container");
  infoContainer.innerHTML = infoContentsTemplate(
    _state.views[_state.curViewIdx]
  );
  _dom.querySelector(".project_info_container").style.visibility = "visible";
  _dom.querySelector(".project_info_container").style.opacity = 1;

  document.body.style.overflow = "hidden";
};
const modalCloseHandler = ({}) => {
  _dom.querySelector(".project_info_container").style.visibility = "hidden";
  _dom.querySelector(".project_info_container").style.opacity = 0;
  document.body.style.overflow = "visible";
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
      .querySelector(".info_arrow_container")
      .addEventListener("click", arrowEventHandler);
    _dom
      .querySelector(".mac_arrow_container")
      .addEventListener("click", arrowEventHandler);

    _dom
      .querySelector(".mac_monitor_search")
      .addEventListener("click", modalOpenHandler);
    _dom.querySelector(".cover").addEventListener("click", modalCloseHandler);
  },
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);
    });
  },
};

export default Projects;
