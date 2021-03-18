import Dom from "../controllers/Dom";
import Header from "./Header";

let _children = [];
let _dom = null;

const getPageScrollRatio = () => {
  return window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
};

const getSectionYOffSet = (curIdx) => {
  let preScrollHeight = 0;
  for (let i = 0; i < curIdx; i++) {
    if (_children[i].state.scrollHeight) {
      preScrollHeight += _children[i].state.scrollHeight;
    }
  }
  return window.pageYOffset - preScrollHeight;
};

const getSectionScrollRatio = (curIdx) => {
  const sectionYOffset = getSectionYOffSet(curIdx);
  return sectionYOffset / _children[curIdx].state.scrollHeight;
};

const getCurrentDomIdx = (children) => {
  let curScrollHeight = 0;
  let currentScene = 0;
  const yOffset = window.pageYOffset;
  for (let i = 1; i < children.length; i++) {
    if (children[i].state.scrollHeight) {
      curScrollHeight += children[i].state.scrollHeight;
    }
    if (curScrollHeight >= yOffset) {
      currentScene = i;
      break;
    }
  }
  return currentScene;
};

const scrollHandler = () => {
  const curIdx = getCurrentDomIdx(_children);
  const pageScrollRatio = getPageScrollRatio();
  const sectionScrollRatio = getSectionScrollRatio(curIdx);

  Header.scrollHandler({
    title: _children[curIdx].state.title,
    pageScrollRatio,
    sectionScrollRatio,
  });

  _children[curIdx].scrollHandler({ pageScrollRatio, sectionScrollRatio });
};

const Container = {
  init(...children) {
    window.addEventListener("DOMContentLoaded", this.render);
    _children = [...children];
    return `<div id="container" ></div>`;
  },

  render() {
    if (!_dom) {
      _dom = document.querySelector("#container");
    }
    Dom.print(
      _dom,
      `${_children.reduce((acc, child) => {
        acc += child.init();
        return acc;
      }, "")}`
    );

    _children.forEach((child) => {
      child.render();
    });

    Container._afterRender();
  },

  _afterRender() {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
  },
};

export default Container;
