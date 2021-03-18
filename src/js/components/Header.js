import Dom from "../controllers/Dom";
import dialSrc from "../../images/volume_dial.png";

const dial = document.createElement("img");
dial.src = dialSrc;

// query / trigger ratio / property / value
let _state = {
  panelTitle: "",
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

const template = ({ panelTitle }) => `
    <div class="panel_container">
      <div class="panel_info_1">Developer Stevy</div>
      <div class="panel_info_2">${panelTitle}</div>
    </div>
    <div class="img_container"></div>
`;

const triggerSectionScrollAnimate = (sectionScrollRatio) => {
  _state.animate.forEach(({ query, info = [] }) => {
    const target = _dom.querySelector(query).style;
    info.forEach(({ trigger, property, value }) => {
      const [startV, endV] = value;
      const [startR, endR] = trigger;
      if (
        sectionScrollRatio / 100 >= startR &&
        sectionScrollRatio / 100 <= endR
      ) {
        const result = ((endV - startV) * sectionScrollRatio) / 100 + startV;
        if (property === "transform") {
          target[property] = `translate3d(0, ${result}%, 0)`;
        } else {
          target[property] = result;
        }
      }
    });
  });
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
    this._afterRender();
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
    document.querySelector("#header .img_container").appendChild(dial);
  },
  scrollHandler({ title = "", pageScrollRatio = 0, sectionScrollRatio = 0 }) {
    if (title !== _state.panelTitle) {
      _dom.querySelector(".panel_info_2").innerHTML = title;
      _dom.querySelector(".panel_info_2").setAttribute("style", "");
    }
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);

      _dom.querySelector(".img_container img").style.transform = `rotate(${
        (360 * pageScrollRatio) / 100
      }deg)`;
    });
  },
};

export default Header;
