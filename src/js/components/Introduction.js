import Dom from "../controllers/Dom";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

let _state = {
  title: "Introduction",
  scrollHeight: 6 * window.innerHeight,
  videoImages: [],
};
let _dom = null;

const triggerSectionScrollAnimate = (sectionScrollRatio) => {
  const context = _dom.querySelector("#intro-canvas").getContext("2d");
  const videos = _state.videoImages;

  const videoIdx = parseInt((videos.length * sectionScrollRatio) / 100);

  context.drawImage(_state.videoImages[videoIdx], -50, 0, 240, 180);
};

const fileNum = (num = 0) => {
  const length = `${num}`.length;
  switch (length) {
    case 1:
      return `00${num}`;
    case 2:
      return `0${num}`;
    case 3:
      return `${num}`;
    default:
      return "000";
  }
};

const setImageElement = () => {
  let imgElem;
  const images = importAll(
    require.context("../../images/introImage", false, /\.(png|jpe?g|svg)$/)
  );
  for (let i = 1; i < 151; i++) {
    imgElem = new Image();
    imgElem.src = images[`unscreen-${fileNum(i)}.jpg`];
    _state.videoImages.push(imgElem);
  }
};

const template = ({ scrollHeight }) => `
  <div class="canvas-container">
    <canvas id="intro-canvas"></canvas>
  </div>
`;

const Introduction = {
  init() {
    return `<section id="introduction" class="content"></section>`;
  },

  _beforeRender() {
    try {
    } catch (e) {}
  }, // 렌더전에 state에 값 넣거나 할때

  render() {
    if (_dom === null) {
      _dom = document.querySelector("#introduction");
      if (!_dom) throw new Error("Root component is needed for rendering");
    }
    Dom.print(_dom, template({ ..._state }));
    Introduction._afterRender();
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
    setImageElement();
    console.log(_state.videoImages);
  },
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    triggerSectionScrollAnimate(sectionScrollRatio);
    console.log(pageScrollRatio, sectionScrollRatio);
  },
};

export default Introduction;
