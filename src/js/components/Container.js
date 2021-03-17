import Dom from "../controllers/Dom";

let _children = [];
let _dom = null;

export default {
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
  },
};
