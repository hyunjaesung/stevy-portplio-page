import Dom from "../controllers/Dom";
import setScrollAnimate from "../utils/setScrollAnimate";
import { SECTION_HEIGHT_PRESET } from "../constants";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

let _state = {
  title: "Introduction",
  scrollHeight: SECTION_HEIGHT_PRESET[0] * window.innerHeight,
  videoImages: [],
  animate: [
    {
      query: ".canvas-container",
      start: 0,
      finish: 0.85,
    },
    {
      query: "#intro-p-1",
      start: 0,
      finish: 0.4,
      info: [
        {
          trigger: [0, 0.2],
          property: "opacity",
          value: [0, 1],
        },
        {
          trigger: [0.2, 0.4],
          property: "opacity",
          value: [1, 0],
        },
      ],
    },
    {
      query: "#intro-p-2",
      start: 0.4,
      finish: 0.9,
      info: [
        {
          trigger: [0.4, 0.6],
          property: "opacity",
          value: [0, 1],
        },
        {
          trigger: [0.6, 0.9],
          property: "opacity",
          value: [1, 0],
        },
      ],
    },
  ],
};
let _dom = null;

const setCanvasVideo = (sectionScrollRatio) => {
  const context = _dom.querySelector("#intro-canvas").getContext("2d");
  const videos = _state.videoImages;
  const videoIdx = parseInt(videos.length * sectionScrollRatio);
  if (_state.videoImages[videoIdx]) {
    context.drawImage(_state.videoImages[videoIdx], -50, 0, 240, 180);
  }
};

const triggerSectionScrollAnimate = (sectionScrollRatio) => {
  setCanvasVideo(sectionScrollRatio);
  setScrollAnimate(_dom, _state.animate, sectionScrollRatio);
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
  <div class="canvas-container" style="display:none;">
    <canvas id="intro-canvas"></canvas>
  </div>
  <div class="intro-p" id="intro-p-1" style="display:none;">
    <div class="intro-flex">
      <p>
        개발자<br><strong>성현제</strong>
        <br>
        <br>
        프론트 앤드 기술을 다루는 <strong>Javascript</strong> 개발자입니다
      <br>
      <br>
        <strong>웹 기술</strong>을 배우는 것을 즐기고<br>
        <strong>새로운 기술</strong>을 빠르게 흡수하며<br><strong>주도적</strong>으로 업무를 수행 할 수 있습니다
      </p>
    </div>
  </div>
  <div class="intro-p" id="intro-p-2" style="display:none;">
    <div class="intro-flex">
      <p>
      진부할 수 도 있지만 <strong>꾸준함</strong>으로 성취감을 얻고
      <br>
        <strong>커뮤니티</strong>에 기여하는 개발자가 되고자 노력합니다
      </p>
      <br>
      <p>
        <strong>좋은 동료</strong>를 만나 함께 <strong>피드백</strong>을 나누고 성장하고 싶습니다
      </p>
    </div>
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
    window.addEventListener("load", () => {
      setCanvasVideo(0.001);
    });
  },
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);
    });
  },
};

export default Introduction;
