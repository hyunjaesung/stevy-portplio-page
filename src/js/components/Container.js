import Dom from "../controllers/Dom";
import Header from "./Header";

let _children = [];
let _dom = null;

const calcRatio = () => {};

const getCurrentDomIdx = (children) => {
  let totalScrollHeight = 0;
  let currentScene = 0;
  const yOffset = window.pageYOffset;
  for (let i = 1; i < children.length; i++) {
    if (children[i].state.scrollHeight) {
      totalScrollHeight += children[i].state.scrollHeight;
    }
    if (totalScrollHeight >= yOffset) {
      currentScene = i;
      break;
    }
  }
  return currentScene;
};

const scrollHandler = () => {
  const curIdx = getCurrentDomIdx(_children);
  Header.scrollHandler({ title: _children[curIdx].state.title });
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
