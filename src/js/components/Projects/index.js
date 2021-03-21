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
      title: "내 집 마련",
      imgSrc:
        "https://t1.daumcdn.net/liveboard/BoiledMovie/a42e4c64887946df8769cf9f69aabf11.JPG",
      thumbnailSrc:
        "https://lh3.googleusercontent.com/proxy/i9TNPJvO-wxVoQjWCN7f20lDiHB6JLQXYCL_nsp6ADqd9D40f-CcjmjOvMgI6JUCVCiQChHjMY7fXOvXDhjAAIO2aKRAt48AlDxcaal7UTWqJux4VqmQ9bzJhxlwYApcZw",
      summary: "나도 내 집 마련 하겠습니다!!",
      techStack: ["투자로 돈 불리기", "꼬박 꼬박 돈 모으기"],
      level: "side",
      description: "저와 제 가족들이 살 집을 짓고 싶습니다 행복하겠죠?",
      period: "20.01.30 - 20.02.24",
      // link: "https://www.tmon.com",
      // github: "https://www.github.com/hyunjaesung",
    },
    {
      title: "섹시 바디",
      summary: "체지방 10% 가즈아",
      imgSrc:
        "https://blog.kakaocdn.net/dn/btZo2C/btqBHUYaiLS/w4Rig8tVatvRrBrd8LvQbK/img.png",
      thumbnailSrc:
        "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F24395936595DFC4B1EC19C",
      techStack: ["피트니스", "다이어트"],
      level: "enter",
      description: "올해 목표는 턱걸이 20개, 체지방 15% 입니다 잊지마시오",
      period: "3개월",
      link: "",
      github: "",
    },
    {
      title: "남미 여행",
      summary: "더 늦기 전에 남미 일주 가즈아",
      imgSrc:
        "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/UiB/image/lmHJfX7QkcetR8er5rfRT_ba-t0.JPG",
      thumbnailSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1u1m9HV3jmLtB60Co64ynBd7EobdHkqe4Xg&usqp=CAU",
      techStack: ["여행경비", "스페인어"],
      level: "enter",
      description:
        "가려면 퇴사 하고 가야하는데 과연 갈 수 있을 것인가 2달은 걸릴 텐데 궁금하다",
      period: "3개월",
      link: "",
      github: "",
    },
    {
      title: "포르쉐 구입",
      summary: "저의 드림카 포르쉐 입니다",
      imgSrc:
        "https://lh3.googleusercontent.com/proxy/_hOhswmBxEt-f_V4PZdBkhlcBmeDEsyLP6txBkxTszDhYSfaSG8ikhJv4sau8YtfjKYWbs9qrXP4fNKFxHGtDNzEFz5S3WQWMWnoStPG7XG0wPHGr3s",
      thumbnailSrc:
        "https://www.autodaily.co.kr/news/photo/201902/407643_36142_389.jpg",
      techStack: ["아내의 등짝 스매싱", "엄마의 등짝 스매싱"],
      level: "enter",
      description: "평생 못살 걸 알지만 그래도 멋진 자동차 입니다",
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
