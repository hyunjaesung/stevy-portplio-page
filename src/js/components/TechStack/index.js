import Dom from "../../../js/controllers/Dom";
import { SECTION_HEIGHT_PRESET } from "../../../js/constants";
import setScrollAnimate from "../../../js/utils/setScrollAnimate";

let _state = {
  title: "Favorite",
  scrollHeight: SECTION_HEIGHT_PRESET[1] * window.innerHeight,
  animate: [
    {
      query: ".tech-wrapper",
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
    // 9 번에 걸쳐서 올려야된다
    {
      query: ".tech-container",
      start: 0.1,
      finish: 0.9,
      info: [
        {
          trigger: [0.2, 0.8],
          property: "top",
          value: [0, -450],
        },
      ],
    },
  ],
};
let _dom = null;

const triggerSectionScrollAnimate = (sectionScrollRatio) => {
  setScrollAnimate(_dom, _state.animate, sectionScrollRatio);
};

const template = () => `
<div class='tech-wrapper' style="display:none;">
  <div class="tech-intro">
    저는
  </div>
  <div class="tech-intro shutter">
    <div class='tech-container'>
      개발<br>
      호주 브리즈번<br>
      일식<br>
      사진<br>
      여행<br>
      쿠엔틴 타란티노 영화<br>
      북극곰<br>
    </div>
  </div>
  <div class="tech-intro">를(을) 좋아합니다</div>
</div>
`;
// <div class="tech-intro">
//   를 다룹니다
// </div>

const TechStack = {
  init() {
    return `
    <section id="techstack" class="content"></section>`;
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
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);
    });
  },
};

export default TechStack;
