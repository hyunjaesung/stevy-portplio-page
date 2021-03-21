import Dom from "../../../js/controllers/Dom";
import MoveTo from "moveto";
import setScrollAnimate from "../../../js/utils/setScrollAnimate";

const moveTo = new MoveTo({ tolerance: -1, duration: 2000 });

let _state = {
  panelTitle: "",
  curSection: 0,
  sections: ["introduction", "techstack", "projects", "contact"],
  animate: [
    {
      query: ".panel_info_2",
      info: [
        {
          trigger: [0.1, 1],
          property: "opacity",
          value: [1, 0.8],
        },
      ],
    },
  ],
};
let _dom = null;

const buttonClickHandler = () => {
  let moveIdx = 0;
  if (_state.curSection < _state.sections.length - 1) {
    moveIdx = _state.curSection + 1;
  }
  _state.curSection = moveIdx;
  moveTo.move(document.getElementById(_state.sections[moveIdx]));
};

const template = ({ panelTitle }) => `
    <div class="panel_container">
      <div class="panel_info_1">Developer Stevy</div>
      <div class="panel_info_2">${panelTitle}</div>
    </div>
    
    <div class="img_container"><div class="circle"><div class="dot"></span></div></div>
`;

const triggerSectionScrollAnimate = (sectionScrollRatio) => {
  setScrollAnimate(_dom, _state.animate, sectionScrollRatio);
};

const Header = {
  init() {
    return `<section id="header" class="nav"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    if (_dom === null) {
      _dom = document.querySelector("#header");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }

    Dom.print(_dom, template(_state));
    Header._afterRender();
  },

  _afterRender() {
    _dom
      .querySelector(".img_container")
      .addEventListener("click", buttonClickHandler);
  },

  set state(obj) {
    _state = {
      ...obj,
    };
  },
  get state() {
    return _state;
  },

  scrollHandler({
    title = "",
    pageScrollRatio = 0,
    sectionScrollRatio = 0,
    curSection = 0,
  }) {
    if (title !== _state.panelTitle) {
      _dom.querySelector(".panel_info_2").innerHTML = title;
      _dom.querySelector(".panel_info_2").setAttribute("style", "");
      _state.curSection = curSection;
    }
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);

      _dom.querySelector(".circle").style.transform = `rotate(${
        360 * pageScrollRatio
      }deg)`;
    });
  },
};

export default Header;
