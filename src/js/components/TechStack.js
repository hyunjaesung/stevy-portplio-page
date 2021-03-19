import Dom from "../controllers/Dom";
import { SECTION_HEIGHT_PRESET } from "../constants";
import setScrollAnimate from "../utils/setScrollAnimate";

let _state = {
  title: "Tech",
  scrollHeight: SECTION_HEIGHT_PRESET[1] * window.innerHeight,
  animate: [
    {
      query: ".tech-wrapper",
      start: 0.1,
      finish: 0.85,
      info: [
        {
          trigger: [0.1, 0.15],
          property: "opacity",
          value: [0, 1],
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
      JavaScript<br> 
      TypeScript<br>
      ReactJS<br>
      NestJS<br>
      NodeJS<br>
      Webpack<br>
      Babel<br>
      Jest<br>
      Cypress<br>
    </div>
  </div>
  <div class="tech-intro">를 다룹니다</div>
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
