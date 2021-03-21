import Dom from "../../../js/controllers/Dom";
import { SECTION_HEIGHT_PRESET } from "../../constants";
import setScrollAnimate from "../../utils/setScrollAnimate";

let _state = {
  title: "Contact",
  scrollHeight: SECTION_HEIGHT_PRESET[3] * window.innerHeight,
  animate: [
    {
      query: "#outtro-p-1",
      start: 0.2,
      finish: 0.4,
      info: [
        {
          trigger: [0.2, 0.4],
          property: "opacity",
          value: [0, 1],
        },
        {
          trigger: [0.4, 0.6],
          property: "opacity",
          value: [1, 0],
        },
      ],
    },
    {
      query: "#outtro-p-2",
      start: 0.6,
      finish: 1,
      info: [
        {
          trigger: [0.6, 0.8],
          property: "opacity",
          value: [0, 1],
        },
        {
          trigger: [0.8, 1],
          property: "opacity",
          value: [1, 1],
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
  <div class="intro-p" id="outtro-p-1" style="display:none;">
    <div class="intro-flex">
      <p>
        <strong>관심</strong> 주셔서 <strong>감사</strong>합니다<br>
      </p>
    </div>
  </div>
  <div class="intro-p" id="outtro-p-2" style="display:none;">
    <div class="intro-flex">
      <p>
        다음 만남까지<br>
        <strong>Adios</strong>
      </p>
    </div>
  </div>
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
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);
    });
  },
};

export default Contact;
