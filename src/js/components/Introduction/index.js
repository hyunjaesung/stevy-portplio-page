import Dom from "../../../js/controllers/Dom";
import setScrollAnimate from "../../../js/utils/setScrollAnimate";
import { SECTION_HEIGHT_PRESET } from "../../../js/constants";

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
        // {
        //   trigger: [0, 0.2],
        //   property: "opacity",
        //   value: [0, 1],
        // },
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
    require.context("../../../images/introImage", false, /\.(png|jpe?g|svg)$/)
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
        <strong class="name" style="color:gray;">??? ?????????</strong><br><strong class="name">?????????</strong>
        <br>
        <br>
          ????????? ?????? ?????? <strong>?????????</strong>??? ??? ???????????????
      <br>
      <br>
        <strong>??????</strong>??? ???????????????<br>
        <strong>??????</strong>??? ???????????? ?????????<br>
        <strong>??????</strong> ?????? ?????? ???????????????<br>
        ????????? ?????? ?????? ?????????..
      </p>
    </div>
  </div>
  <div class="intro-p" id="intro-p-2" style="display:none;">
    <div class="intro-flex">
      <p>
        <strong>???</strong> ?????????????????? ???????????????<br> <strong>???</strong> ????????? ??????????????????????
      <br>
      <br>
      <p>
        <strong>?????? ??????</strong>??? ?????? ?????? <strong>?????? ??????</strong>??? ???????????? ?????? ????????????
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
  }, // ???????????? state??? ??? ????????? ??????

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
