export default function (dom, animate, sectionScrollRatio) {
  animate.forEach(({ query, info = [] }) => {
    const target = dom.querySelector(query);
    info.forEach(({ trigger, property, value }) => {
      const [startV, endV] = value;
      const [startR, endR] = trigger;

      if (
        sectionScrollRatio / 100 >= startR &&
        sectionScrollRatio / 100 <= endR
      ) {
        const result = ((endV - startV) * sectionScrollRatio) / 100 + startV;
        if (property === "transform") {
          target.style[property] = `translate3d(0, ${result}%, 0)`;
        } else {
          target.style[property] = result;
        }
      } else {
        target.setAttribute("style", `display:"none";`);
      }
    });
  });
}
