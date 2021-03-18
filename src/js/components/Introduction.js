import Dom from "../controllers/Dom";
import setScrollAnimate from "../utils/setScrollAnimate";

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
  animate: [],
};
let _dom = null;

const setCanvasVideo = (sectionScrollRatio) => {
  const context = _dom.querySelector("#intro-canvas").getContext("2d");
  const videos = _state.videoImages;
  const videoIdx = parseInt((videos.length * sectionScrollRatio) / 100);
  context.drawImage(_state.videoImages[videoIdx], -50, 0, 240, 180);
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
  <div class="canvas-container">
    <canvas id="intro-canvas"></canvas>
    <div id="intro-p-1">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat voluptatem possimus quibusdam velit ex! Quam odit architecto harum pariatur sapiente quis? Fugit aut asperiores dicta perspiciatis? Recusandae, saepe a! Esse minus nesciunt qui voluptate nobis laudantium voluptatem ullam quam at vel? Repellat nihil id quas! A doloribus molestias voluptates dicta dignissimos accusantium vel numquam, cupiditate voluptas ipsum velit optio minus, at libero nisi doloremque quas necessitatibus nihil minima magnam corrupti fugiat? Vel laboriosam sunt nihil, eveniet consectetur nostrum laborum, assumenda quis tempora nulla perspiciatis blanditiis dolorum repellendus quaerat tenetur distinctio. Adipisci rem eveniet aliquid reiciendis voluptate reprehenderit nulla fuga nam!
      <br>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi, veritatis. Molestiae illo placeat velit necessitatibus recusandae ipsum, numquam nobis a eos voluptatum optio quasi nisi dolorem accusantium similique libero autem, aut officia assumenda, eum aliquid ut? Voluptas, provident quo. Sed est sit repellendus earum dignissimos incidunt quam aut, placeat voluptas!
      </p>
    </div>
    <div id="intro-p-2">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, recusandae.
      <br>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti soluta asperiores doloremque magni officia. Amet corrupti ipsa saepe maxime incidunt?
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
      setCanvasVideo(1);
    });
  },
  scrollHandler({ pageScrollRatio, sectionScrollRatio }) {
    requestAnimationFrame(() => {
      triggerSectionScrollAnimate(sectionScrollRatio);
    });
  },
};

export default Introduction;
